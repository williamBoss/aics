<template>
  <div
    v-loading="loading"
    element-loading-text="获取问卷信息......"
  >
    <el-tabs
      v-model="activeTab"
      class="tabs"
      stretch
      @tab-click="handleClick"
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
            :form-data="formData[template.templateCode]"
          />
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import FormRender from '@components/FormRender/FormRender.vue'
import basejson from '../form/会诊基本信息.json'
import patientjson from '../form/患者基本信息.json'
import infectionInfo from '../form/感染相关信息.json'
import consultationResult from '../form/会诊结果.json'
import consultationEvaluation from '../form/会诊疗效评价.json'

const loading = ref(false)
const tabs = ref([])
const activeTab = ref('base')
const formRef = ref()
const formData = ref({})
const physicianInfo = ref({})
const patientInfo = ref({})

provide('physicianInfo', ref(physicianInfo.value))
provide('patientInfo', ref(patientInfo.value))

const getQuestionnaireTab = () => {
  tabs.value.push({
    tabCode: 'base',
    tabName: '会诊基本信息',
    templateList: [{ templateCode: 'base', templateInfo: basejson }]
  })
  tabs.value.push({
    tabCode: 'patient',
    tabName: '患者基本信息',
    templateList: [{ templateCode: 'patient', templateInfo: patientjson }]
  })
  tabs.value.push({
    tabCode: 'infectionInfo',
    tabName: '感染相关信息',
    templateList: [{ templateCode: 'infectionInfo', templateInfo: infectionInfo }]
  })
  tabs.value.push({
    tabCode: 'consultationResult',
    tabName: '会诊结果',
    templateList: [{ templateCode: 'consultationResult', templateInfo: consultationResult }]
  })
  tabs.value.push({
    tabCode: 'consultationEvaluation',
    tabName: '会诊疗效评价',
    templateList: [{ templateCode: 'consultationEvaluation', templateInfo: consultationEvaluation }]
  })
  /*loading.value = true
  QuestionnaireService.questionnaire.getTabInfo('test').then((res) => {
    const { data } = res
    const [{ tabCode, templateList }] = data
    templateList.map((item) => {
      item.templateInfo = JSON.parse(item.templateInfo)
      return item
    })
    tabs.value = data
    activeTab.value = tabCode
    loading.value = false
  })*/
}
const handleClick = () => {}

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
