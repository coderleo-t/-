import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login.vue')
const Backstage = () => import('../views/backstage/Backstage.vue')
const Welcome = () => import('../components/content/Welcome.vue')
const UserList = () => import('../views/childView/userManage/users/Users.vue')
const Rights = () => import('../views/childView/authManage/rights/Rights.vue')
const Roles = () => import('../views/childView/authManage/roles/Roles.vue')
const Categories = () => import('../views/childView/goodsManage/categories/Categories.vue')
const Goods = () => import('../views/childView/goodsManage/goods/Goods.vue')
const Params = () => import('../views/childView/goodsManage/params/Params.vue')
const Orders = () => import('../views/childView/orderManage/orders/Orders.vue')
const Reports = () => import('../views/childView/statisticsManage/reports/Reports.vue')
const appendGoods = () => import('../views/childView/goodsManage/goods/childGoods/AppendGoodsRouter.vue')


Vue.use(VueRouter)

  const routes = [
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/backstage',
    component: Backstage,
    redirect: '/backstage/welcome',
    children: [
      {
        path: '/backstage/welcome',
        component: Welcome
      },
      {
        path: '/backstage/users',
        component: UserList
      },
      {
        path: '/backstage/rights',
        component: Rights
      }, 
      {
        path: '/backstage/categories',
        component: Categories
      }, 
      {
        path: '/backstage/roles',
        component: Roles
      }, 
      {
        path: '/backstage/goods',
        component: Goods,
        // children: [
        //     {
        //       path: '/backstage/goods/appendGoods',
        //       component: appendGoods
        //     }
        // ]
      }, 
      {
        path: '/backstage/reports',
        component: Reports
      }, 
      {
        path: '/backstage/orders',
        component: Orders
      }, 
      {
        path: '/backstage/params',
        component: Params
      },
      {
        path: '/backstage/goods/appendGoods',
        component: appendGoods
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.path === '/login') return next()
  if(to.path !== '/login' && window.sessionStorage.getItem('token')) return next()
  next('/login')
})

export default router
