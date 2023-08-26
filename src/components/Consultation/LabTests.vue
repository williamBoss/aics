<template>
  <div class="flx">
    <p class="title">实验室检查</p>
  </div>
  <el-row
    :gutter="40"
    style="margin-bottom: 20px"
  >
    <el-col :span="12">
      <el-table
        :data="labTest[0].tableData"
        border
        :header-row-class-name="'table-header'"
        header-cell-class-name="table-header-cell"
      >
        <el-table-column
          v-for="item in labTest[0].tableHeader"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="scope">
            <div
              v-show="item.isEdit || scope.row.isEdit"
              class="flx-align-center"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="scope.row[item.prop]"
                  :placeholder="`请输入${item.label}`"
                />
              </template>
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
    </el-col>
    <el-col :span="12">
      <el-table
        :data="labTest[1].tableData"
        border
        header-row-class-name="'table-header'"
        header-cell-class-name="table-header-cell"
      >
        <el-table-column
          v-for="item in labTest[1].tableHeader"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="scope">
            <div
              v-show="item.isEdit || scope.row.isEdit"
              class="flx-align-center"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="scope.row[item.prop]"
                  :placeholder="`请输入${item.label}`"
                />
              </template>
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
    </el-col>
  </el-row>
</template>

<script setup>
import { defineComponent, reactive } from 'vue'
import { LabTestsList } from '@components/Consultation/config/Config.js'

defineComponent({
  name: 'LabTests'
})

const labTest = reactive(LabTestsList)
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
