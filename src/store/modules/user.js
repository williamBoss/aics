import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import piniaPersistConfig from '@/config/persist.js'

export const userStore = defineStore(
  'UserState',
  () => {
    const state = reactive({
      userName: '',
      nickName: '',
      email: '',
      phonenumber: '',
      sex: '',
      avatar: '',
      admin: false,
      roleNames: [],
      permissions: []
    })
    const setName = (nickName) => {
      state.nickName = nickName
    }
    const setAvatar = (avatar) => {
      state.avatar = avatar
    }
    const setRoleNames = (roleNames) => {
      state.roleNames = roleNames
    }
    const setPermissions = (permissions) => {
      state.permissions = permissions
    }
    return {
      ...toRefs(state),
      setName,
      setAvatar,
      setRoleNames,
      setPermissions
    }
  },
  {
    persist: piniaPersistConfig('UserState')
  }
)
