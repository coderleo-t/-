<style>
.el-steps {
  margin-top: 30px;
}

.save {
  margin-bottom: 50px;
  float: right;
}

.el-cascader-menu {
  height: 300px;
}

.editor {
  margin-top: 30px;
}

.ql-editor {
  min-height: 300px;
}

.appendBt {
  margin: 50px 0px;
  float: right;
}
</style>
<template>
<div>
  <breadcrumb :breadFont='["商品管理","添加商品"]' />
  <el-card>
    <el-alert title="添加商品信息" type="info" show-icon :closable='false' center />
    <el-steps :space="200" :active="Number(active)" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <el-form :model="appendGoodsForm" :rules="rules" ref="appendGoodsForm" label-width="100px" label-position='top'>
      <el-tabs :before-leave='beforeLeaveTabs' v-model="active" tab-position="left" style="height: 100%;">
        <el-tab-pane label="基本信息" name='0'>
          <el-form-item label='商品名称' prop='goods_name'>
            <el-input v-model="appendGoodsForm.goods_name" />
          </el-form-item>
          <el-form-item label='商品价格(元)' prop='goods_price'>
            <el-input v-model.number="appendGoodsForm.goods_price" />
          </el-form-item>
          <el-form-item label='商品重量(斤)' prop='goods_weight'>
            <el-input v-model.number="appendGoodsForm.goods_weight" />
          </el-form-item>
          <el-form-item label='商品数量(个)' prop='goods_number'>
            <el-input-number v-model.number="appendGoodsForm.goods_number" controls-position="right" :min="1" :max="100" />
          </el-form-item>
          <el-form-item label='商品分类' prop='goods_cat'>
            <el-cascader @change="selectChange" clearable v-model="appendGoodsForm.goods_cat" :options="categoryOptions" :props="{value: 'cat_id',
        label: 'cat_name',children: 'children', expandTrigger: 'hover' }" />
          </el-form-item>
          <div class="save"></div>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name='1'>
          <el-form-item :label="item.attr_name" :key='item.attr_id' v-for='item in goodsManydata'>
            <el-checkbox-group v-if="item !== null" v-model="item.attr_vals" size="small">
              <el-checkbox v-for='(item, index) in item.attr_vals' :key='index' :label="item" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-alert v-show="goodsManydata.length === 0" title="暂无商品参数数据" center type="warning" show-icon :closable='false' />
        </el-tab-pane>
        <el-tab-pane label="商品属性" name='2'>
          <el-form-item :label='item.attr_name' :key='item.attr_id' v-for="item in goodsOnlyData">
            <el-input v-model="item.attr_vals" />
          </el-form-item>
          <div class="save"></div>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name='3'>
          <el-upload :headers='upLoadInfo' :on-success='upLoadSuccess' action="http://localhost:8888/api/private/v1/upload" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="save"></div>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name='4'>
          <quill-editor class="editor" v-model="appendGoodsForm.goods_introduce" />
          <el-button class="appendBt" type='primary' @click="appendGoods">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>

  </el-card>

  <el-dialog title='图片预览' :visible.sync="dialogImgVisible">
    <img style="width: 100%" :src="previewImgURL" alt="">
  </el-dialog>
</div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb'

export default {
  data() {
    return {
      active: '0',
      appendGoodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',

        // 下面的可以为空
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      categoryOptions: [],
      goodsManydata: [

      ],
      goodsOnlyData: [

      ],
      upLoadInfo: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewImgURL: '',
      dialogImgVisible: false,
      rules: {
        goods_name: [{
          required: true,
          message: '不能为空！',
          trigger: 'blur'
        }],
        goods_price: [{
          required: true,
          message: '不能为空！',
          trigger: 'blur'
        }, {
          type: 'number',
          message: '价格必须为数字值'
        }],
        goods_number: [{
          required: true,
          message: '不能为空！',
          trigger: 'blur'
        }, {
          type: 'number',
          message: '数量必须为数字值'
        }],
        goods_weight: [{
          required: true,
          message: '不能为空！',
          trigger: 'blur'
        }, {
          type: 'number',
          message: '重量必须为数字值'
        }],
        goods_cat: [{
          required: true,
          message: '不能为空！',
          trigger: 'blur'
        }]
      }
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    beforeLeaveTabs(activeName, oldActiveName) {
      if (oldActiveName === '0' && this.appendGoodsForm.goods_cat.length !== 3) {
        this.$message.error('必须先选择商品分类！')
        return false
      } else if (activeName === '1') {
        this.getGoodsParams('many')
      } else if (activeName === '2') {
        this.getGoodsParams('only')

      } else if (activeName === '3') {
        console.log(3)

      } else {
        console.log(4)

      }
    },
    selectChange() {
      if (this.appendGoodsForm.goods_cat.length !== 3) {
        this.appendGoodsForm.goods_cat = []
      }
    },
    handlePreview(options) {
      this.previewImgURL = options.response.data.url
      this.dialogImgVisible = true
      console.log('点击了图片预览！', options.response.data.url)
    },
    handleRemove(options) {
      const index = this.appendGoodsForm.pics.findIndex((value) => {
        return value === options.response.data.tmp_path
      })
      this.appendGoodsForm.pics.splice(index, 1)
    },
    upLoadSuccess(response) {
      if (response.meta.status !== 200) {
        return this.$message.error('上传失败！' + response.meta.msg)
      } else {
        this.appendGoodsForm.pics.push({
          pic: response.data.tmp_path
        })
      }
    },
    appendGoods() {
      this.$refs.appendGoodsForm.validate((boolean) => {
        if (!boolean) {
          return this.$message.error('请检查商品信息是否填写完整与正确！')
        } else {
          this.appendGoodsRequest()
        }
      })
    },

    // ---------------------网络请求-------------------
    async getCategoryData() {
      const {
        data: res
      } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类数据失败！' + res.meta.msg)
      } else {
        return res
      }
    },
    async getGoodsParams(sel) {
      const {
        data: res
      } = await this.$http.get(`categories/${this.appendGoodsForm.goods_cat[2]}/attributes`, {
        params: {
          sel: sel
        }
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品参数失败！' + res.status.msg)
      } else {
        if (sel === 'many') {
          res.data.forEach(item => {
            item.attr_vals = item.attr_vals.split(' ')
          })
          this.goodsManydata = res.data
          console.log(this.goodsManydata)
        } else {
          this.goodsOnlyData = res.data
          console.log(this.goodsOnlyData)
        }
      }
    },
    async appendGoodsRequest() {
      if (this.goodsManydata.length === 0 || this.goodsOnlyData.length === 0) {
        return this.$message.error('请先选择商品参数或商品属性！')
      } else {
        this.goodsManydata.forEach(item => {
          this.appendGoodsForm.attrs.push({
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          })
        })
        this.goodsOnlyData.forEach(item => {
          this.appendGoodsForm.attrs.push({
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          })
        })
        const cloneGoodsInfo = JSON.parse(JSON.stringify(this.appendGoodsForm))
        cloneGoodsInfo.goods_cat = this.appendGoodsForm.goods_cat.join(',')
        console.log(cloneGoodsInfo)
        const {
          data: res
        } = await this.$http.post('goods',
          cloneGoodsInfo
        )
        if (res.meta.status !== 201) {
          return this.$message.error('添加商品失败！' + res.meta.msg)
        } else {
          this.$router.push('/backstage/goods')
          return this.$message.success('添加商品成功！')
        }
      }
    }
  },
  created() {
    this.getCategoryData().then(res => {
      this.categoryOptions = res.data
    })
  }
}
</script>
