<template>
	<router-view></router-view>
</template>

<script setup>
definePage({
  meta: {
    title: '练习室',
  },

  icon: () => import('tdesign-icons-vue-next/esm/components/relativity'),
})
</script>
<style scoped>
</style>