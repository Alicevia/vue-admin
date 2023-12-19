<template>
	<t-config-provider>
		<router-view></router-view>
	</t-config-provider>
</template>

<script setup>
import { useThemeStore } from './store/theme'
useThemeStore()
</script>
<style scoped></style>