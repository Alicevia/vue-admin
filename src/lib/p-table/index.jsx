import { defineComponent } from 'vue'
import { useElementSize, useCurrentElement } from '@vueuse/core'
import { Table } from '@arco-design/web-vue'
export default defineComponent(function  (props, { slots, attrs }){
  const root = useCurrentElement()
  const { height }=useElementSize(root)

  const scroll = reactive({
    y: computed(() => {
      if(!props.scroll){
        return height.value-168
      }
    }), 
  })
  
  return () => <a-card {...attrs} v-slots={slots} class='h-full'>
      
    <a-table  {...props} scroll={scroll}  v-slots={slots}></a-table>
  </a-card>
 
}, {
  name: 'PTable',
  props: Object.assign({}, Table.props),
})


{/* <template>
	<a-card hoverable style="height: 100%;">
		<template #title>
			<a-button type="primary">
				新建
			</a-button>
		</template>
		<template #extra>
			<a-space>
				<a-button type="primary">
					刷新数据
				</a-button>
				<a-button shape="circle"> 
					<template #icon>
						<icon-refresh></icon-refresh>
					</template>
				</a-button>
				<a-button shape="circle">
					<template #icon>
						<icon-settings></icon-settings>
					</template>
				</a-button>
			</a-space>
		</template>
		<a-table v-bind="tableState">
		</a-table>
	</a-card>
</template>
 

<script setup lang="jsx">
import { computed, reactive } from 'vue'
import { useElementSize, useCurrentElement } from '@vueuse/core'
defineOptions({
  name: 'PTable',
})
const props = defineProps({
  tableState: Object,
})
const { height }=useElementSize(useCurrentElement())

const scroll = reactive({
  y: computed(() => height.value-168), 
})

 
</script>
<style scoped>
</style> */}
