<template>
  <div
    v-loading="loading"
    element-loading-text="获取数据中"
  >
    <div class="flx margin-b-16">
      <div class="main-title">
        <span>医院信息</span>
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
            prop=""
          >
            <el-input
              v-model="state.searchParam"
              placeholder="请输入"
              clearable
              style="width: 220px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item
            label="感染部位："
            prop=""
          >
            <el-select
              v-model="state.searchParam"
              placeholder="请选择"
              :clearable="true"
              style="width: 220px"
            >
              <el-option
                :label="1"
                :value="1"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="病原体："
            prop=""
          >
            <el-select
              v-model="state.searchParam"
              placeholder="请选择"
              :clearable="true"
              style="width: 220px"
            >
            </el-select>
          </el-form-item>
          <el-form-item
            label="采纳会诊："
            prop=""
          >
            <el-select
              v-model="state.searchParam"
              placeholder="请选择"
              :clearable="true"
              style="width: 220px"
            >
            </el-select>
          </el-form-item>
          <el-form-item
            label="转归结局："
            prop=""
          >
            <el-select
              v-model="state.searchParam"
              placeholder="请选择"
              :clearable="true"
              style="width: 220px"
            >
            </el-select>
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
            >
              新增
            </el-button>
          </div>
        </template>
        <dynamic-table
          :table-data="state.tableData"
          :table-header="state.tableHeader"
        >
          <template #operations="scope">
            <el-button
              size="small"
              style="margin-left: 12px"
              @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row, scope.$index)"
              >删除
            </el-button>
          </template>
        </dynamic-table>
      </el-card>
    </div>
    <div class="footer">
      <el-pagination
        :current-page="state.pageable.pageNum"
        :page-size="state.pageable.pageSize"
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
import { defineComponent, reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import DynamicTable from '@components/Table/DynamicTable.vue'

defineComponent({
  name: 'ConsultationIndex'
})

const loading = ref(false)
const queryFormRef = ref()
const state = reactive({
  // 表格头
  tableHeader: [
    { prop: 'pharmacistName', label: '日期' },
    { prop: 'pharmacistName', label: '患者编号' },
    { prop: 'pharmacistName', label: '年龄' },
    { prop: 'pharmacistName', label: '性别' },
    { prop: 'pharmacistName', label: '感染部位' },
    { prop: 'pharmacistName', label: '病原体' },
    { prop: 'pharmacistName', label: '采纳会诊' },
    { prop: 'pharmacistName', label: '转归结局' }
  ],
  // 表格数据
  tableData: [],
  // 分页数据
  pageable: {
    // 当前页数
    pageNum: 1,
    // 每页显示条数
    pageSize: 10,
    // 总条数
    total: 0
  },
  // 查询参数(只包括查询)
  searchParam: {},
  // 总参数(包含分页和查询参数)
  totalParam: {}
})
</script>

<style scoped></style>
