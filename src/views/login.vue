<template>
	<div>
		<a-form ref="formRef" :model="form" :style="{ width: '600px' }">
			<a-form-item field="name" label="Username" :rules="rules">
				<a-input v-model="form.name" a="232;lk" sdfljk="'asdfljk laksdjf'"
					placeholder="please enter your username..."></a-input>
			</a-form-item>
			<a-form-item field="post"
				label="Post">
				<a-input v-model="form.post"
					placeholder="please enter your post..."></a-input>
			</a-form-item>
			<a-form-item field="isRead">
				<a-checkbox v-model="form.isRead">
					I have read the manual
				</a-checkbox>
			</a-form-item>
			<a-form-item>
				<a-button @click="handleClick">
					Set Status
				</a-button>
			</a-form-item>
		</a-form>
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
