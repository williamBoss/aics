<template>
  <el-card
    v-show="widget.options.hidden"
    :ref="widget.id"
    :key="widget.id"
    class="card-container"
    :class="[customClass]"
    :shadow="widget.options.shadow"
    :style="{ width: widget.options.cardWidth + '!important' || '' }"
    :body-style="widget.options.bodyStyle"
  >
    <template
      v-if="widget.options.showLabel"
      #header
    >
      <div class="card-header">
        <span class="title">{{ widget.options.label }}</span>
      </div>
    </template>
    <template v-if="widget.widgetList && Array.isArray(widget.widgetList) && widget.widgetList.length > 0">
      <template v-for="(subWidget, swIdx) in widget.widgetList">
        <template v-if="'container' === subWidget.category">
          <component
            :is="getComponentByContainer(subWidget)"
            :key="swIdx"
            :widget="subWidget"
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
          </component>
        </template>
        <template v-else>
          <component
            :is="subWidget.type + '-widget'"
            :key="swIdx"
            :field="subWidget"
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
          </component>
        </template>
      </template>
    </template>
  </el-card>
</template>

<script setup>
import { defineComponent } from 'vue'
import { commonProps, useCommonComputed } from '@components/FormRender/Container/Common.js'

defineComponent({
  name: 'CardContainer'
})

const props = defineProps({
  ...commonProps
})
const { customClass, getComponentByContainer } = useCommonComputed(props)
</script>

<style scoped></style>
