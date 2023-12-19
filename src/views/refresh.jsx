import {  useRouter } from 'vue-router'

export const useRefreshCurrentRouter = () => {
  const router = useRouter()
  const refresh = () => {
    router.push('/refresh')
  }
  return { refresh }
}

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
