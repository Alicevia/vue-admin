<template>
	<div class="whitespace-pre-wrap">
		<a-button @click="resume">
			开始
		</a-button>
		<a-button @click="pause">
			暂停
		</a-button>
		<a-button @click="reset">
			重置
		</a-button>
		{{ writer }}
	</div>
</template>

<script setup>
import { useTypewriter } from '@/hooks'
definePage({
  title: '打字机',
  icon: () => import('@arco-design/web-vue/lib/icon/icon-send'),
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