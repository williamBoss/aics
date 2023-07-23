<template>
  <div
    v-loading="loading"
    element-loading-text="获取数据中"
  >
    <div class="flx margin-b-16">
      <div class="main-title">
        <span>医院信息</span>
      </div>
      <div class="flx-right">
        <el-input
          v-model="state.searchParam.hospitalName"
          placeholder="请输入医院名称"
          :prefix-icon="Search"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
        <el-button
          type="primary"
          color="#4949C9"
          :icon="Plus"
          style="margin-left: 15px; font-size: 15px"
          @click="handleAdd"
        />
      </div>
    </div>
    <div class="body">
      <div
        v-if="state.tableData.length === 0"
        class="flx-center"
        style="height: 100%"
      >
        <p style="color: #a8abb2">暂无数据</p>
      </div>
      <el-scrollbar v-else>
        <el-row style="flex-wrap: wrap; gap: 15px">
          <el-card
            v-for="(row, index) in state.tableData"
            :key="index"
            class="card"
            shadow="never"
          >
            <div class="header">
              <div
                class="img"
                :style="{ background: randomColor[index % 10][0] }"
              >
                <p :style="{ color: randomColor[index % 10][1] }">
                  {{ getPinyinInitials(row.hospitalName) }}
                </p>
              </div>
              <div class="operation">
                <el-dropdown>
                  <el-icon>
                    <MoreFilled />
                  </el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <el-button
                          type="primary"
                          link
                          @click="handleUpdate(row)"
                        >
                          编辑
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          type="danger"
                          link
                          @click="handleDelete(row)"
                        >
                          删除
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <div>
              <p>{{ row.hospitalName }}</p>
              <el-tag class="margin-b-16">{{ row.hospitalLevel }}</el-tag>
            </div>
            <div>
              <el-button @click="navigateToDetail(row)">详情</el-button>
            </div>
          </el-card>
        </el-row>
      </el-scrollbar>
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
  <hospital-info
    ref="hospitalInfoRef"
    :title="title"
    @refresh="handleQuery"
  />
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { MoreFilled, Plus, Search } from '@element-plus/icons-vue'
import { addDateRange, getPinyinInitials, useRandomColor } from '@/utils/util.js'
import { useConfirmHandle } from '@/hooks/useConfirmHandle.js'
import HospitalInfo from '@/views/hospital/dialog/hospitalInfo.vue'
import router from '@/router/index.js'
import { HospitalService } from '@api/consultation-api.js'

defineComponent({
  name: 'HospitalList'
})

const loading = ref(false)
const randomColor = Array.from({ length: 10 }, () =>
  useRandomColor({
    count: 2
  })
)
const state = reactive({
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
const hospitalInfoRef = ref()
const title = ref('')

/** 搜索按钮操作 */
const handleQuery = () => {
  state.pageable.pageNum = 1
  getList()
}

/** 查询列表 */
const getList = () => {
  loading.value = true
  Object.assign(state.totalParam, state.searchParam, state.pageable)
  HospitalService.hospital.getList(addDateRange(state.totalParam)).then((response) => {
    const data = response.data
    state.tableData = data.records
    state.pageable.total = Number(data.total)
    loading.value = false
  })
}

/**
 * @description 每页条数改变
 * @param {Number} val 当前条数
 * @return {void}
 * */
const handleSizeChange = (val) => {
  state.pageable.pageNum = 1
  state.pageable.pageSize = val
  getList()
}

/**
 * @description 当前页改变
 * @param {Number} val 当前页
 * @return {void}
 * */
const handleCurrentChange = (val) => {
  state.pageable.pageNum = val
  getList()
}

const handleAdd = () => {
  loading.value = true
  title.value = '添加医院信息'
  hospitalInfoRef.value.reset()
  hospitalInfoRef.value.acceptParams()
  loading.value = false
}

const handleUpdate = (row) => {
  loading.value = true
  title.value = '修改医院信息'
  hospitalInfoRef.value.reset()
  HospitalService.hospital.getInfoById(row.hospitalKey).then((response) => {
    hospitalInfoRef.value.acceptParams(response.data)
    loading.value = false
  })
}

const handleDelete = (row) => {
  useConfirmHandle(HospitalService.hospital.del, row.hospitalKey, `删除${row.hospitalName}的数据项`).then(() => {
    getList()
  })
}

const navigateToDetail = (row) => {
  router.push({
    name: 'hospitalDetail',
    params: {
      hospitalId: row.hospitalKey
    }
  })
}

onMounted(() => {
  handleQuery()
})
</script>

<style scoped>
.body {
  height: calc(100vh - 240px);
}

.card {
  width: 262px;
  background: #ffffff;
  border-radius: 8px;
}

.card .header {
  position: relative;
}

.card .header .img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.card .header .img p {
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  margin: 0;
}

.card .header .operation {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}

.card .header .operation i.el-icon:focus {
  outline: none;
}
</style>
