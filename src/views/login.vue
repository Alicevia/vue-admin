<template>
	<div>
		<t-form ref="formRef" :model="form" :style="{ width: '600px' }">
			<t-form-item field="name" label="Username" :rules="rules">
				<t-input v-model="form.name" a="232;lk" sdfljk="'asdfljk laksdjf'"
					placeholder="please enter your username...">
				</t-input>
			</t-form-item>
			<t-form-item field="post"
				label="Post">
				<t-input v-model="form.post"
					placeholder="please enter your post...">
				</t-input>
			</t-form-item>
			<t-form-item field="isRead">
				<t-checkbox v-model="form.isRead">
					I have read the manual
				</t-checkbox>
			</t-form-item>
			<t-form-item>
				<t-button @click="handleClick">
					Set Status
				</t-button>
			</t-form-item>
		</t-form>
	</div>
</template>

<script setup>
definePage({
  layout: false,
})
const formRef = ref()
const form = reactive({
  name: '',
  post: '',
  isRead: false,
})
const rules = [
  {
    validator: (value, cb) => {
      return new Promise((resolve) => {
        window.setTimeout(() => {
          if (value !== 'admin') {
            cb('name must be admin')
          }
          resolve()
        }, 2000)
      })
    },
  },
]
const handleClick = () => {
  formRef.value.setFields({
    name: {
      status: 'error',
      message: 'async name error',
    },
    post: {
      status: 'error',
      message: 'valid post',
    },
  })
}
</script>
<style scoped></style>
