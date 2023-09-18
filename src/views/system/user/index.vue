<template>
  <div
    v-loading.fullscreen.lock="fullLoading"
    class="flx main"
  >
    <TreeFilter
      :request-api="DeptService.getDeptTreeSelect()"
      :default-value="initParam.departmentId"
      title="科室列表"
      @change="changeInitParam"
    />
    <div class="table">
      <el-card
        v-show="isShowSearch"
        class="table-search"
        shadow="never"
      >
        <el-form
          ref="queryFormRef"
          :model="state.searchParam"
          :inline="true"
          label-width="68px"
        >
          <el-form-item
            label="用户名称"
            prop="userName"
          >
            <el-input
              v-model="state.searchParam.userName"
              placeholder="请输入用户名称"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="phonenumber"
          >
            <el-input
              v-model="state.searchParam.phonenumber"
              placeholder="请输入手机号码"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item
            label="状态"
            prop="status"
          >
            <el-select
              v-model="state.searchParam.status"
              placeholder="用户状态"
              :clearable="true"
              style="width: 240px"
            >
              <el-option
                v-for="dict in dict.statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="创建时间"
            prop="dateRange"
          >
            <el-date-picker
              v-model="state.searchParam.dateRange"
              style="width: 220px"
              value-format="YYYY-MM-DD"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-form>
        <div>
          <el-button
            type="primary"
            :icon="Search"
            @click="handleQuery"
            >搜索
          </el-button>
          <el-button
            type="info"
            plain
            :icon="Refresh"
            @click="resetQuery"
            >重置
          </el-button>
        </div>
      </el-card>
      <el-card
        class="table-box"
        shadow="never"
      >
        <div class="table-header">
          <div class="header-button-lf">
            <el-button
              type="primary"
              :icon="Plus"
              @click="handleAdd"
            >
              新增用户
            </el-button>
          </div>
          <div class="header-button-ri">
            <el-button
              :icon="Refresh"
              circle
              @click="handleQuery"
            ></el-button>
            <el-button
              :icon="Search"
              circle
              @click="isShowSearch = !isShowSearch"
            ></el-button>
          </div>
        </div>
        <el-table
          v-loading="loading"
          :data="state.tableData"
        >
          <template #empty>
            <div class="table-empty">
              <div>暂无数据</div>
            </div>
          </template>
          <el-table-column
            type="selection"
            width="50"
            align="center"
          />
          <el-table-column
            key="userId"
            label="用户编号"
            align="center"
            prop="userId"
          />
          <el-table-column
            key="userName"
            label="用户名称"
            align="center"
            prop="userName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            key="nickName"
            label="用户昵称"
            align="center"
            prop="nickName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            key="deptName"
            label="科室"
            align="center"
            prop="dept.deptName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            key="phonenumber"
            label="手机号码"
            width="120"
            align="center"
            prop="phonenumber"
          />
          <el-table-column
            key="status"
            label="用户状态"
            width="160"
            align="center"
            prop="status"
          >
            <template #default="scope">
              <el-switch
                :model-value="scope.row.status"
                :active-text="scope.row.status === '0' ? '启用' : '禁用'"
                :active-value="'0'"
                :inactive-value="'1'"
                @change="changeStatus($event, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            width="180"
          >
            <template #default="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            :fixed="`right`"
            width="210"
            class-name="small-padding fixed-width"
          >
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                link
                :icon="EditPen"
                @click="handleUpdate(scope.row)"
                >编辑
              </el-button>
              <el-button
                type="primary"
                size="small"
                link
                :icon="Refresh"
                @click="handleResetPwd(scope.row)"
                >重置密码
              </el-button>
              <el-button
                type="primary"
                size="small"
                link
                :icon="Delete"
                @click="handleDelete(scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </el-card>
    </div>
    <UserInfo
      ref="userRef"
      :title="title"
      :sex-options="dict.sexOptions"
      :status-options="dict.statusOptions"
      @refresh="handleQuery"
    />
  </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import TreeFilter from '@/components/TreeFilter/index.vue'
