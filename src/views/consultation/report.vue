<template>
  <div
    v-loading="loading"
    class="report"
    element-loading-text="获取报告信息......"
  >
    <div class="flx info">
      <div class="header">
        <svg-icon
          name="header"
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="patientInfo">
        <el-row>
          <div
            class="item"
            style="font-size: 20px"
          >
            {{ patientInfo.patientCode }}
          </div>
          <div class="item">感染诊断</div>
        </el-row>
        <el-row>
          <div class="item">
            <span>{{ patientInfo.gender }}</span>
            <el-divider :direction="'vertical'" />
            <span>{{ `${patientInfo.age}岁` }}</span>
          </div>
          <div class="item">{{ reportInfo.sitesInfection }}</div>
        </el-row>
      </div>
    </div>
    <el-card
      class="card card-container"
      shadow="never"
    >
      <template #header>
        <div class="card-header">
          <span class="title">感染相关信息</span>
        </div>
      </template>
      <template #default>
        <div class="sub-title margin-b-16">感染病原体</div>
        <div class="bg">
          <div>
            <p
              class="desc"
              v-html="getPathogen()"
            ></p>
          </div>
        </div>
      </template>
    </el-card>
    <el-card
      class="card card-container"
      shadow="never"
    >
      <template #header>
        <div class="card-header">
          <span class="title">{{ `${props.currentQuestionnaireCode === 'PHYSICIAN' ? '医师' : '药师'}会诊意见` }}</span>
        </div>
      </template>
      <template #default>
        <div class="margin-b-40">
          <div class="sub-title margin-b-16">治疗建议一</div>
          <div class="bg">
            <div>
              <p class="desc">会诊意见：{{ reportInfo.apothecarySpecificDescription }}</p>
            </div>
            <dynamic-table
              :table-data="medicine.pharmacistTableData"
              :table-header="medicine.tableHeader"
              :is-show-operation="false"
            />
          </div>
        </div>
        <div>
          <el-row :gutter="40">
            <el-col :span="12">
              <div class="sub-title margin-b-16">治疗建议二</div>
              <div class="bg">
                <div>
                  <p class="desc">需要完善的检查：{{ reportInfo.apothecaryPerfectCheck }}</p>
                  <p class="desc">动态监测指标：{{ reportInfo.apothecaryDynamicMonitoring }}</p>
                  <p class="desc">{{ reportInfo.apothecaryOther }}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="sub-title margin-b-16">采纳意见</div>
              <div class="bg">
                <div>
                  <p class="desc">{{ reportInfo.apothecaryAdoptOpinions }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-card>
    <el-card
      v-if="props.currentQuestionnaireCode === 'PHYSICIAN_APOTHECARY'"
      class="card card-container"
      shadow="never"
    >
      <template #header>
        <div class="card-header">
          <span class="title">医师会诊意见</span>
        </div>
      </template>
      <template #default>
        <div class="margin-b-40">
          <div class="sub-title margin-b-16">治疗建议一</div>
          <div class="bg">
            <div>
              <p class="desc">会诊意见：{{ reportInfo.physicianConsultationOpinions }}</p>
            </div>
            <dynamic-table
              :table-data="medicine.physicianTableData"
              :table-header="medicine.tableHeader"
              :is-show-operation="false"
            />
          </div>
        </div>
        <div class="margin-b-40">
          <el-row :gutter="40">
            <el-col :span="12">
              <div class="sub-title margin-b-16">治疗建议二</div>
              <div class="bg">
                <div>
                  <p class="desc">需要完善的检查：{{ reportInfo.physicianPerfectCheck }}</p>
                  <p class="desc">动态监测指标：{{ reportInfo.physicianDynamicMonitoring }}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="sub-title margin-b-16">采纳意见（{{ reportInfo.physicianAdoptOpinions }}）</div>
              <div class="bg">
                <div>
                  <p class="desc">不一致意见：</p>
                  <p class="desc">{{ reportInfo.otherOpinion }}</p>
                  <p class="desc">{{ reportInfo.otherOpinionDetail }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="sub-title margin-b-16">最终采纳意见（{{ reportInfo.physicianAdoptedWho }}）</div>
        </div>
      </template>
    </el-card>
    <el-card
      class="card card-container"
      shadow="never"
    >
      <template #header>
        <div class="card-header">
          <span class="title">会诊建议类型/患者转归结局</span>
        </div>
      </template>
      <template #default>
        <div>
          <el-row :gutter="40">
            <el-col :span="12">
              <div class="sub-title margin-b-16">会诊建议类型</div>
              <div class="bg">
                <div>
                  <p class="desc">{{ reportInfo.physician_Recommendation_type }}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="sub-title margin-b-16">患者转归结局</div>
              <div class="bg">
                <div>
                  <p class="desc">药敏情况：{{ reportInfo.susceptibilityConditions }}</p>
                  <p class="desc">转归结局：{{ reportInfo.outcome }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import SvgIcon from '@components/SvgIcon/index.vue'
import DynamicTable from '@components/Table/DynamicTable.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ConsultationService } from '@api/consultation-api.js'

defineComponent({
  name: 'ConsultationReport'
})

const props = defineProps({
  recordId: {
    type: String || Number,
    required: true
  },
  currentQuestionnaireCode: {
    type: String,
    required: true
  }
})

const loading = ref(false)
const patientInfo = ref({})
const reportInfo = ref({})
const medicine = reactive({
  tableHeader: [
    { prop: 'drugName', label: '药物名称（通用名）', width: '200' },
    { prop: 'drugType', label: '进口/国产' },
    { prop: 'isCollect', label: '是否集采' },
    { prop: 'specifications', label: '规格/g' },
    { prop: 'singleDose', label: '单次用药剂量/g' },
    { prop: 'medicationFrequency', label: '用药频次' },
    { prop: 'treatmentCourse', label: '疗程/d' },
    { prop: 'totalDose', label: '总剂量/g' },
    { prop: 'antibacterialCosts', label: '抗菌药花费（元）' }
  ],
  // 表格数据
  pharmacistTableData: [],
  physicianTableData: []
})

const getReport = () => {
  loading.value = true
  if (!props.recordId) {
    loading.value = false
    return
  }
  ConsultationService.consultation
    .consultationReport(props.recordId)
    .then((res) => {
      const {
        data: { apothecaryMedScheme = [], physicianMedicationAdjustment = [], patientInfo: patient },
        data
      } = res
      medicine.pharmacistTableData = apothecaryMedScheme
      medicine.physicianTableData = physicianMedicationAdjustment
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          const filteredArray = value.filter((item) => typeof item !== 'object')
          data[key] = filteredArray.length > 0 ? filteredArray.join('、 ') : value
        }
      })
      reportInfo.value = data
      patient && (patient.gender = patient.gender === 1 ? '男' : patient.gender === 2 ? '女' : '未知')
      patient && (patientInfo.value = patient)
    })
    .finally(() => (loading.value = false))
}

