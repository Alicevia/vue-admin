<template>
	<div class="whitespace-pre-wrap">
		<t-button @click="resume">
			开始
		</t-button>
		<t-button @click="pause">
			暂停
		</t-button>
		<t-button @click="reset">
			重置
		</t-button>
		{{ writer }}
	</div>
</template>

<script setup>
import { useTypewriter } from '@/hooks'
definePage({
  title: '打字机',
  icon: () => 23,
})

const data = ref(`
          静夜思⑴
    床前明月光⑵，疑是地上霜⑶。
    举头望明月⑷，低头思故乡。
`)

 
const { writer, reset, resume, pause }=useTypewriter(data)


</script>
<style scoped>
</style>