<template>
	<t-tabs v-model="value" class="h-full">
		<t-tab-panel :value="1" label="账户信息" :destroy-on-hide="false">
			<UserInfo></UserInfo>
		</t-tab-panel>
		<t-tab-panel :value="2" label="账户安全" :destroy-on-hide="false">
			<template #panel>
				<p style="padding: 25px">
					选项卡2的内容，使用 t-tab-panel 渲染
				</p>
			</template>
		</t-tab-panel>
	</t-tabs>
</template>

<script setup>
import UserInfo from './components/user-info.vue'
definePage({
  meta: {
    title: '账户设置',
  },
})
const value = ref(1)

</script>
<style scoped>
</style>