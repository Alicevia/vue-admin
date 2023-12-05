<template>
	<ul ref="ulRef" class="relative">
		<li
			v-for="(item,index) in list"
			:key="item[rowKey]"
			draggable="true"
			:class="[active?'transition-transform duration-300':'',]"
			@dragstart="dragstart($event,index)"
			@dragend="dragend"
			@drag="drag">
			<slot :item="item" :index="index"></slot>
		</li>
	</ul>
</template>
 

<script setup>
import { ref, computed  } from 'vue'
import { useMouseInElement } from '@vueuse/core'
defineOptions({
  name: 'DragSort',
})
const props = defineProps({
  list: Array,
  rowKey: String,
})
const emits = defineEmits(['change'])
const list = computed(() => props.list??[])
const active = ref(true)

const ulRef = ref()
let startIndex 
let endIndex 
let position 
const { elementX, elementY  }  = useMouseInElement(ulRef)

const getItemsPosition = () => {
  return Array.from(ulRef.value.children).map((item) => ({ top: item.offsetTop, left: item.offsetLeft, right: item.offsetWidth, bottom: item.offsetHeight+item.offsetTop }) )
}

const getIndex= (x, y) => {
  return position.findIndex(item => {
    return  x>item.left  && x<item.right  && y>item.top && y<item.bottom
  })
}
const render = (start, end) => {
  const y = position[end].top-position[start].top
  const x = position[end].left-position[start].left
  ulRef.value.children[start].style.transform=`translate3d(${x}px,${y}px,0px)`
}
// 恢复
const clearTranslate = (reset) => {
  Array.from(ulRef.value.children).forEach((item) => {
    item.style.transform=`translate3d(0px,0px,0px)`
  })
  reset?active.value=false:active.value=true
}
function dragstart (e, i) {
  e.dataTransfer.effectAllowed='move'
  startIndex = i
  position=getItemsPosition()
}
const drag = () => {

  const index = getIndex(elementX.value, elementY.value)
  if(index==-1 || endIndex==index) return
  endIndex=index
  clearTranslate()
  render(startIndex, index)
  const down = startIndex<index
  const min = down?startIndex:index
  const max = down?index:startIndex
  for (let index = min; index < max; index++) {
    if(down){
      render(index+1, index)
    }else{
      render(index, index+1)
    }
  }
}
const dragend = ( ) => {
  if(typeof endIndex=='number' && startIndex!=endIndex){
    clearTranslate(true)
    
    emits('change', startIndex, endIndex)
  }
}
</script>
