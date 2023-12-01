<template>
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
		<a-table :scroll="scroll" :pagination="pagination" :columns="columns"
			:data="data">
			<template #name="{ rowIndex }">
				<a-input v-model="data[rowIndex].name"></a-input>
			</template>
			<template #province="{ rowIndex }">
				<a-select v-model="data[rowIndex].province" @change="()=>handleChange(rowIndex)">
					<a-option v-for="value of Object.keys(options)">
						{{ value }}
					</a-option>
				</a-select>
			</template>
			<template #city="{ rowIndex }">
				<a-select v-model="data[rowIndex].city" :options="options[data[rowIndex].province] || []"></a-select>
			</template>
		</a-table>
	</a-card>
</template>
 

<script setup>
import { computed, reactive } from 'vue'
import { useElementSize, useCurrentElement } from '@vueuse/core'
definePage({
  title: '表格展示',
  icon: () => import('@arco-design/web-vue/es/icon/icon-list'),
})
const { height }=useElementSize(useCurrentElement())


const options = {
  Beijing: ['Haidian', 'Chaoyang', 'Changping'],
  Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
  Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou'],
}
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  slotName: 'name',
}, {
  title: 'Salary',
  dataIndex: 'salary',
}, {
  title: 'Address',
  dataIndex: 'address',
}, {
  title: 'Province',
  dataIndex: 'province',
  slotName: 'province',
}, {
  title: 'City',
  dataIndex: 'city',
  slotName: 'city',
}, {
  title: 'Email',
  dataIndex: 'email',
}]
const pagination = reactive({
  total: 40,
  current: 1,
  pageSize: 20,
})
const scroll = reactive({
  y: computed(() => height.value-168), 
})
const data = reactive(new Array(40).fill(0).map((_, i) => {
  return {
    key: i+1,
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    province: 'Beijing',
    city: 'Haidian',
    email: 'jane.doe@example.com',
  }
}))

const handleChange = (rowIndex) => {
  data[rowIndex].city = ''
}
</script>
<style scoped>
</style>