<template>
	<div ref="root" class="flex gap-2 overflow-hidden">
		<t-button v-show="leftArrow" theme="default" variant="base"
			shape="square" class="shrink-0"
			@click="moveLeft">
			<template #icon>
				<ChevronLeftIcon></ChevronLeftIcon>
			</template>
		</t-button>
		<div ref="tagsRef" class="flex gap-2 flex-1 overflow-hidden">
			<t-tag v-for="(item) in tagList" :key="item.title" 
				:checked="item.title==currentTag.select?.title"
				checkable
				class="!h-[28px] flex-shrink-0 "
				:closable="!currentTag.isOnlyOne" size="medium" @close="removeTag(item)"
				@check="selectTag(item)">
				{{ item.title }}
			</t-tag>
		</div>
		<t-button v-show="rightArrow" theme="default" variant="base"
			shape="square" class=" shrink-0"
			@click="moveRight">
			<template #icon>
				<ChevronRightIcon></ChevronRightIcon>
			</template>
		</t-button>
		<t-dropdown trigger="hover" position="bl">
			<t-button theme="default" shape="square" variant="base"
				class="ml-auto shrink-0">
				<template #icon>
					<ChevronDownIcon></ChevronDownIcon>
				</template>
			</t-button>
			<template #dropdown>
				<t-button>
					刷新
				</t-button>
				<t-button>
					关闭当前
				</t-button>
				<t-button>
					关闭其他
				</t-button>
				<t-button>
					关闭左侧
				</t-button>
				<t-button>
					关闭右侧
				</t-button>
			</template>
		</t-dropdown>
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