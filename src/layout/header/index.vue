<template>
  <div class="header">
    <div
      class="fold-icon"
      @click="toggle"
    >
      <!-- <el-icon v-if="!sidebarCollapse" :size="24" color="#909399">
                <fold />
            </el-icon>
            <el-icon v-else :size="24" color="#909399">
                <expand />
            </el-icon>-->
    </div>
    <el-dropdown trigger="click">
      <div class="avatar">
        <el-avatar :src="avatar === '' ? defaultAvatar : avatar"></el-avatar>
        <span class="nickName"> {{ user.nickName }} </span>
        <el-icon>
          <caret-bottom />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            :icon="Right"
            @click="signOut"
            >用户登出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { CaretBottom, Right } from '@element-plus/icons-vue'
import { userStore } from '@/store/modules/user'
import defaultAvatar from '@/assets/images/profile.jpg'
import { defineComponent } from 'vue'

defineComponent({
  name: 'PageHeader'
})

const props = defineProps({
  sidebarCollapse: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:sidebarCollapse'])
const router = useRouter()
// 用户信息变量
const user = userStore()
const { avatar } = user

// ↓sidebar折叠/展开的开关
const toggle = () => {
  // ↓修改父组件值
  emit('update:sidebarCollapse', !props.sidebarCollapse)
}

// ↓登出
const signOut = () => {
  // TODO 有store变量后需清除store变量
  router.push('/login')
}
</script>

<style scoped>
.header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 0;
}

.header .fold-icon {
  padding: 11px 13px;
}

.header .avatar {
  padding: 11px 13px;
  margin-right: 9px;
  display: inline-flex;
  align-items: center;
}

.header .avatar .nickName {
  height: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #272944;
  line-height: 14px;
  margin-right: 8px;
}

.header .avatar .el-avatar {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.header .fold-icon:hover,
.header .avatar:hover {
  cursor: pointer;
  background: #f7f7f7;
}
</style>
