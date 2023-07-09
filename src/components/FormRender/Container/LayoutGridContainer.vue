<template>
  <el-row
    v-show="!widget.options.hidden"
    :ref="widget.id"
    :key="widget.id"
    class="grid-container"
    :class="[customClass]"
    :gutter="widget.options.gutter"
  >
    <template
      v-for="(colWidget, colIdx) in widget.cols"
      :key="colIdx"
    >
      <layout-grid-item-container
        :widget="colWidget"
        :col-height="widget.options.colHeight"
      >
        <!-- 递归传递插槽！！！ -->
        <template
          v-for="slot in Object.keys($slots)"
          #[slot]="scope"
        >
          <slot
            :name="slot"
            v-bind="scope"
          />
        </template>
      </layout-grid-item-container>
    </template>
  </el-row>
</template>

<script setup>
import { defineComponent } from 'vue'
import { commonProps, useCommonComputed } from '@components/FormRender/Container/Common.js'
import LayoutGridItemContainer from '@components/FormRender/Container/LayoutGridItemContainer.vue'

defineComponent({
  name: 'LayoutGridContainer'
})

const props = defineProps({
  ...commonProps
})
const { customClass } = useCommonComputed(props)
</script>

<style scoped></style>
