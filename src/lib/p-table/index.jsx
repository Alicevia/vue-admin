import { defineComponent } from 'vue'
import { useElementSize, useCurrentElement } from '@vueuse/core'
import { Table } from 'tdesign-vue-next'


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
  
  return () => <t-card {...attrs} v-slots={slots} class='h-full'>
      
    <t-table  {...props} scroll={scroll}  v-slots={slots}></t-table>
  </t-card>
 
}, {
  name: 'PTable',
  props: Object.assign({}, Table.props),
})
