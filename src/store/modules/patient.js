import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { ref } from 'vue'

export const patientStore = defineStore(
  'PatientState',
  () => {
    const patientInfo = ref({})
    const add = (info) => {
      patientInfo.value = info
    }
    const clear = () => {
      patientInfo.value = {}
    }
    return { patientInfo, add, clear }
  },
  {
    persist: piniaPersistConfig('PatientState')
  }
)
