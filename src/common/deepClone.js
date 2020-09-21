export function deepClone(obj) {
  let result = {}
  if(typeof obj !== 'object'  || obj === null) {
    return obj
  } else {
    const keys = Reflect.ownKeys(obj)
    for(let i of keys) {
      result[i] = deepClone(obj[i])
    }
    return result
  }
}