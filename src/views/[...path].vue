<template>
	<a-result status="404" subtitle="系统中不存在当前URL,请检查">
		<template #extra>
			<a-space>
				<a-button type="primary" @click="goHome">
					去首页
				</a-button>
			</a-space>
		</template>
	</a-result>
</template>

<script setup lang="jsx">

definePage({
  title: 'ErrorPage',
  isMenu: false,
})
const router = useRouter()

const goHome = () => {
  console.log(router)
  router.replace({ path: '/test/test2/test3/test4' })
}
 
 
</script>
<style scoped>
</style>