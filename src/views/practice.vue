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
    title: '练习室',
    
  },

  icon: () => import('tdesign-icons-vue-next/esm/components/relativity'),
})
// 23

</script>
<style scoped>
</style>