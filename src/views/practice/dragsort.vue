<template>
	<div>
		<drag-sort v-slot="{item}" class="flex flex-col gap-2" :list="list"
			@change="changeItem">
			<div class="border py-2  text-title">
				{{ item }}
			</div>
		</drag-sort>
	</div>
</template>

<script setup>
definePage({
  meta: {
    title: '拖拽排序', 
  },
  title: '拖拽排序',
  icon: () => import('tdesign-icons-vue-next/esm/components/drag-move'),
})
const list = ref(new Array(10).fill('').map((_, i) => i))
const changeItem = (s, e) => {
  list.value.splice(e, 0, list.value.splice(s, 1)[0])
}
</script>
<style scoped>
</style>