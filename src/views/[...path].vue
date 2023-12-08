<template>
	<t-result status="404" subtitle="系统中不存在当前URL,请检查">
		<template #extra>
			<t-space>
				<t-button type="primary" @click="goHome">
					去首页
				</t-button>
			</t-space>
		</template>
	</t-result>
</template>

<script setup lang="jsx">

definePage({
  title: 'ErrorPage',
  isMenu: false,
})
const router = useRouter()

const goHome = () => {
  router.replace({ path: '/test/test2/test3/test4' })
}
 
 
</script>
<style scoped>
</style>