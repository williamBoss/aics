<template>
  <el-dialog
    v-model="open"
    :title="title"
    width="600px"
    append-to-body
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item
        label="医院名称"
        prop="hospitalName"
      >
        <el-input
          v-model="form.hospitalName"
          placeholder="请输入医院名称"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item
        label="医院级别"
        prop="hospitalLevel"
      >
        <el-select
          v-model="form.hospitalLevel"
          placeholder="请选择医院级别"
          style="width: 240px"
        >
          <el-option
            v-for="item in hospitalLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          @click="submitForm(formRef)"
          >确 定
        </el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineComponent, reactive, ref } from 'vue'
import { resetForm } from '@/utils/util'
import { HospitalService } from '@api/consultation-api.js'
import { ElMessage } from 'element-plus'
import { ElMessage as elMessage } from 'element-plus/es/components/message/index'

defineComponent({
  name: 'HospitalInfo'
})

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['refresh'])
const open = ref(false)
const formRef = ref()
const form = ref({})
const rules = reactive({
  hospitalName: [{ required: true, message: '医院名称不能为空', trigger: 'blur' }]
})
const hospitalLevelOptions = reactive([
  { label: '三甲医院', value: '三甲医院' },
  { label: '三级医院', value: '三级医院' },
  { label: '二级医院', value: '二级医院' },
  { label: '社区医院', value: '社区医院' }
])

const acceptParams = (data = {}) => {
  if (data) {
    form.value = data
  }
  open.value = true
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (form.value.hospitalKey) {
        HospitalService.hospital.update(form.value).then(() => {
          open.value = false
          ElMessage.success('成功')
          emit('refresh')
        })
      } else {
        HospitalService.hospital.add(form.value).then(() => {
          open.value = false
          elMessage.success('成功')
          emit('refresh')
        })
      }
    } else {
      console.error('error submit!', fields)
    }
  })
}

const cancel = () => {
  open.value = false
  reset()
}

const reset = () => {
  resetForm(formRef.value)
  form.value = {}
}

defineExpose({
  acceptParams,
  reset
})
</script>

<style scoped></style>
