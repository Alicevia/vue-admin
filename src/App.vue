<template>
	<a-config-provider :global="true">
		<router-view v-slot="{ Component }">
			<transition mode="out-in">
				<keep-alive>
					<component :is="Component"></component>
				</keep-alive>
			</transition>
		</router-view>
	</a-config-provider>
</template>

<script setup>

</script>
<style scoped></style>