<template>
	<router-view v-slot="{Component,}">
		<keep-alive :include="userStore.include">
			<component :is="Component"></component>
		</keep-alive> 
	</router-view>  
</template>

<script setup>
defineOptions({
  name: 'AppKeepAlive',
})
import { useUserStore } from '@/store'
const userStore = useUserStore()
</script>
<style scoped>
</style>