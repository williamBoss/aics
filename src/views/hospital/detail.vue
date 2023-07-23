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
            type="primary"
            :icon="Plus"
            @click="addHospitalPharmacist"
          >
            新增
          </el-button>
        </div>
      </div>
      <el-divider style="margin-top: 0" />
      <el-descriptions
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
          {{ `${hospitalPharmacistInfo?.qualifiedPharmacistCount || ''} 名` }}
        </el-descriptions-item>
        <el-descriptions-item></el-descriptions-item>
        <el-descriptions-item label="年总抗感染会诊累计例数">
          {{ `${hospitalPharmacistInfo?.antiInfectionYearTotal || ''}` }}
        </el-descriptions-item>
        <el-descriptions-item label="临床药师年会诊总例数">
          {{ `${hospitalPharmacistInfo?.antiInfectionYearTotal || ''}` }}
        </el-descriptions-item>
        <el-descriptions-item label="人均会诊例数">
          {{ `${hospitalPharmacistInfo?.consultationPerCapitaCount || ''} 例` }}
        </el-descriptions-item>
        <el-descriptions-item label="抗感染会诊占总会诊百分比">
          {{ `${hospitalPharmacistInfo?.antiInfectionPercent || ''} %` }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="margin-t-60">
      <div class="flx">
        <p class="title">本院药师信息详细信息</p>
        <div class="flx-align-center flx-right">
          <el-button
            type="primary"
            :icon="Plus"
            @click="addPharmacist"
          >
            新增
          </el-button>
        </div>
      </div>
      <el-divider style="margin-top: 0" />
      <el-table
        v-loading="loading"
        :data="state.tableData"
        :header-row-class-name="'table-header'"
        :header-cell-class-name="'table-header-item'"
      >
        <template #empty>
          <div class="table-empty">
            <div>暂无数据</div>
          </div>
        </template>
        <el-table-column
          key="pharmacistName"
          label="药师姓名"
          align="center"
          prop="pharmacistName"
        />
        <el-table-column
          key="title"
          label="职称"
          align="center"
          prop="title"
        />
        <el-table-column
          key="degree"
          label="学历"
          align="center"
          prop="degree"
        />
        <el-table-column
          key="jobYears"
          label="工作年限"
          align="center"
          prop="jobYears"
        />
        <el-table-column
          key="pharmacistCertificate"
          label="有无临床药师证书"
          width="160"
          align="center"
          prop="pharmacistCertificate"
        >
          <template #default="scope">
            {{ scope.row.pharmacistCertificate === 0 ? '有' : '无' }}
          </template>
        </el-table-column>
        <el-table-column
          key="antiInfectionSpecialty"
          label="是否抗感染专业"
          width="160"
          align="center"
          prop="antiInfectionSpecialty"
        >
          <template #default="scope">
            {{ scope.row.antiInfectionSpecialty === 0 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :fixed="`right`"
          width="210"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              :icon="EditPen"
              @click="handlePharmacistUpdate(scope.row)"
              >编辑
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              :icon="Delete"
              @click="handlePharmacistDelete(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { Back, Delete, EditPen, Plus } from '@element-plus/icons-vue'
import router from '@/router/index.js'
import { HospitalService } from '@api/consultation-api.js'
import { getPinyinInitials } from '@/utils/util.js'
import { useConfirmHandle } from '@/hooks/useConfirmHandle.js'

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
const hospitalName = computed(() => getPinyinInitials(hospitalInfo?.value?.hospitalName || ''))
const state = reactive({
  // 表格数据
  tableData: []
})

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
    hospitalPharmacistInfo.value = res.data
    loading.value = false
  })
}

const handleHospitalPharmacistAdd = () => {
  loading.value = true
  title.value = '添加医院信息'
  hospitalInfoRef.value.reset()
  hospitalInfoRef.value.acceptParams()
  loading.value = false
}

const handleHospitalPharmacistUpdate = (row) => {
  loading.value = true
  title.value = '修改药师信息'
  hospitalInfoRef.value.reset()
  HospitalService.hospital.getInfoById(row.hospitalKey).then((response) => {
    hospitalInfoRef.value.acceptParams(response.data)
    loading.value = false
  })
}

const getPharmacistList = () => {
  loading.value = true
  return HospitalService.pharmacist.getList(hospitalId.value).then((response) => {
    const { data } = response
    state.tableData = data
    loading.value = false
  })
}

const handlePharmacistAdd = () => {
  loading.value = true
  title.value = '添加医院信息'
  hospitalInfoRef.value.reset()
  hospitalInfoRef.value.acceptParams()
  loading.value = false
}

const handlePharmacistUpdate = (row) => {
  loading.value = true
  title.value = '修改药师信息'
  hospitalInfoRef.value.reset()
  HospitalService.hospital.getInfoById(row.hospitalKey).then((response) => {
    hospitalInfoRef.value.acceptParams(response.data)
    loading.value = false
  })
}

const handlePharmacistDelete = (row) => {
  useConfirmHandle(HospitalService.pharmacist.del, row.pharmacistKey, `删除${row.pharmacistName}的数据项`).then(() => {
    getPharmacistList()
  })
}

onMounted(() => {
  getHospitalInfo()
    .then(() => getHospitalPharmacistInfo())
    .then(() => getPharmacistList())
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
