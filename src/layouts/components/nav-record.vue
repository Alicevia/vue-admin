<template>
	<div ref="root" class="flex gap-2 overflow-hidden">
		<a-button v-show="leftArrow" class=" shrink-0" @click="moveLeft">
			<template #icon>
				<icon-left></icon-left>
			</template>
		</a-button>
		<div ref="tagsRef" class="flex gap-2 flex-1 overflow-hidden">
			<a-tag v-for="(item) in tagList" :key="item.title" :checked="item.title==currentTag.select?.title"
				checkable
				class="!h-[28px] flex-shrink-0"
				:closable="!currentTag.isOnlyOne" size="medium" @close="removeTag(item)"
				@check="selectTag(item)">
				{{ item.title }}
			</a-tag>
		</div>
		<a-button v-show="rightArrow" class=" shrink-0" @click="moveRight">
			<template #icon>
				<icon-right></icon-right>
			</template>
		</a-button>
		<a-dropdown trigger="hover" position="bl">
			<a-button class="ml-auto shrink-0">
				<template #icon>
					<icon-down></icon-down>
				</template>
			</a-button>
			<template #content>
				<a-doption>刷新</a-doption>
				<a-doption>关闭当前</a-doption>
				<a-doption>关闭其他</a-doption>
				<a-doption>关闭左侧</a-doption>
				<a-doption>关闭右侧</a-doption>
			</template>
		</a-dropdown>
	</div>
</template>

<script setup>
import { useScroll, useEventListener, useMouseInElement, useElementSize, useMutationObserver } from '@vueuse/core'
import { computed, nextTick, reactive, watch, watchEffect  } from 'vue'
const tagsRef=ref()
const root = ref()

const tagList = ref(new Array(10).fill('').map((_, i) => ({
  title: '智能abc'+i,
})))
const currentTag = reactive({
  select: null,
  isSelectLast: computed(() => tagList.value.at(-1)==currentTag.select), 
  isOnlyOne: computed(() => tagList.value.length==1),
})
currentTag.select = tagList.value.at(0)
const {  elementX, elementWidth } = useMouseInElement(tagsRef)

const selectTag=(item ) => {
   
  currentTag.select=item
  if(elementX.value/elementWidth.value>0.85){
    moveRight()
    return 
  }
  if(elementX.value/elementWidth.value<0.15){
    moveLeft()
  }
}
const removeTag = (ite) => {
  tagList.value= tagList.value.filter(item => item!=ite)
}


const { width }=useElementSize(tagsRef)
const tagsScrollWidth=ref(0)
watchEffect(() => {
  if(tagList.value.length){
    nextTick(() => {
      tagsScrollWidth.value = tagsRef.value?.scrollWidth
    })
  }
})
 
const showArrow = (v) => {
  if(tagsScrollWidth.value <= width.value) return false
  return !v
}
const leftArrow = computed(() => showArrow(arrivedState.left))
const rightArrow = computed(() => showArrow(arrivedState.right))


const { x, arrivedState } = useScroll(tagsRef, {
  behavior: 'smooth',
})
const DIRECTION = {  LEFT: 'left', RIGHT: 'right' }
const move = (direction) => {
  const len = 200
  const step = direction==DIRECTION.RIGHT?len:-len
  x.value+=step
}
const moveLeft = () => move(DIRECTION.LEFT)
const moveRight = () => move(DIRECTION.RIGHT)
const cleanup = useEventListener(tagsRef, 'wheel', (e) => {
  e.deltaY<0?moveRight():moveLeft()
})
</script>
<style scoped>
</style>