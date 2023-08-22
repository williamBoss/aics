<template>
  <el-descriptions
    :column="6"
    direction="vertical"
  >
    <el-descriptions-item
      label="姓名"
      label-class-name="descriptions-label"
      class-name="descriptions-content"
    >
      <el-autocomplete
        v-model="physicianInfo.pharmacistName"
        :fetch-suggestions="querySearchAsync"
        :trigger-on-focus="false"
        placeholder="请输入"
        @select="handleSelect"
      >
        <template #default="{ item }">
          <div>{{ item.pharmacistName }}</div>
        </template>
      </el-autocomplete>
    </el-descriptions-item>
    <el-descriptions-item
      label="职称"
      label-class-name="descriptions-label"
      class-name="descriptions-content"
      >{{ physicianInfo.title }}
    </el-descriptions-item>
    <el-descriptions-item
      label="学历"
      label-class-name="descriptions-label"
      class-name="descriptions-content"
      >{{ physicianInfo.degree }}
    </el-descriptions-item>
    <el-descriptions-item
      label="工作年限"
      label-class-name="descriptions-label"
      class-name="descriptions-content"
      >{{ physicianInfo.jobYears }}
    </el-descriptions-item>
    <el-descriptions-item
      label="有无临床药师证书"
      label-class-name="descriptions-label"
      class-name="descriptions-content"
    >
      {{ physicianInfo.pharmacistCertificate === 1 ? '有' : physicianInfo.pharmacistCertificate === 0 ? '无' : '' }}
    </el-descriptions-item>
    <el-descriptions-item
      label="是否抗感染专业"
      label-class-name="descriptions-label"
      class-name="descriptions-content"
    >
      {{ antiInfectionSpecialtyEnum[physicianInfo.antiInfectionSpecialty] }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { defineComponent, inject, ref } from 'vue'
import { HospitalService } from '@api/consultation-api.js'

defineComponent({
  name: 'PhysicianInfo'
})

const physicianInfo = ref(inject('physicianInfo'))
const antiInfectionSpecialtyEnum = {
  0: '否',
  2: '呼吸',
  3: '感染',
  4: '重症ICU专业',
  5: '其他'
}

const querySearchAsync = (queryString, cb) => {
  HospitalService.pharmacist.getPharmacistInfo({ pharmacistName: queryString }).then((res) => {
    cb(res.data)
  })
}

const handleSelect = (item) => {
  Object.assign(physicianInfo.value, item)
}
</script>

<style scoped>
:deep(.descriptions-label),
:deep(.descriptions-content) {
  width: 16.66%;
}

:deep(.descriptions-label:not(:first-child)),
:deep(.descriptions-content:not(:first-child)) {
  padding-left: 20px;
}
</style>
