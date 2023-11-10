<template>
  <div>
    case-layout+
    概览
    <a-button @click="$router.push({ path: '/case/list' })">
      to list
    </a-button>
    <router-view />
  </div>
</template>

<script setup>

</script>

<style scoped></style>