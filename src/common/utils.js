// 对许多功能性的函数,放在一个公共的js文件里面导出, 哪个组件使用,就直接导出就可以了

export function debounce (func, delay) {
// 对于refresh 调用非常频繁的问题 进行防抖操作
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}
