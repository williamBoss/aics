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
          <el-checkbox-group v-model="pathogenCxResults">
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
import { defineComponent, reactive, ref } from 'vue'
import { PathogenCxResultList } from '@components/Consultation/config/Config.js'

defineComponent({
  name: 'PathogenCxResults'
})

const pathogenCxResults = ref([])
const pathogenCxResultList = reactive(PathogenCxResultList)
</script>

<style scoped>
.title {
  font-size: 14px;
  font-weight: 400;
  color: #51515a;
  line-height: 16px;
}

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
