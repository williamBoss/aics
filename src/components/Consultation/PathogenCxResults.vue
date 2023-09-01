<template>
  <el-table
    :data="pathogenCxResultList[0].tableData"
    class-name="margin-t-30"
    border
    :header-row-class-name="'table-header'"
    header-cell-class-name="table-header-cell"
  >
    <el-table-column
      v-for="(item, index) in pathogenCxResultList[0].tableHeader"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="index === 0 ? 120 : 'auto'"
    >
      <template #default="scope">
        <div
          v-show="item.isEdit || scope.row.isEdit"
          class="flx-align-center"
        >
          <el-checkbox-group
            v-if="item.prop === 'pathogen'"
            v-model="pathogen"
          >
            <el-checkbox
              v-for="(option, index) in scope.row[`${item.prop}Options`]"
              :key="index"
              :label="option.value"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-else
            v-model="pathogenCxResults"
          >
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
import { PathogenCxResultList } from '@components/Consultation/config/Config.js'
import { commonProps } from '@components/FormRender/FormWidget/common.js'

defineComponent({
  name: 'PathogenCxResults'
})

const props = defineProps({
  ...commonProps
})

const pathogen = ref([])
const pathogenCxResults = ref([])
const pathogenCxResultList = reactive(PathogenCxResultList)
const { formModel } = inject('formModel')
const setFormData = inject('setFormData')
const answer = ref(inject('answer'))

const initFieldModel = () => {
  const element = formModel.value[props.field.options.name]
  const formData = (typeof element === 'string' && JSON.parse(element)) || []
  const options = pathogenCxResultList
    .map(({ tableData }) => ({
      pathogenValues: tableData.map(({ pathogenOptions }) => {
        return {
          pathogen: pathogenOptions.map(({ value }) => value)
        }
      })
    }))
    .flatMap((item) => item.pathogenValues)
    .map((item) => item.pathogen)
    .flat()
  pathogen.value = formData.filter((data) => options.includes(data))
  pathogenCxResults.value = formData.filter((data) => !options.includes(data))
}
initFieldModel()

watch(
  pathogen,
  () => {
    Object.assign(answer.value, { [props.field.pathogenId]: [...pathogen.value] })
  },
  { deep: true }
)

watch(
  [pathogenCxResults, pathogen],
  () => {
    const formData = {
      [props.field.options.name]: [...pathogenCxResults.value, ...pathogen.value]
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
