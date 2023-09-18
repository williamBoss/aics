<template>
  <el-card
    class="filter"
    shadow="never"
  >
    <h4
      v-if="title"
      class="title sle"
    >
      {{ title }}
    </h4>
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      clearable
    />
    <el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
      <el-tree
        ref="treeRef"
        default-expand-all
        :node-key="id"
        :data="treeData"
        :current-node-key="defaultValue"
        :highlight-current="true"
        :expand-on-click-node="false"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </el-scrollbar>
  </el-card>
</template>

<script setup>
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { ElTree } from 'element-plus'

defineComponent({
  name: 'TreeFilter'
})

const props = defineProps({
  // 请求分类数据的 api ==> 非必传
  requestApi: { type: Promise, default: undefined, required: false },
  // 分类数据，如果有分类数据，则大于 api 请求 ==> 非必传
  data: { type: Array, default: undefined, required: false },
  // treeFilter 标题 ==> 非必传
  title: { type: String, default: undefined, required: false },
  // 选择的id ==> 非必传，默认为 “id”
  id: { type: String, default: 'id', required: false },
  // 显示的label ==> 非必传，默认为 “label”
  label: { type: String, default: 'label', required: false },
  // 默认选中的值 ==> 非必传，默认为 ""
  defaultValue: { type: String, default: '', required: false }
})

const defaultProps = {
  children: 'children',
  label: props.label
}

const filterText = ref('')
const treeRef = ref()
const treeData = ref([])

onBeforeMount(async () => {
  if (props.data?.length) return (treeData.value = props.data)
  if (props.requestApi) {
    const { data } = await props.requestApi
    treeData.value = [...data]
  }
})

watch(filterText, (val) => {
  treeRef.value?.filter(val)
})

const filterNode = (value, data) => {
  if (!value) return true
  return data[props.label].includes(value)
}

const emit = defineEmits(['change'])
const handleNodeClick = (data) => {
  emit('change', data[props.id])
}
</script>

<style scoped>
@import './index.css';
</style>
