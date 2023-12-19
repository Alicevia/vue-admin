<template>
	<t-card title="当前页面不存在">
		<template #actions>
			<t-space>
				<t-button theme="primary" @click="goHome">
					去首页
				</t-button>
			</t-space>
		</template>
	</t-card>
</template>

<script setup lang="jsx">

definePage({
  meta: {
    title: 'ErrorPage',
    isMenu: false,

  },
})
const router = useRouter()

const goHome = () => {
  router.replace({ path: '/' })
}
 
 
</script>
<style scoped>
</style>