import {  useRouter } from 'vue-router'


export default defineComponent(() => {
  const router = useRouter()
  return () => {
    router.back()
    return (
      <div>
        23

      </div>
    )
  }
})
