<template>
	<div>
		<t-input></t-input>
	</div>
</template>

<script setup>
definePage({
  meta: {
    title: '测试X级',
    isKeepAlive: true,
  },
})
const route = useRoute()
console.log(route)
// 232

</script>
<style scoped>
</style>