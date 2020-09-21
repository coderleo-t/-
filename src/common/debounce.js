export function debounce(time=300) {
  let timer = null
  return function bar(fun) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fun
    }, time)
  }
}