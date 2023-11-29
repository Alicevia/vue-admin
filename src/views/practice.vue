<template>
	<div>
		<div>practice  layout</div>
		<router-view></router-view>
	</div>
</template>

<script setup>
definePage({
  title: '练习室',
  icon: () => import('@arco-design/web-vue/es/icon/icon-command'),
})
</script>
<style scoped>
</style>