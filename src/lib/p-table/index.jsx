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
