<template>
  <el-col
    v-show="widget.options.hidden"
    :key="widget.id"
    class="grid-cell"
    :class="[customClass]"
    v-bind="layoutProps"
    :style="colHeightStyle"
  >
    <template v-if="widget.widgetList && widget.widgetList.length > 0">
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
    <template v-else>
      <el-col>
        <div class="blank-cell">
          <span>--</span>
        </div>
      </el-col>
    </template>
  </el-col>
</template>

<script setup>
import { computed, defineComponent, reactive } from 'vue'
import { commonProps, useCommonComputed } from '@components/FormRender/Container/Common.js'

defineComponent({
  name: 'LayoutGridItemContainer'
})

const props = defineProps({
  ...commonProps,
  colHeight: {
    type: String,
    default: null
  }
})
const layoutProps = reactive({
  span: props.widget.options.span,
  offset: props.widget.options.offset || 0,
  push: props.widget.options.push || 0,
  pull: props.widget.options.pull || 0,
  xs: props.widget.options.xs || 12,
  sm: props.widget.options.sm || 12,
  md: props.widget.options.md || 12
})
const { customClass, getComponentByContainer } = useCommonComputed(props)
const colHeightStyle = computed(() => (props.colHeight ? { height: props.colHeight + 'px' } : {}))
</script>

<style scoped></style>
