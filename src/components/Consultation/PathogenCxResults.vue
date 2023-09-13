<template>
  <el-table
    :data="pathogenCxResultList[0].tableData"
    class-name="margin-t-30"
    border
    :header-row-class-name="'table-header'"
    header-cell-class-name="table-header-cell"
    :span-method="spanMethod"
  >
    <el-table-column
      v-for="(item, index) in pathogenCxResultList[0].tableHeader"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width || 'auto'"
    >
      <template #default="scope">
        <div
          v-show="item.isEdit || scope.row.isEdit"
          class="flx-align-center"
        >
          <el-checkbox-group v-model="scope.row[`${item.prop}`]">
            <el-checkbox
              v-for="(option, index) in scope.row[`${item.prop}Options`]"
              :key="index"
              :label="option.value"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div
          v-show="!item.isEdit && !scope.row.isEdit"
          class="flx-align-center"
        >
          <span
            class="row-span"
            v-html="scope.row[item.prop]"
          ></span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineComponent, inject, reactive, ref, watch } from 'vue'
import { PathogenCxResultList } from '@components/Consultation/config/config.js'
import { commonProps } from '@components/FormRender/FormWidget/common.js'
import { cloneDeep } from 'lodash'

defineComponent({
  name: 'PathogenCxResults'
})

const props = defineProps({
  ...commonProps
})

const pathogenCxResultList = reactive([...cloneDeep(PathogenCxResultList)])
const { formModel } = inject('formModel')
const setFormData = inject('setFormData')
const answer = ref(inject('answer'))

const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    return row.spanArray
  }
}

const initFieldModel = () => {
  const tableData = pathogenCxResultList[0].tableData
  const formData = formModel.value[props.field.options.name] || []
  formData.forEach((item, index) => {
    tableData[index] && Object.assign(tableData[index], item)
  })
}
initFieldModel()

watch(
  () => pathogenCxResultList[0].tableData.map((item) => item.pathogen),
  (newValue) => {
    Object.assign(answer.value, { [props.field.pathogenId]: [...new Set(newValue.flat())] })
  },
  { deep: true }
)

watch(
  pathogenCxResultList[0].tableData,
  (newValue) => {
    const formData = {
      [props.field.options.name]: [
        ...newValue.map(
          ({ pathogen, classificationBacteria, specificStrains, pathogenOptions, classificationBacteriaOptions }) => {
            specificStrains.length &&
              !pathogen.length &&
              pathogen.push(pathogenOptions[0].value) &&
              !classificationBacteria.length &&
              classificationBacteriaOptions?.length &&
              classificationBacteria.push(classificationBacteriaOptions[0].value)

            return {
              pathogen,
              classificationBacteria,
              specificStrains
            }
          }
        )
      ]
    }
    setFormData(formData)
  },
  { deep: true }
)
</script>

<style scoped>
:deep(.table-header) {
  height: 48px;
  font-size: 14px;
  color: #51515a;
  line-height: 22px;
  border-radius: 4px 4px 0 0;
}

:deep(.table-header-cell) {
  font-weight: 400;
  background: #f4f6fb !important;
}
</style>
