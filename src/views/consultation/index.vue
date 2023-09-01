<template>
  <div
    v-loading="loading"
    element-loading-text="获取数据中"
  >
    <div class="flx margin-b-16">
      <div class="main-title">
        <span>会诊管理</span>
      </div>
    </div>
    <div class="body">
      <el-card
        class="card"
        shadow="never"
      >
        <template #header>
          <div class="card-header">
            <span class="title">筛选</span>
          </div>
        </template>
        <el-form
          ref="queryFormRef"
          :model="state.searchParam"
          :inline="true"
          label-width="98px"
        >
          <el-form-item
            label="患者编号："
            prop="patientCode"
          >
            <el-input
              v-model="state.searchParam.patientCode"
              placeholder="请输入"
              clearable
              style="width: 220px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item
            label="感染部位："
            prop="sitesInfection"
          >
            <el-select
              v-model="state.searchParam.sitesInfection"
              placeholder="请选择"
              :clearable="true"
              style="width: 220px"
            >
              <el-option
                v-for="(sitesInfection, index) in dict.sitesInfectionDict"
                :key="index"
                :label="sitesInfection.label"
                :value="sitesInfection.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="病原体："
            prop="pathogen"
          >
            <el-select
              v-model="state.searchParam.pathogen"
              placeholder="请选择"
              :clearable="true"
              style="width: 220px"
            >
              <el-option
                v-for="(pathogen, index) in dict.pathogenDict"
                :key="index"
                :label="pathogen.label"
                :value="pathogen.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="采纳会诊："
            prop="adopt"
          >
            <el-select
              v-model="state.searchParam.adopt"
              placeholder="请选择"
              :clearable="true"
              style="width: 220px"
            >
              <el-option
                v-for="(adopt, index) in dict.adoptDict"
                :key="index"
                :label="adopt.label"
                :value="adopt.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="转归结局："
            prop="lapse"
          >
            <el-select
              v-model="state.searchParam.lapse"
              placeholder="请选择"
              :clearable="true"
              style="width: 220px"
            >
              <el-option
                v-for="(lapse, index) in dict.lapseDict"
                :key="index"
                :label="lapse.label"
                :value="lapse.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :icon="Search"
              @click="handleQuery"
              >搜索
            </el-button>
            <el-button
              type="info"
              plain
              :icon="Refresh"
              @click="resetQuery"
              >重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card
        class="card margin-t-30"
        shadow="never"
      >
        <template #header>
          <div class="card-header">
            <span class="title">记录列表</span>
            <el-button
              type="primary"
              class="header-button-ri"
              :icon="Plus"
              @click="handleAdd"
            >
              新增
            </el-button>
          </div>
        </template>
        <dynamic-table
          :table-data="state.tableData"
          :table-header="state.tableHeader"
          :operation-item="state.operationItem"
        >
          <template #operations="scope">
            <el-button
              type="primary"
              size="small"
              text
              @click="handleView(scope.row)"
              >查看
            </el-button>
            <template v-if="scope.row.status === 0">
              <el-divider direction="vertical" />
              <el-button
                type="primary"
                size="small"
                text
                @click="handleContinue(scope.row)"
                >继续会诊
              </el-button>
            </template>
            <template v-if="scope.row.isFollow === 1">
              <el-divider direction="vertical" />
              <el-button
                type="primary"
                size="small"
                text
                @click="handleTrackMedicalRecords(scope.row)"
                >跟踪病历
              </el-button>
            </template>
          </template>
        </dynamic-table>
      </el-card>
    </div>
    <div class="footer">
      <el-pagination
        :current-page="state.pageable.current"
        :page-size="state.pageable.size"
        :page-sizes="[10, 25, 50, 100]"
        background
        layout="->, total, sizes, prev, pager, next"
        :total="state.pageable.total"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { Plus, Refresh, Search } from '@element-plus/icons-vue'
import DynamicTable from '@components/Table/DynamicTable.vue'
import router from '@/router/index.js'
import { ConsultationService } from '@api/consultation-api.js'
import { addDateRange, resetForm } from '@/utils/util.js'

