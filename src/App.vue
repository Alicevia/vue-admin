<template>
	<t-config-provider>
		<router-view v-slot="{ Component }">
			<transition mode="out-in">
				<keep-alive>
					<component :is="Component"></component>
				</keep-alive>
			</transition>
		</router-view>  
	</t-config-provider>   
</template>

<script setup>
import { useThemeStore } from './store/theme'
useThemeStore()
</script>
<style scoped></style>