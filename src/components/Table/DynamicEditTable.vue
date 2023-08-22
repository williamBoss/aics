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
          <div
            v-show="headerItem.editable || scope.row.editable"
            class="editable-row"
          >
            <template v-if="headerItem.type === 'input'">
              <el-input
                v-model="scope.row[headerItem.prop]"
                size="small"
                :placeholder="`请输入${headerItem.label}`"
              />
            </template>
            <template v-if="headerItem.type === 'date'">
              <el-date-picker
                v-model="scope.row[headerItem.prop]"
                type="date"
                size="small"
                value-format="YYYY-MM-DD"
                :placeholder="`请输入${headerItem.label}`"
              />
            </template>
            <template v-if="headerItem.type === 'autocomplete'">
              <el-autocomplete
                v-model="scope.row[headerItem.prop]"
                :value-key="headerItem.valueKey"
                :fetch-suggestions="headerItem.searchMethod()"
                :trigger-on-focus="false"
                size="small"
                placeholder="请输入"
                @select="headerItem.selectMethod($event, scope.row)"
              />
            </template>
            <template v-if="headerItem.type === 'select'">
              <el-select
                v-model="scope.row[headerItem.prop]"
                size="small"
                :placeholder="`请输入${headerItem.label}`"
              >
                <el-option
                  v-for="item in options[`${headerItem.prop}Options`]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </div>
          <div
            v-show="!headerItem.editable && !scope.row.editable"
            class="editable-row"
          >
            <span class="editable-row-span">
              {{ headerItem?.convert ? headerItem.convert(scope.row[headerItem.prop]) : scope.row[headerItem.prop] }}
            </span>
            <el-popover
              v-if="isShowInsertIcon"
              placement="right"
              :width="120"
              trigger="hover"
            >
              <template #reference>
                <el-icon
                  class="edit-icon"
                  :size="18"
                >
                  <edit />
                </el-icon>
              </template>
              <div class="menu-list">
                <div
                  class="menu-item"
                  @click="prepend(scope.$index)"
                >
                  上方插入一行
                </div>
                <div
                  class="menu-item divider"
                  @click="append(scope.$index)"
                >
                  下方插入一行
                </div>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="160"
      >
        <template #default="scope">
          <el-button
            v-show="!scope.row.editable"
            size="small"
            style="margin-left: 12px"
            @click="scope.row.editable = true"
            >编辑
          </el-button>
          <el-button
            v-show="!scope.row.editable"
            size="small"
            type="danger"
            @click="handleDelete(scope.row, scope.$index)"
            >删除
          </el-button>
          <el-button
            v-show="scope.row.editable"
            size="small"
            type="success"
            @click="submit(scope.row)"
            >确定
          </el-button>
          <el-button
            v-show="scope.row.editable"
            size="small"
            type="default"
            @click="handleCancel(scope.row, scope.$index)"
            >取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineComponent, ref, toRefs } from 'vue'
import { Edit } from '@element-plus/icons-vue'

defineComponent({
  name: 'DynamicEditTable'
})

/**
 * @typedef {object} Header
 * @property {string} prop
 * @property {string} label
 * @property {boolean} editable
 * @property {string} type
 * @property {function} convert - 显示内容转换
 * @property {function} searchMethod - 输入框为自动补偿类型的时候查询方法
 * @property {function} selectMethod
 * @example {prop: 'name', label: '姓名', editable: false, type: 'input', convert: ()=>{}}
 */

/**
 * @typedef {Object} Props
 * @property {Array.<Header>} tableHeader - 表头结构
 * @property {Array.<Object>} tableData - 表格数据
 * @property {Array.<Object>} rowItem - 表单属性
 * @property {Object} options
 * @property {boolean} isShowInsertIcon
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
  },
  rowItem: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: Object
  },
  isShowInsertIcon: {
    type: Boolean,
    default: false
  }
})

const { tableHeader, tableData, rowItem, options, isShowInsertIcon } = toRefs(props)
const loading = ref(false)

const emits = defineEmits(['submit', 'handleDelete'])

const handleCancel = (row, index) => {
  row.editable = false
  if (!row?.pharmacistKey) {
    tableData.value.splice(index, 1)
  }
}
const submit = (row) => {
  emits('submit', row)
}
const handleDelete = (row, index) => {
  emits('handleDelete', { row, index })
}
const prepend = (index) => {
  rowItem.value.editable = true
  tableData.value.splice(index, 0, { ...rowItem.value })
}
const append = (index) => {
  rowItem.value.editable = true
  tableData.value.splice(index + 1, 0, { ...rowItem.value })
}

defineExpose({
  prepend,
  append
})
</script>

<style scoped>
.edit-icon {
  cursor: pointer;
}

.editable-row {
  display: flex;
  align-items: center;
}

.editable-row-span {
  display: inline-block;
  margin-right: 6px;
}

.menu-item {
  height: 32px;
  line-height: 32px;
  padding-left: 12px;
}

.menu-item:hover {
  color: #fff;
  background: #409eff;
  cursor: pointer;
}
</style>
