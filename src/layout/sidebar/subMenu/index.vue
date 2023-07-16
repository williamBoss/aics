<template>
  <template
    v-for="subItem in menuList"
    :key="subItem.path"
  >
    <el-sub-menu
      v-if="subItem.children && subItem.children.length > 0 && !subItem.meta.hidden"
      :index="subItem.name"
    >
      <template #title>
        <el-icon v-if="subItem.meta.iconType">
          <svg-icon
            v-if="subItem.meta.iconType === 'sl'"
            :name="subItem.meta.icon"
          />
          <component
            :is="Icons[subItem.meta.icon]"
            v-else-if="subItem.meta.iconType === 'el'"
          />
        </el-icon>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item
      v-else-if="!subItem.meta.hidden"
      :index="subItem.name"
      @click="handleClickMenu(subItem)"
    >
      <el-icon>
        <svg-icon
          v-if="subItem.meta.iconType === 'sl'"
          :name="subItem.meta.icon"
        />
        <component
          :is="Icons[subItem.meta.icon]"
          v-else-if="subItem.meta.iconType === 'el'"
        />
      </el-icon>
      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SubMenu from '@/layout/sidebar/subMenu/index.vue'
import * as Icons from '@element-plus/icons-vue'
import SvgIcon from '@components/SvgIcon/index.vue'
import { defineComponent } from 'vue'

defineComponent({
  name: 'SubMenu'
})

defineProps({
  menuList: { type: Array, default: Array }
})

const router = useRouter()
const handleClickMenu = (subItem) => {
  router.push(subItem.path)
}
</script>

<style scoped></style>
