<template>
  <div
    v-loading="loading"
    element-loading-text="数据加载中"
  >
    <div>
      <el-button
        :icon="Back"
        style="height: 28px; padding: 4px 7px"
        @click="back"
      />
      <span
        class="title"
        style="margin-left: 10px"
      >
        医院档案
      </span>
    </div>
    <div class="flx header margin-t-30">
      <div
        class="img"
        :style="{ borderColor: '#aabaf4' }"
      >
        <p :style="{ color: '#32415b' }">{{ hospitalName }}</p>
      </div>
      <div style="margin-left: 30px">
        <div class="hospitalName">
          {{ hospitalInfo?.hospitalName }}
        </div>
        <div style="margin-top: 4px">
          <el-tag>{{ hospitalInfo?.hospitalLevel }}</el-tag>
        </div>
      </div>
    </div>
    <div class="margin-t-30">
      <div class="flx">
        <p class="title">本院药师信息</p>
        <div class="flx-align-center flx-right">
          <el-button
            v-show="!isHospitalPharmacistEdit && !hospitalPharmacistInfo"
            type="primary"
            :icon="Plus"
            @click="handleHospitalPharmacistAdd"
          >
            新增
          </el-button>
          <el-button
            v-show="!isHospitalPharmacistEdit && hospitalPharmacistInfo"
            type="primary"
            :icon="Edit"
            @click="handleHospitalPharmacistUpdate"
          >
            修改
          </el-button>
        </div>
      </div>
      <el-divider style="margin-top: 0" />
      <el-descriptions
        v-show="!isHospitalPharmacistEdit"
        class="margin-t-30"
        direction="vertical"
        :column="4"
        style="padding: 20px; background: #ffffff"
      >
        <el-descriptions-item label="药师">
          {{ `${hospitalPharmacistInfo?.pharmacistCount || ''} 名` }}
        </el-descriptions-item>
        <el-descriptions-item label="会诊资质药师">
          {{ `${hospitalPharmacistInfo?.qualifiedPharmacistCount || ''} 名` }}
        </el-descriptions-item>
        <el-descriptions-item label="抗感染相关专业药师">
          {{ `${hospitalPharmacistInfo?.antiInfectionSpecialtyCount || ''} 名` }}
        </el-descriptions-item>
        <el-descriptions-item></el-descriptions-item>
        <el-descriptions-item label="年总抗感染会诊累计例数">
          {{ `${getOptionLabel(hospitalPharmacistInfo?.antiInfectionYearTotal || '')}` }}
        </el-descriptions-item>
        <el-descriptions-item label="临床药师年会诊总例数">
          {{ `${getOptionLabel(hospitalPharmacistInfo?.qualifiedPharmacistYearTotal || '')}` }}
        </el-descriptions-item>
        <el-descriptions-item label="人均会诊例数">
          {{ `${hospitalPharmacistInfo?.consultationPerCapitaCount || ''} 例` }}
        </el-descriptions-item>
        <el-descriptions-item label="抗感染会诊占总会诊百分比">
          {{ `${hospitalPharmacistInfo?.antiInfectionPercent || ''} %` }}
        </el-descriptions-item>
      </el-descriptions>
      <div v-show="isHospitalPharmacistEdit">
        <el-card
          class="card"
          shadow="never"
        >
          <el-form
            ref="hospitalPharmacistFormRef"
            :model="hospitalPharmacistForm"
            label-position="top"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item
                  label="药师"
                  prop="pharmacistCount"
                >
                  <el-input
                    v-model="hospitalPharmacistForm.pharmacistCount"
                    placeholder="请输入"
                    style="width: 240px"
                  >
                    <template #suffix>
                      <span>名</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="会诊资质药师"
                  prop="qualifiedPharmacistCount"
                >
                  <el-input
                    v-model="hospitalPharmacistForm.qualifiedPharmacistCount"
                    placeholder="请输入"
                    style="width: 240px"
                  >
                    <template #suffix>
                      <span>名</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="抗感染相关专业药师"
                  prop="qualifiedPharmacistCount"
                >
                  <el-input
                    v-model="hospitalPharmacistForm.antiInfectionSpecialtyCount"
                    placeholder="请输入"
                    style="width: 240px"
                  >
                    <template #suffix>
                      <span>名</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item
                  label="年总抗感染会诊累计例数"
                  prop="antiInfectionYearTotal"
                >
                  <el-select
                    v-model="hospitalPharmacistForm.antiInfectionYearTotal"
                    placeholder="请选择"
                    clearable
                    style="width: 240px"
                  >
                    <el-option
                      v-for="item in option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="临床药师年会诊总例数"
                  prop="antiInfectionYearTotal"
                >
                  <el-select
                    v-model="hospitalPharmacistForm.qualifiedPharmacistYearTotal"
                    placeholder="请选择"
                    clearable
                    style="width: 240px"
                  >
                    <el-option
                      v-for="item in option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="人均会诊例数"
                  prop="consultationPerCapitaCount"
                >
                  <el-input
                    v-model="hospitalPharmacistForm.consultationPerCapitaCount"
                    placeholder="请输入"
                    style="width: 240px"
                  >
                    <template #suffix>
                      <span>例</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="抗感染会诊占总会诊百分比"
                  prop="antiInfectionPercent"
                >
                  <el-input
                    v-model="hospitalPharmacistForm.antiInfectionPercent"
                    placeholder="请输入"
                    style="width: 240px"
                  >
                    <template #suffix>
                      <span>%</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="flx flx-right">
            <el-button @click="() => (isHospitalPharmacistEdit = false)">取消</el-button>
            <el-button
              type="primary"
              @click="submitHospitalPharmacistForm(hospitalPharmacistFormRef)"
            >
              保存
            </el-button>
          </div>
        </el-card>
      </div>
    </div>
    <div class="margin-t-60">
      <div class="flx">
        <p class="title">本院药师信息详细信息</p>
        <div class="flx-align-center flx-right">
          <el-button
            color="#4949c9"
            type="primary"
            :icon="Plus"
            @click="handlePharmacistAdd"
          >
            新增
          </el-button>
        </div>
      </div>
      <el-divider style="margin-top: 0" />
      <dynamic-edit-table
        ref="pharmacistRef"
        :table-header="pharmacist.tableHeader"
        :table-data="pharmacist.tableData"
        :row-item="pharmacist.rowItem"
        :options="pharmacist.options"
        :is-show-insert-icon="false"
        @submit="submitPharmacist"
        @handle-delete="handlePharmacistDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { Back, Edit, Plus } from '@element-plus/icons-vue'
