<template>
  <div
    v-loading="loading"
    element-loading-text="获取问卷信息......"
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
          <form-render
            v-for="template in tab.templateList"
            :key="template.templateCode"
            ref="formRef"
            :form-json="template.templateInfo"
            :form-data="formData"
          />
          <div class="flx flx-right">
            <el-button
              type="primary"
              text
              bg
              @click="router.back"
              >取消
            </el-button>
            <el-button
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
              v-else
              type="primary"
              @click="finish"
              >完成
            </el-button>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import FormRender from '@components/FormRender/FormRender.vue'
import { QuestionnaireService } from '@api/consultation-api.js'
import router from '@/router/index.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  recordId: { type: String || Number, required: false, default: '' }
})

const loading = ref(false)
const tabs = ref([])
const activeTab = ref('base')
const formRef = ref()
const formData = ref({})
const physicianInfo = ref({})
const patientInfo = ref({})
const questionnaireCode = ref('PHYSICIAN_APOTHECARY')
const recordId = ref(props.recordId)
const answer = ref({})

provide('physicianInfo', ref(physicianInfo.value))
provide('patientInfo', ref(patientInfo.value))
provide('answer', ref(answer.value))

const getQuestionnaireTab = () => {
  loading.value = true
  QuestionnaireService.questionnaire
    .getTabInfo({ code: 'PHYSICIAN_APOTHECARY', recordId: props.recordId || '' })
    .then((res) => {
      const { data } = res
      const [{ tabCode, templateList }] = data
      templateList.map((item) => {
        item.templateInfo = JSON.parse(item.templateInfo)
        return item
      })
      tabs.value = data
      activeTab.value = tabCode
      loading.value = false
    })
}

const handleChange = () => {
  loading.value = true
  const activeTabCode = activeTab.value
  const findTab = tabs.value.find((e) => e.tabCode === activeTabCode)
  if (findTab?.templateList.length === 0) {
    QuestionnaireService.questionnaire.getQuestionTemplate(activeTabCode).then((res) => {
      const { data } = res
      data.map((item) => {
        item.templateInfo = JSON.parse(item.templateInfo)
        return item
      })
      findTab.templateList = data
      loading.value = false
    })
  } else {
    loading.value = false
  }
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
  saveAnswer(1)
}

const saveDraft = () => {
  saveAnswer(0)
}

const saveAnswer = (isFinished) => {
  const saveData = {}
  Object.assign(answer.value, ...formRef.value.map((v) => v.getFormData(false)))
  Object.assign(saveData, {
    answerMap: answer,
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
  console.log(saveData)
  if (!physicianInfo.value.pharmacistKey) {
    ElMessage.warning('请选择药师/医师信息')
    return
  }
  /* QuestionnaireService.questionnaire.saveAnswer(saveData).then((res) => {
     ElMessage.success('成功')
     router.replace('/consultation/index')
   })*/
}

onMounted(() => {
  getQuestionnaireTab()
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
