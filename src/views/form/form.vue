<template>
  <form-render
    ref="formRef"
    :form-json="formJson"
    :form-data="formData"
  >
  </form-render>
</template>

<script setup>
import FormRender from '@components/FormRender/FormRender.vue'
import { defineComponent, reactive, ref } from 'vue'
import json from './vform40574.json'

defineComponent({
  name: 'slfForm'
})

const formRef = ref(null)
const formJson = reactive(json)
const formData = ref({})
</script>

<style scoped></style>
