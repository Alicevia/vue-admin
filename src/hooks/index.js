import { useInterval } from '@vueuse/core'

export const useTypewriter = (textRef, interval, options) => {
  interval = interval??100
  const { callback }=options??{}
  const writer = ref('')
  const { reset, resume, pause }=useInterval(interval, {
    controls: true,
    immediate: false,
    callback (a){
      writer.value += textRef.value[a-1]
      callback?.(writer.value)
      if(textRef.value.length<=a){
        pause()
      }
    },
  })
  
  return { writer, reset, resume, pause }
}
