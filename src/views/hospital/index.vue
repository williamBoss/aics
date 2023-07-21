<template>
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
    <el-scrollbar>
      <el-row style="flex-wrap: wrap; gap: 15px">
        <el-card
          v-for="(i, index) in 10"
          :key="index"
          class="card"
          shadow="never"
        >
          <div class="header">
            <div
              class="img"
              :style="{ background: randomColor[index % 10][0] }"
            >
              <p :style="{ color: randomColor[index % 10][1] }">Z</p>
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
                        @click="handleUpdate"
                      >
                        编辑
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="danger"
                        link
                        @click="handleDelete"
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
            <p>北京友谊医院</p>
            <el-tag class="margin-b-16">三甲</el-tag>
          </div>
          <div>
            <el-button>详情</el-button>
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
  <hospital-info
    ref="hospitalInfoRef"
    :title="title"
    @refresh="handleQuery"
  />
</template>

<script setup>
import { defineComponent, reactive, ref } from 'vue'
import { MoreFilled, Plus, Search } from '@element-plus/icons-vue'
import { useRandomColor } from '@/utils/util.js'
import { useConfirmHandle } from '@/hooks/useConfirmHandle.js'
import HospitalInfo from '@/views/hospital/dialog/hospitalInfo.vue'

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
const getList = () => {}

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
  hospitalInfoRef.value.acceptParams(response.data)
  loading.value = false
}

const handleDelete = (row) => {
  useConfirmHandle(UserService.user.del, row.userId, `删除${row.hospitalName}的数据项`).then(() => {
    getList()
  })
}
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
