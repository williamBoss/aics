<template>
  <div class="login-container flx-center">
    <div class="logo">
      <!--<img
        src="@/assets/images/logo/logo.png"
        alt="logo"
      />-->
    </div>
    <div class="login-box">
      <div class="login-form">
        <div class="login-logo">
          <h2 class="logo-text">{{ title }}</h2>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          size="large"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
              style="width: 63%"
            >
            </el-input>
            <div class="login-code">
              <img
                :src="codeUrl"
                alt="login-code"
                @click="getCode"
              />
            </div>
          </el-form-item>
        </el-form>
        <div class="login-btn">
          <el-button
            :loading="loading"
            size="large"
            @click="login(loginFormRef)"
          >
            <span>登录</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElNotification as elNotification } from 'element-plus'
import { Base64 } from 'js-base64'
import { getTimeState } from '@/utils/util'
import { useRouter } from 'vue-router'
import { HOME_URL } from '@/config/config'
import { globalStore } from '@/store'
import { LoginService } from '@api/sys-api.js'

defineComponent({
  name: 'LoginSys'
})

const router = useRouter()
const title = ref(import.meta.env.VITE_APP_TITLE)
const global = globalStore()
const codeUrl = ref()
const loginFormRef = ref()
const loginForm = reactive({ username: '', password: '', code: '', uuid: '' })
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
const loading = ref(false)

const getCode = () => {
  LoginService.getCodeImg().then((res) => {
    const { data } = res
    codeUrl.value = 'data:image/gif;base64,' + Base64.decode(data.img)
    loginForm.uuid = data.uuid
  })
}

const login = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      LoginService.login(loginForm.username, loginForm.password, loginForm.code, loginForm.uuid)
        .then((res) => {
          const { data } = res
          global.token = data.access_token
          router.replace(HOME_URL)
          elNotification({
            title: getTimeState(),
            message: `欢迎登录${title.value}`,
            type: 'success',
            duration: 3000
          })
        })
        .catch((reason) => {
          console.error('login:{}', reason)
          getCode()
        })
    } finally {
      loading.value = false
    }
  })
}

onMounted(() => {
  getCode()
})
</script>

<style scoped>
@import 'login.module.css';
</style>