const getPathogen = () => {
  const pathogen = reportInfo.value.pathogen
  if (Array.isArray(pathogen)) {
    return pathogen
      .map((item) => {
        return [
          item.pathogen?.[0],
          item.classificationBacteria?.[0],
          item.specificStrains?.join(','),
          item.otherPathogen
        ]
          .filter((v) => v)
          .join('-')
      })
      .filter((v) => v.trim() !== '')
      .join('<br/><br/>')
  }
  return pathogen
}

onMounted(() => {
  getReport()
})
</script>

<style scoped>
.report {
  margin-top: 30px;
}

.report .info {
  height: 122px;
  background: #4949c9;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
}

.report .info .header {
  width: 64px;
  height: 64px;
  padding: 30px 15px 30px 30px;
}

.report .info .patientInfo {
  width: 100%;
  padding: 30px 15px;
}

.report .info .patientInfo .el-row:first-child {
  margin-bottom: 17px;
}

.report .info .patientInfo .item {
  flex: 1;
}

.report .card .sub-title {
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #222222;
  line-height: 20px;
}

.report .card .sub-title:before {
  content: '●';
  font-size: 6px;
  margin-right: 7px;
  color: rgba(73, 73, 201, 0.5);
}

.report .card .bg {
  background: #f4f7ff;
  border-radius: 6px;
  padding: 24px;
  flex-grow: 1;
}

.report .card .el-col {
  display: flex;
  flex-direction: column;
}

.report .card .bg .desc {
  font-size: 14px;
  font-weight: 400;
  color: #51515a;
  line-height: 22px;
}

:deep(.table-header) {
  background: #e5e5ff !important;
}
</style>
