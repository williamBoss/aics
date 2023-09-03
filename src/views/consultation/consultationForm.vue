<template>
  <div
    v-loading="loading"
    element-loading-text="请稍后......"
  >
    <el-tabs
      v-model="activeTab"
      class="tabs"
      stretch
      @tab-change="handleChange"
    >
      <el-tab-pane
        v-for="(tab, index) in tabs"
        :key="tab.tabCode"
        :name="tab.tabCode"
      >
        <template #label>
          <div>
            <span class="ordinal">{{ index + 1 }}</span>
            {{ tab.tabName }}
          </div>
        </template>
        <template #default>
          <component
            :is="ConsultationReport"
            v-if="tab.tabCode === 'P_A_CONSULTATION_REPORT'"
            key="P_A_CONSULTATION_REPORT"
            :record-id="recordId"
          />
          <form-render
            v-for="template in tab.templateList"
            v-else
            :key="template.templateCode"
            ref="formRef"
            :form-json="template.templateInfo"
            :form-data="formData"
            :disabled="isView"
          />
          <div class="flx flx-right">
            <template v-if="isView || activeTab.value === 'P_A_CONSULTATION_REPORT'">
              <el-button
                type="primary"
                text
                bg
                @click="backToConsultation"
                >返回
              </el-button>
            </template>
            <template v-else>
              <el-button
                type="primary"
                text
                bg
                @click="backToConsultation"
                >取消
              </el-button>
              <el-button
                v-if="!isTrackMedicalRecords"
                color="#626aef"
                plain
                @click="saveDraft"
                >存草稿
              </el-button>
              <el-button
                v-if="index !== 0"
                type="primary"
                @click="prev"
                >上一步
              </el-button>
              <el-button
                v-if="index !== tabs.length - 1"
                type="primary"
                @click="next"
                >下一步
              </el-button>
              <el-button
                v-if="isTrackMedicalRecords || index === tabs.length - 1"
                type="primary"
                @click="finish"
                >完成
              </el-button>
            </template>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import FormRender from '@components/FormRender/FormRender.vue'
import { ConsultationService, QuestionnaireService } from '@api/consultation-api.js'
import router from '@/router/index.js'
import { ElMessage } from 'element-plus'
import ConsultationReport from '@/views/consultation/report.vue'

const props = defineProps({
  recordId: {
    type: String || Number,
    required: false,
    default: ''
  },
  isView: {
    type: Boolean || String,
    required: false,
    default: false
  },
  isTrackMedicalRecords: {
    type: Boolean || String,
    required: false,
    default: false
  },
  tabCode: {
    type: String,
    required: false,
    default: ''
  }
})

const loading = ref(false)
const isView = ref(Boolean(props.isView))
const isTrackMedicalRecords = ref(Boolean(props.isTrackMedicalRecords))
const tabs = ref([])
const activeTab = ref('')
const formRef = ref()
const formData = ref({})
const physicianInfo = ref({})
const patientInfo = ref({})
const questionnaireCode = ref('PHYSICIAN_APOTHECARY')
const recordId = ref(props.recordId)
const answer = ref({})

provide('physicianInfo', ref(physicianInfo))
provide('patientInfo', ref(patientInfo))
provide('answer', ref(answer.value))

const getQuestionnaireTab = () => {
  loading.value = true
  QuestionnaireService.questionnaire
    .getTabInfo({ code: 'PHYSICIAN_APOTHECARY', recordId: recordId.value || '' })
    .then((res) => {
      const { data } = res
      const [{ tabCode, templateList }] = data
      templateList.map((item) => {
        item.templateInfo = JSON.parse(item.templateInfo)
        return item
      })
      tabs.value = data
      if (props.tabCode) {
        activeTab.value = props.tabCode
      } else {
        activeTab.value = tabCode
      }
      loading.value = false
    })
}

const getAnswer = () => {
  loading.value = true
  if (!recordId.value) {
    loading.value = false
    return
  }
  ConsultationService.consultation.consultationDetail(recordId.value).then((res) => {
    const { data } = res
    const { answerMap, patientInfo: patientInfoVo, pharmacistVo } = data
    formData.value = answerMap
    patientInfo.value = patientInfoVo
    physicianInfo.value = pharmacistVo
    loading.value = false
  })
}

const handleChange = () => {
  loading.value = true
  const activeTabCode = activeTab.value
  if (activeTabCode === 'P_A_CONSULTATION_REPORT') {
    loading.value = false
    return
  }
  const findTab = tabs.value.find((e) => e.tabCode === activeTabCode)
  findTab?.templateList.length === 0
    ? QuestionnaireService.questionnaire
        .getQuestionTemplate(activeTabCode)
        .then((res) => {
          const { data } = res
          data.map((item) => {
            item.templateInfo = JSON.parse(item.templateInfo)
            return item
          })
          findTab.templateList = data
        })
        .finally(() => (loading.value = false))
    : (loading.value = false)
}

const backToConsultation = () => {
  router.replace('/consultation/index')
}

const prev = () => {
  const currentTabIndex = tabs.value.findIndex((pane) => pane.tabCode === activeTab.value)
  const nextTabIndex = (currentTabIndex - 1) % tabs.value.length
  activeTab.value = tabs.value[nextTabIndex].tabCode
}

const next = () => {
  const currentTabIndex = tabs.value.findIndex((pane) => pane.tabCode === activeTab.value)
  const nextTabIndex = (currentTabIndex + 1) % tabs.value.length
  activeTab.value = tabs.value[nextTabIndex].tabCode
}

const finish = () => {
  saveAnswer(isTrackMedicalRecords.value ? 2 : 1)
}

const saveDraft = () => {
  saveAnswer(0)
}

const saveAnswer = (isFinished) => {
  if (activeTab.value === '') {
    router.replace('/consultation/index')
    return
  }
  loading.value = true
  const saveData = {}
  Object.assign(answer.value, formData.value, ...formRef.value.map((v) => v.getFormData(false)))
  Object.assign(saveData, {
    answerMap: answer.value,
    isFinished,
    patientInfo: patientInfo.value,
    pharmacistKey: physicianInfo.value.pharmacistKey,
    questionnaireCode: questionnaireCode.value
  })
  if (recordId.value) {
    Object.assign(saveData, {
      recordId: recordId.value
    })
  }
  if (!physicianInfo.value.pharmacistKey) {
    ElMessage.warning('请选择药师/医师信息')
    return
  }
  console.log(saveData)
  QuestionnaireService.questionnaire.saveAnswer(saveData).then((res) => {
    loading.value = false
    ElMessage.success('成功')
    router.replace('/consultation/index')
  })
}

onMounted(async () => {
  await getAnswer()
  await getQuestionnaireTab()
})
</script>

<style scoped>
::v-deep(.el-tabs__item) .ordinal {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  color: #ffffff;
  background: #51515b;
}

::v-deep(.el-tabs__item:hover) .ordinal,
::v-deep(.el-tabs__item.is-active) .ordinal {
  background: var(--el-color-primary);
}
</style>
