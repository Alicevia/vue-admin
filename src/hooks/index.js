import { useInterval } from '@vueuse/core'

export const useTypewriter = (textRef, interval, options) => {
  interval = interval??100
  const { callback }=options??{}
  const writer = ref('')
  const { reset: resetInterval, resume, pause }=useInterval(interval, {
    controls: true,
    immediate: false,
    callback (a){
      if(!textRef.value){
        reset()
        return 
      }
      writer.value += textRef.value[a-1]
      callback?.(writer.value)
      if(textRef.value.length<=a){
        pause()
      }
    },
  })
 
  const reset = () => {
    resetInterval()
    pause()
    writer.value=''
  }

  
  return { writer, reset, resume, pause, resetInterval }
}
