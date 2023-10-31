<template>
  <div
    v-loading="loading"
    :element-loading-text="loadingText"
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
            <el-button
              class="header-button-ri margin-r-10"
              :icon="Download"
              @click="handleExport"
            >
              导出
            </el-button>
            <div class="header-button-ri">
              <div
                class="order-wrap"
                style="line-height: 32px"
                @click="changeOrder"
              >
                <span class="text">{{ reverse ? '正序' : '倒序' }}</span>
                <span class="triangle">
                  <i
                    class="sort-caret ascending"
                    :class="{ topActive: !reverse }"
                  />
                  <i
                    class="sort-caret descending"
                    :class="{ bottomActive: reverse }"
                  />
                </span>
              </div>
            </div>
            <span>列表排序</span>
            <el-radio-group
              v-model="orderBy"
              class="header-button-ri margin-r-10"
            >
              <el-radio :label="1">会诊日期</el-radio>
              <el-radio :label="2">创建时间</el-radio>
            </el-radio-group>
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
import { Download, Plus, Refresh, Search } from '@element-plus/icons-vue'
import DynamicTable from '@components/Table/DynamicTable.vue'
import router from '@/router/index.js'
import { ConsultationService } from '@api/consultation-api.js'
import { addDateRange, resetForm } from '@/utils/util.js'
import { PathogenOptions } from '@components/Consultation/config/config.js'
import { cloneDeep } from 'lodash'

defineComponent({
  name: 'ConsultationIndex'
})

const loading = ref(false)
const loadingText = ref('获取数据中')
const reverse = ref(true)
const orderBy = ref(2)
const queryFormRef = ref()
const state = reactive({
  // 表格头
  tableHeader: [
    { prop: 'consultationTime', label: '日期' },
    { prop: 'questionnaireCode', label: '会诊类型', width: 200, convert: (item) => questionnaireCode.value[item] },
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
  pathogenDict: [...cloneDeep(PathogenOptions)],
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
const questionnaireCode = ref({
  PHYSICIAN: '医生会诊',
  APOTHECARY: '药师会诊',
  PHYSICIAN_APOTHECARY: '医生/药师共同会诊'
})

const getConsultationList = () => {
  loadingText.value = '获取数据中...'
  loading.value = true
  Object.assign(state.totalParam, state.searchParam, state.pageable, { reverse: reverse.value ? 1 : 0, orderBy })
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

/**
 * 排序规则改变
 */
const changeOrder = () => {
  state.pageable.current = 1
  reverse.value = !reverse.value
  getConsultationList()
}

const handleAdd = () => {
  router.push({ name: 'consultationForm' })
}

const handleExport = () => {
  loadingText.value = '导出数据中...'
  loading.value = true
  ConsultationService.consultation
    .exportConsultation()
    .then((data) => {
      const now = new Date()
      const dateTimeFormat = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      const fileName = '会诊记录-' + dateTimeFormat.format(now).replaceAll(/[\/:]/g, '') + '.xlsx'
      // 如果支持微软的文件下载方式(ie10+浏览器)
      if (window.navigator.msSaveBlob) {
        try {
          const blobObject = new Blob([data])
          window.navigator.msSaveBlob(blobObject, fileName)
        } catch (e) {
          console.log(e)
        }
      } else {
        // 其他浏览器
        const url = window.URL.createObjectURL(data)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    })
    .finally(() => (loading.value = false))
}

const handleView = (row) => {
  const questionnaireCode = row.questionnaireCode
  const tabCode = {
    PHYSICIAN: 'PHYSICIAN_CONSULTATION_REPORT',
    APOTHECARY: 'APOTHECARY_CONSULTATION_REPORT',
    PHYSICIAN_APOTHECARY: 'P_A_CONSULTATION_REPORT'
  }
  const reportTabCode = tabCode[questionnaireCode] || ''
  router.push({
    name: 'consultationForm',
    query: {
      recordId: row.recordId,
      isView: true,
      tabCode: reportTabCode,
      questionnaireCode
    }
  })
}

const handleContinue = (row) => {
  router.push({
    name: 'consultationForm',
    query: {
      recordId: row.recordId,
      questionnaireCode: row.questionnaireCode
    }
  })
}

onMounted(() => {
  getConsultationList()
})
</script>

<style scoped>
.order-wrap {
  cursor: pointer;
  display: inline-block;
}

.order-wrap .text {
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: #3c456c;
}

.order-wrap .triangle {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 14px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}

.order-wrap .triangle .sort-caret {
  width: 0;
  height: 0;
  border: solid 5px transparent;
  position: absolute;
  left: 7px;
}

.order-wrap .triangle .sort-caret.ascending {
  border-bottom-color: #a8abb2;
  top: -5px;
}

.order-wrap .triangle .sort-caret.descending {
  border-top-color: #a8abb2;
  bottom: -3px;
}

.order-wrap .triangle .sort-caret.ascending.topActive {
  border-bottom-color: #6995ff;
}

.order-wrap .triangle .sort-caret.descending.bottomActive {
  border-top-color: #6995ff;
}
</style>
