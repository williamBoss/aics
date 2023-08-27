<template>
  <div class="flx">
    <p class="title">{{ props.field.options?.staticText || '' }}</p>
    <div class="flx-align-center flx-right">
      <el-button
        color="#4949c9"
        type="primary"
        size="small"
        :icon="Plus"
        @click="handlePharmacistAdd"
      >
        新增
      </el-button>
    </div>
  </div>
  <dynamic-edit-table
    ref="ipcpRef"
    :table-header="ipcp.tableHeader"
    :table-data="ipcp.tableData"
    :row-item="ipcp.rowItem"
    :options="ipcp.options"
    :is-show-insert-icon="false"
    style="margin-bottom: 18px"
    @submit="submit"
    @handle-delete="handleDelete"
  />
</template>

<script setup>
import { defineComponent, inject, reactive, ref, watch } from 'vue'
import DynamicEditTable from '@components/Table/DynamicEditTable.vue'
import { ConfigService } from '@api/consultation-api.js'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { commonProps } from '@components/FormRender/FormWidget/common.js'

defineComponent({
  name: 'IPCP'
})

const props = defineProps({
  ...commonProps
})

const ipcpRef = ref()
const ipcp = reactive({
  tableHeader: [
    {
      prop: 'drugName',
      label: '药物名称（通用名）',
      width: '200',
      editable: false,
      type: 'autocomplete',
      valueKey: 'medName',
      searchMethod: () => querySearchAsync,
      selectMethod: (item, row) => handleSelect(item, row)
    },
    { prop: 'drugType', label: '进口/国产', editable: false, type: 'select' },
    { prop: 'isCollect', label: '是否集采品种', editable: false, type: 'select' },
    { prop: 'specifications', label: '规格/g', editable: false, type: 'input' },
    { prop: 'singleDose', label: '单次用药剂量/g', editable: false, type: 'input' },
    { prop: 'medicationFrequency', label: '用药频次', editable: false, type: 'input' },
    { prop: 'treatmentCourse', label: '疗程/d', editable: false, type: 'input' },
    { prop: 'totalDose', label: '总剂量/g', editable: false, type: 'input' },
    { prop: 'antibacterialCosts', label: '抗菌药花费（元）', editable: false, type: 'input' }
  ],
  // 表格数据
  tableData: [],
  rowItem: {
    medId: '',
    drugName: '',
    drugType: '',
    isCollect: '',
    specifications: '',
    singleDose: '',
    medicationFrequency: '',
    treatmentCourse: '',
    totalDose: '',
    antibacterialCosts: ''
  },
  options: {
    drugTypeOptions: [
      { label: '进口', value: '进口' },
      { label: '国产', value: '国产' }
    ],
    isCollectOptions: [
      { label: '是', value: '是' },
      { label: '否', value: '否' }
    ]
  }
})
const answer = ref(inject('answer'))

const handlePharmacistAdd = () => {
  ipcpRef.value.prepend(0)
}

const querySearchAsync = (queryString, cb) => {
  ConfigService.medicine.allList({ medName: queryString }).then((res) => {
    cb(res.data)
  })
}

const handleSelect = (item, row) => {
  row.medId = item.medId
}

const submit = (row) => {
  row.editable = false
  ElMessage.success('成功')
}

const handleDelete = (row, index) => {
  ipcp.tableData.splice(index, 1)
  ElMessage.success('成功')
}

watch(
  ipcp.tableData,
  () => {
    Object.assign(answer.value, { [props.field.id]: [...ipcp.tableData] })
  },
  { deep: true }
)
</script>

<style scoped>
.title {
  font-size: 14px;
  font-weight: 400;
  color: #51515a;
  line-height: 16px;
}
</style>
