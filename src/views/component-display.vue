<template>
	<router-view v-slot="{ Component }">
		<!-- <transition mode="out-in"> -->
		<keep-alive>
			<component :is="Component"></component>
		</keep-alive>
		<!-- </transition> -->
	</router-view>  
</template>

<script setup>
  
definePage({
  meta: {
    title: '组件展示',
  },
  icon: () => import('tdesign-icons-vue-next/esm/components/slideshow'),
})
</script>
<style scoped>
</style>