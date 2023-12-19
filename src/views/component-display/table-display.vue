<template>
	<div ref="root" class="h-full bg-brand-hover">
		<t-table
			row-key="index"
			:data="data"
			:columns="columns"
			:pagination="pagination"
			:max-height="height-64"
			bordered>
			<template #operation="{ row }">
				<t-link theme="primary" hover="color" @click="rehandleClickOp(row)">
					{{ row.status === 0 ? '查看详情' : '再次申请' }}
				</t-link>
			</template>
		</t-table>    
	</div>
</template>
 

<script setup lang="jsx">
import { ref, computed, reactive } from 'vue'
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next'
import { useElementSize } from '@vueuse/core'

definePage({
  meta: {
    title: '表格展示',
  },
  icon: () => import('tdesign-icons-vue-next/esm/components/table'),
})
 
const root = ref()
const { height }=useElementSize(root)
const data = []
const statusNameListMap = {
  0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
  1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
  2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
}
for (let i = 0; i < 20; i++) {
  data.push({
    index: i + 1,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    detail: {
      email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    },
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 3, 1, 4][i % 4],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
  })
}
const pagination = ref({ defaultCurrent: 1, defaultPageSize: 20, total: 20 })

const tableLayout = ref('fixed')

const columns = ref([
  { colKey: 'applicant', title: '申请人', width: 100 },
  {
    colKey: 'status',
    title: '审批状态',
    width: 120,
    cell: (h, { row }) => {
      return (
        <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
          {statusNameListMap[row.status].icon}
          {statusNameListMap[row.status].label}
        </t-tag>
      )
    },
  },
  { colKey: 'matters', title: '申请事项', width: 150 },
  { colKey: 'detail.email', title: '邮箱地址', width: 160, ellipsis: true },
  { colKey: 'createTime', title: '申请日期', width: 120 },
  { colKey: 'operation', title: '操作', width: 120 },
])
</script>
<style scoped>
</style>