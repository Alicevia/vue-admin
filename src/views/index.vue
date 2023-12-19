<template>
	<div class="h-full flex-1">
		<t-input></t-input>
		<!-- {{ msg }} -->
	</div>
</template>

<script setup>
// defineOptions({
//   name: 'Index',
// })
 
definePage({
  icon: () => import('tdesign-icons-vue-next/esm/components/home'),
  meta: {
    title: '首页',
    isKeepAlive: true,
  },
})
// const msg = ref('sdf')


</script>
<style scoped></style>