<template>
  <form-render
    v-for="(item, index) in formJson"
    :key="index"
    ref="formRef"
    :form-json="item"
    :form-data="formData"
  >
  </form-render>
</template>

<script setup>
import FormRender from '@components/FormRender/FormRender.vue'
import { defineComponent, onMounted, ref } from 'vue'
import a from './会诊基本信息.json'
import b from './患者基本信息.json'
import c from './感染相关信息.json'
import d from './会诊结果.json'
import e from './会诊疗效评价.json'

defineComponent({
  name: 'SlfForm'
})

const formRef = ref(null)
const formJson = ref([])
const formData = ref({})

onMounted(() => {
  formJson.value.push(a)
  formJson.value.push(b)
  formJson.value.push(c)
  formJson.value.push(d)
  formJson.value.push(e)
})
</script>

<style scoped></style>