import { DeptService, DictService, UserService } from '@/api/sys-api.js'
import { Delete, EditPen, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { addDateRange, resetForm } from '@/utils/util'
import { ElMessage as elMessage } from 'element-plus'
import UserInfo from '@/views/system/user/dialog/userInfo.vue'
import { useConfirmHandle } from '@/hooks/useConfirmHandle.js'
import { usePromptHandle } from '@/hooks/usePromptHandle.js'

defineComponent({
  name: 'SysUser'
})

const queryFormRef = ref()
const initParam = reactive({ departmentId: '' })

// 树形筛选切换
const changeInitParam = (val) => {
  initParam.departmentId = val
}

// 是否展示搜索模块
const isShowSearch = ref(true)

const loading = ref(false)

const fullLoading = ref(false)

const title = ref('')

const dict = reactive({
  // 状态数据字典
  statusOptions: [],
  // 性别状态字典
  sexOptions: []
})

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
  // 初始化默认的查询参数
  searchInitParam: {},
  // 总参数(包含分页和查询参数)
  totalParam: {}
})

const userRef = ref()

/** 搜索按钮操作 */
const handleQuery = () => {
  state.pageable.pageNum = 1
  getUserList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  initParam.departmentId = null
  Object.assign(state.searchParam, { deptId: initParam.departmentId })
  resetForm(queryFormRef.value)
  getUserList()
}

/** 查询用户列表 */
const getUserList = () => {
  loading.value = true
  Object.assign(state.totalParam, state.searchParam, state.pageable)
  UserService.user.getList(addDateRange(state.totalParam)).then((response) => {
    const data = response.data
    state.tableData = data.records
    state.pageable.total = Number(data.total)
    loading.value = false
  })
}

const changeStatus = async (val, params) => {
  await useConfirmHandle(
    UserService.user.changeUserStatus,
    {
      userId: params.userId,
      status: val
    },
    `切换【${params.nickName}】用户状态`
  )
  getUserList()
}

const handleAdd = () => {
  fullLoading.value = true
  title.value = '添加用户'
  userRef.value.reset()
  UserService.user.getInfoById('').then((response) => {
    userRef.value.acceptParams(response.data)
    fullLoading.value = false
  })
}

const handleUpdate = (row) => {
  fullLoading.value = true
  title.value = '修改用户'
  userRef.value.reset()
  UserService.user.getInfoById(row.userId).then((response) => {
    userRef.value.acceptParams(response.data)
    fullLoading.value = false
  })
}

const handleResetPwd = (row) => {
  usePromptHandle('请输入"' + row.userName + '"的新密码').then(({ value }) => {
    UserService.user.resetUserPwd(row.userId, value).then(() => {
      elMessage.success('修改成功，新密码是：' + value)
    })
  })
}

const handleDelete = (row) => {
  useConfirmHandle(UserService.user.del, row.userId, `删除用户编号为${row.userId}的数据项`).then(() => {
    getUserList()
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
  getUserList()
}

/**
 * @description 当前页改变
 * @param {Number} val 当前页
 * @return {void}
 * */
const handleCurrentChange = (val) => {
  state.pageable.pageNum = val
  getUserList()
}

onMounted(() => {
  getUserList()
  DictService.getDictByType('sys_normal_disable').then((response) => {
    dict.statusOptions = response.data
  })
  DictService.getDictByType('sys_user_sex').then((response) => {
    dict.sexOptions = response.data
  })
})

watch(
  () => initParam.departmentId,
  (newValue, oldValue) => {
    if (newValue) {
      Object.assign(state.searchParam, { deptId: newValue })
      getUserList()
    }
  }
)
</script>

<style scoped>
.main .table {
  width: calc(100% - 230px);
  margin: -10px;
}
</style>