defineComponent({
  name: 'ConsultationIndex'
})

const loading = ref(false)
const queryFormRef = ref()
const state = reactive({
  // 表格头
  tableHeader: [
    { prop: 'consultationTime', label: '日期' },
    { prop: 'patientCode', label: '患者编号' },
    { prop: 'age', label: '年龄' },
    { prop: 'gender', label: '性别', convert: (item) => (item === 1 ? '男' : item === 2 ? '女' : '未知') },
    { prop: 'sitesInfection', label: '感染部位', convert: (item) => parseArray(item) },
    { prop: 'pathogen', label: '病原体', convert: (item) => parseArray(item) },
    { prop: 'adopt', label: '采纳会诊' },
    { prop: 'lapse', label: '转归结局' }
  ],
  operationItem: {
    width: 250
  },
  // 表格数据
  tableData: [],
  // 分页数据
  pageable: {
    // 当前页数
    current: 1,
    // 每页显示条数
    size: 10,
    // 总条数
    total: 0
  },
  // 查询参数(只包括查询)
  searchParam: {},
  // 总参数(包含分页和查询参数)
  totalParam: {}
})
const dict = reactive({
  sitesInfectionDict: [
    { label: '上呼吸道感染', value: 1 },
    { label: '肺部感染', value: 2 },
    { label: '泌尿系统感染', value: 3 },
    { label: '腹腔内组织感染', value: 4 },
    { label: '盆腔内组织感染', value: 5 },
    { label: '手术切口或皮肤软组织感染', value: 6 },
    { label: '胃肠道感染', value: 7 },
    { label: '中枢神经系统感染', value: 8 },
    { label: '血液系统感染', value: 9 },
    { label: '心血管系统感染', value: 10 },
    { label: '骨/关节感染', value: 11 },
    { label: '导管相关感染', value: 12 },
    { label: '其他', value: 13 }
  ],
  pathogenDict: [
    { label: '细菌', value: '细菌' },
    { label: '真菌', value: '真菌' },
    { label: '病毒', value: '病毒' }
  ],
  adoptDict: [
    { label: '不采纳', value: 0 },
    { label: '采纳', value: 1 }
  ],
  lapseDict: [
    { label: '无效', value: 1 },
    { label: '部分缓解', value: 2 },
    { label: '痊愈', value: 3 },
    { label: '死亡', value: 4 }
  ]
})

const getConsultationList = () => {
  loading.value = true
  Object.assign(state.totalParam, state.searchParam, state.pageable)
  ConsultationService.consultation.list(addDateRange(state.totalParam)).then((response) => {
    const data = response.data
    state.tableData = data.records
    state.pageable.total = Number(data.total)
    loading.value = false
  })
}

const parseArray = (item) => {
  return typeof item === 'string' && item === '' ? item : Array.from(JSON.parse(item)).join(',')
}

/** 搜索按钮操作 */
const handleQuery = () => {
  state.pageable.current = 1
  getConsultationList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  resetForm(queryFormRef.value)
  getConsultationList()
}

/**
 * @description 每页条数改变
 * @param {Number} val 当前条数
 * @return {void}
 * */
const handleSizeChange = (val) => {
  state.pageable.current = 1
  state.pageable.size = val
  getConsultationList()
}

/**
 * @description 当前页改变
 * @param {Number} val 当前页
 * @return {void}
 * */
const handleCurrentChange = (val) => {
  state.pageable.current = val
  getConsultationList()
}

const handleAdd = () => {
  router.push({ name: 'consultationForm' })
}

const handleView = (row) => {
  router.push({
    name: 'consultationForm',
    query: {
      recordId: row.recordId,
      isView: true
    }
  })
}

const handleContinue = (row) => {
  router.push({
    name: 'consultationForm',
    query: {
      recordId: row.recordId,
      isTrackMedicalRecords: true
    }
  })
}

const handleTrackMedicalRecords = (row) => {
  router.push({
    name: 'consultationForm',
    query: {
      recordId: row.recordId
    }
  })
}

onMounted(() => {
  getConsultationList()
})
</script>

<style scoped></style>
