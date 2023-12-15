import { computed, defineComponent } from 'vue'
import { useElementSize, useCurrentElement } from '@vueuse/core'
import { Table } from 'tdesign-vue-next'


export default defineComponent(function  (props, { slots, attrs }){
  const root = useCurrentElement()
  const { height }=useElementSize(root)

  const maxHeight = computed(() => {
    return props.maxHeight??height.value-100
  })
 
  return () => <t-card {...attrs} v-slots={slots} class='h-full'>
      
    <t-table  {...props} maxHeight={maxHeight} v-slots={slots}></t-table>
  </t-card>
 
}, {
  name: 'PTable',
  props: Object.assign({}, Table.props),
})
