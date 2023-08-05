<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :header-row-class-name="'table-header'"
      :header-cell-class-name="'table-header-item'"
      style="width: 100%"
    >
      <template #empty>
        <div class="table-empty">
          <div>暂无数据</div>
        </div>
      </template>
      <el-table-column
        v-for="headerItem in tableHeader"
        :key="headerItem.prop"
        :prop="headerItem.prop"
        :label="headerItem.label"
        :width="headerItem.width"
        :align="headerItem.align"
        :show-overflow-tooltip="headerItem.showOverflowTooltip"
      >
        <template #default="scope">
          <div class="table-row">
            <span class="table-row-span">
              {{ headerItem?.convert ? headerItem.convert(scope.row[headerItem.prop]) : scope.row[headerItem.prop] }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template #default="scope">
          <slot
            name="operations"
            :row="scope.row"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineComponent, ref, toRefs } from 'vue'

defineComponent({
  name: 'DynamicTable'
})

/**
 * @typedef {object} Header
 * @property {string} prop
 * @property {string} label
 * @property {function} convert - 显示内容转换
 * @example {prop: 'name', label: '姓名', convert: ()=>{}}
 */

/**
 * @typedef {Object} Props
 * @property {Array.<Header>} tableHeader - 表头结构
 * @property {Array.<Object>} tableData - 表格数据
 */

/**
 * Props
 * @type {Prettify<Readonly<ExtractPropTypes<Props>>>}
 */
const props = defineProps({
  tableHeader: {
    type: Array,
    required: true
  },
  tableData: {
    type: Array,
    required: true
  }
})

const { tableHeader, tableData } = toRefs(props)
const loading = ref(false)

defineExpose({
  loading
})
</script>

<style scoped></style>