import router from '@/router/index.js'
import { HospitalService } from '@api/consultation-api.js'
import { getPinyinInitials, resetForm } from '@/utils/util.js'
import { useConfirmHandle } from '@/hooks/useConfirmHandle.js'
import { ElMessage } from 'element-plus'
import DynamicEditTable from '@components/Table/DynamicEditTable.vue'

const antiInfectionSpecialtyEnum = {
  0: '否',
  2: '呼吸',
  3: '感染',
  4: '重症ICU专业',
  5: '其他'
}

defineComponent({
  name: 'HospitalDetail'
})

const props = defineProps({
  hospitalId: { type: String || Number, required: true }
})
const { hospitalId } = toRefs(props)
const loading = ref(false)
const hospitalInfo = ref(null)
const hospitalPharmacistInfo = ref(null)
const isHospitalPharmacistEdit = ref(false)
const hospitalPharmacistFormRef = ref()
const hospitalPharmacistForm = ref({})
const option = reactive([
  { label: '[0-100)', value: 1 },
  { label: '[100-200)', value: 2 },
  { label: '[200-300)', value: 3 },
  { label: '[300-500)', value: 4 },
  { label: '≥500', value: 5 }
])
const pharmacistRef = ref()
const pharmacist = reactive({
  tableHeader: [
    { prop: 'pharmacistName', label: '药师姓名', editable: false, type: 'input' },
    { prop: 'title', label: '职称', editable: false, type: 'select' },
    { prop: 'degree', label: '学历', editable: false, type: 'select' },
    { prop: 'jobYears', label: '工作年限', editable: false, type: 'input' },
    {
      prop: 'pharmacistCertificate',
      label: '有无临床药师证书',
      editable: false,
      type: 'select',
      convert: (item) => (item === 1 ? '有' : '无')
    },
    {
      prop: 'antiInfectionSpecialty',
      label: '是否抗感染专业',
      editable: false,
      type: 'select',
      convert: (item) => antiInfectionSpecialtyEnum[item]
    }
  ],
  // 表格数据
  tableData: [],
  rowItem: {
    pharmacistName: '',
    title: '',
    degree: '',
    jobYears: '',
    pharmacistCertificate: '',
    antiInfectionSpecialty: ''
  },
  options: {
    titleOptions: [
      { label: '药师', value: '药师' },
      { label: '主管药师', value: '主管药师' },
      { label: '副主任药师', value: '副主任药师' },
      { label: '主任药师', value: '主任药师' }
    ],
    degreeOptions: [
      { label: '专科', value: '专科' },
      { label: '本科', value: '本科' },
      { label: '硕士', value: '硕士' },
      { label: '博士', value: '博士' }
    ],
    pharmacistCertificateOptions: [
      { label: '是', value: 1 },
      { label: '否', value: 0 }
    ],
    antiInfectionSpecialtyOptions: []
  }
})

