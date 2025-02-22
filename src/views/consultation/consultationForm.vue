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
            v-if="tab.tabCode.endsWith('CONSULTATION_REPORT')"
            :key="tab.tabCode"
            :record-id="recordId"
            :current-questionnaire-code="currentQuestionnaireCode"
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
                color="#626aef"
                plain
                @click="saveDraft(false)"
                >保存草稿
              </el-button>
              <el-button
                color="#626aef"
                plain
                @click="saveDraft(true)"
                >保存草稿并退出
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
                v-if="index === tabs.length - 1"
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
import { ElMessage, ElMessageBox, ElOption, ElSelect } from 'element-plus'
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
  tabCode: {
    type: String,
    required: false,
    default: ''
  },
  questionnaireCode: {
    type: String,
    required: false,
    default: ''
  }
})

const loading = ref(false)
const isView = ref(Boolean(props.isView))
const tabs = ref([])
const activeTab = ref('')
const formRef = ref()
const formData = ref({})
const physicianInfo = ref({})
const patientInfo = ref({})
const currentQuestionnaireCode = ref('')
const recordId = ref(props.recordId)
const questionTypeOptions = ref([])
const answer = ref({})

provide('physicianInfo', ref(physicianInfo))
provide('patientInfo', ref(patientInfo))
provide('answer', ref(answer.value))

const chooseQuestionnaireType = async () => {
  await ConsultationService.consultation.getConsultationQuestionInfo().then((res) => {
    questionTypeOptions.value = res.data
  })
  ElMessageBox.confirm('会诊类型', '会诊类型', {
    message: () =>
      h(
        ElSelect,
        {
          modelValue: currentQuestionnaireCode.value,
          'onUpdate:modelValue': (val) => {
            currentQuestionnaireCode.value = val
          },
          placeholder: '请选择'
        },
        () =>
          questionTypeOptions.value?.map((item) => {
            return h(ElOption, { label: item.name, value: item.code })
          })
      ),
    closeOnClickModal: false,
    beforeClose: (action, instance, done) => {
      if (action === 'cancel') {
        done()
        return
      }
      instance.confirmButtonLoading = true
      currentQuestionnaireCode.value === '' ? ElMessage.warning('请选择会诊类型') : done()
      instance.confirmButtonLoading = false
    }
  })
    .then(() => getQuestionnaireTab())
    .catch(() => backToConsultation())
}

const getQuestionnaireTab = () => {
  loading.value = true
  QuestionnaireService.questionnaire
    .getTabInfo({ code: currentQuestionnaireCode.value, recordId: recordId.value || '' })
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
    })
    .finally(() => (loading.value = false))
}

const getAnswer = () => {
  loading.value = true
  if (!recordId.value) {
    loading.value = false
    return
  }
  return ConsultationService.consultation
    .consultationDetail(recordId.value)
    .then((res) => {
      const { data } = res
      const { answerMap, patientInfo: patientInfoVo, pharmacistVo } = data
      formData.value = answerMap
      patientInfo.value = patientInfoVo
      physicianInfo.value = pharmacistVo
    })
    .finally(() => (loading.value = false))
}

const handleChange = () => {
  loading.value = true
  const activeTabCode = activeTab.value
  if (activeTabCode.endsWith('CONSULTATION_REPORT')) {
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
  saveAnswer(2)
}

const saveDraft = (isExit) => {
  saveAnswer(0, isExit)
}

const saveAnswer = (isFinished, isExit = true) => {
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
    questionnaireCode: currentQuestionnaireCode.value
  })
  if (recordId.value) {
    Object.assign(saveData, {
      recordId: recordId.value
    })
  }
  if (!physicianInfo.value.pharmacistKey) {
    ElMessage.warning('请选择药师/医师信息')
    loading.value = false
    return
  }
  console.log(saveData)
  QuestionnaireService.questionnaire
    .saveAnswer(saveData)
    .then((res) => {
      ElMessage.success('成功')
      const { data } = res
      recordId.value = data
    })
    .finally(() => {
      loading.value = false
      if (isExit) {
        router.replace('/consultation/index')
      }
    })
}

onMounted(async () => {
  await getAnswer()
  if (props.questionnaireCode) {
    currentQuestionnaireCode.value = props.questionnaireCode
    getQuestionnaireTab()
  } else {
    await chooseQuestionnaireType()
  }
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
