<template>
	<p-table :columns="columns" :data="data" :pagination="pagination">
		<template #title>
			<t-button type="primary">
				新建
			</t-button>
		</template>
		<template #extra>
			<t-space>
				<t-button type="primary">
					刷新数据
				</t-button>
				<t-button shape="circle"> 
					<template #icon>
						<RefreshIcon></RefreshIcon>
					</template>
				</t-button>
				<t-button shape="circle">
					<template #icon>
						<Setting1Icon></Setting1Icon>
					</template>
				</t-button>
			</t-space>
		</template>
	</p-table>
</template>
 

<script setup>
import { computed, reactive } from 'vue'
definePage({
  title: '表格展示',
  icon: () => 23,
})


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