const hospitalName = computed(() => getPinyinInitials(hospitalInfo?.value?.hospitalName || ''))

const back = () => {
  router.back()
}

const getHospitalInfo = () => {
  loading.value = true
  return HospitalService.hospital.getInfoById(hospitalId.value).then((res) => {
    hospitalInfo.value = res.data
    loading.value = false
  })
}

const getHospitalPharmacistInfo = () => {
  loading.value = true
  return HospitalService.hospitalPharmacist.getInfoByHospitalKey(hospitalId.value).then((res) => {
    const { data } = res
    hospitalPharmacistInfo.value = data
    loading.value = false
  })
}

const getOptionLabel = (value) => {
  const chooseOption = option.find((item) => item.value === value)
  if (chooseOption) {
    return chooseOption.label
  }
  return ''
}

const handleHospitalPharmacistAdd = () => {
  resetForm(hospitalPharmacistFormRef.value)
  hospitalPharmacistForm.value = {}
  isHospitalPharmacistEdit.value = true
}

const handleHospitalPharmacistUpdate = () => {
  resetForm(hospitalPharmacistFormRef.value)
  hospitalPharmacistForm.value = hospitalPharmacistInfo.value
  isHospitalPharmacistEdit.value = true
}

const submitHospitalPharmacistForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      Object.assign(hospitalPharmacistForm.value, { hospitalKey: hospitalId })
      HospitalService.hospitalPharmacist.addOrUpdate(hospitalPharmacistForm.value).then(() => {
        isHospitalPharmacistEdit.value = false
        ElMessage.success('成功')
        getHospitalPharmacistInfo()
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const getPharmacistList = () => {
  loading.value = true
  return HospitalService.pharmacist.getList(hospitalId.value).then((response) => {
    const { data } = response
    pharmacist.tableData = data
    loading.value = false
  })
}

const handlePharmacistAdd = () => {
  pharmacistRef.value.prepend(0)
}

const submitPharmacist = (row) => {
  Object.assign(row, { hospitalKey: hospitalId })
  HospitalService.pharmacist.addOrUpdate(row).then(() => {
    ElMessage.success('成功')
    getPharmacistList()
  })
}

const handlePharmacistDelete = (row, index) => {
  useConfirmHandle(HospitalService.pharmacist.del, row.pharmacistKey, `删除${row.pharmacistName}的数据项`).then(() => {
    getPharmacistList()
  })
}

onMounted(() => {
  getHospitalInfo()
    .then(() => getHospitalPharmacistInfo())
    .then(() => getPharmacistList())
    .then(() => {
      Object.entries(antiInfectionSpecialtyEnum).forEach(([key, value]) => {
        pharmacist.options.antiInfectionSpecialtyOptions.push({
          label: value,
          value: Number(key)
        })
      })
    })
})
</script>

<style scoped>
.header {
  position: relative;
}

.header .img {
  width: 54px;
  height: 54px;
  border-radius: 10px;
  border: 2px solid;
}

.header .img p {
  width: 54px;
  height: 54px;
  font-size: 33px;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  margin: 0;
}

.header .hospitalName {
  height: 28px;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}

.title {
  height: 14px;
  font-size: 16px;
  font-weight: 500;
  color: #222222;
  line-height: 14px;
}
</style>
