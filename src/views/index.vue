<template>
	<div class="h-full flex-1 ">
		index
	</div>
</template>

<script setup>
import { onActivated } from 'vue'
import { useRoute } from 'vue-router'


definePage({
  title: '首页',
  icon: () => import('@arco-design/web-vue/es/icon/icon-apps'),
})
 
onActivated(() => {
  console.log(useRoute())
})

</script>
<style scoped></style>