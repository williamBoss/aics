<template>
  <el-row :gutter="12">
    <el-col :span="4">
      <el-form-item
        label="患者编号"
        prop="patientCode"
      >
        <el-autocomplete
          v-model="patientInfo.patientCode"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          placeholder="请输入"
          @select="handleSelect"
        >
          <template #default="{ item }">
            <div>{{ item.patientCode }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item
        label="性别"
        prop="gender"
      >
        <el-radio-group v-model="patientInfo.gender">
          <el-radio-button :label="1">男</el-radio-button>
          <el-radio-button :label="2">女</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item
        label="年龄"
        prop="age"
      >
        <el-input
          v-model="patientInfo.age"
          placeholder="请输入"
          oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '')"
        >
          <template #suffix>
            <span class="input-suffix">岁</span>
          </template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item
        label="身高"
        prop="height"
      >
        <el-input
          v-model="patientInfo.height"
          placeholder="请输入"
          oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '')"
          @change="calcBMI"
        >
          <template #suffix>
            <span class="input-suffix">cm</span>
          </template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item
        label="体重"
        prop="weight"
      >
        <el-input
          v-model="patientInfo.weight"
          placeholder="请输入"
          oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '')"
          @change="calcBMI"
        >
          <template #suffix>
            <span class="input-suffix">kg</span>
          </template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item
        label="BMI"
        prop="bmi"
      >
        <el-input
          v-model="patientInfo.bmi"
          placeholder="输入身高体重后自动计算"
          readonly
        />
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script setup>
import { defineComponent, inject, ref } from 'vue'
import { ConsultationService } from '@api/consultation-api.js'

defineComponent({
  name: 'PatientInfo'
})

const patientInfo = ref(inject('patientInfo'))

const querySearchAsync = (queryString, cb) => {
  ConsultationService.patient.list({ patientCode: queryString }).then((res) => {
    cb(res.data)
  })
}

const handleSelect = (item) => {
  Object.assign(patientInfo.value, item)
}

const calcBMI = () => {
  if (patientInfo.value.weight && patientInfo.value.height) {
    const weight = Number(patientInfo.value.weight)
    const height = Number(patientInfo.value.height) / 100
    patientInfo.value.bmi = Number((weight / height ** 2).toFixed(2))
  }
}
</script>

<style scoped>
:deep(.el-radio-button) {
  margin-right: 15px;
}

:deep(.el-radio-button) .el-radio-button__inner {
  background: #eaeaf9;
  color: #4949c9;
  border-radius: 4px;
  border: 0;
}

::v-deep(.el-radio-button).is-active .el-radio-button__inner {
  background: #4949c9;
  color: #ffffff;
}

.input-suffix {
  font-size: 14px;
  font-weight: 400;
  color: #51515a;
  line-height: 20px;
}
</style>
