<template>
  <div class="report">
    <div class="flx info">
      <div class="header">
        <svg-icon
          name="header"
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="patientInfo">
        <el-row>
          <div
            class="item"
            style="font-size: 20px"
          >
            568798975
          </div>
          <div class="item">感染诊断</div>
          <div class="item">感染病原体</div>
        </el-row>
        <el-row>
          <div class="item">
            <span>男</span>
            <el-divider :direction="'vertical'" />
            <span>56岁</span>
          </div>
          <div class="item">肺部感染、上呼吸道感染</div>
          <div class="item">细菌（阳性菌-金黄色葡萄球菌）</div>
        </el-row>
      </div>
    </div>
    <el-card
      class="card card-container"
      shadow="never"
    >
      <template #header>
        <div class="card-header">
          <span class="title">药师会诊意见</span>
        </div>
      </template>
      <template #default>
        <div class="margin-b-40">
          <div class="sub-title margin-b-16">治疗建议一</div>
          <div class="bg">
            <div>
              <p class="desc">
                会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述
              </p>
            </div>
            <dynamic-table
              :table-data="medicine.pharmacistTableData"
              :table-header="medicine.tableHeader"
              :is-show-operation="false"
            />
          </div>
        </div>
        <div>
          <el-row gutter="40">
            <el-col :span="12">
              <div class="sub-title margin-b-16">治疗建议二</div>
              <div class="bg">
                <div>
                  <p class="desc">需要完善的检查：具体检查项目</p>
                  <p class="desc">动态监测指标：如监测血药浓度、肝肾功能</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="sub-title margin-b-16">采纳意见</div>
              <div class="bg">
                <div>
                  <p class="desc">采纳部分会诊医师意见</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-card>
    <el-card
      class="card card-container"
      shadow="never"
    >
      <template #header>
        <div class="card-header">
          <span class="title">医师会诊意见</span>
        </div>
      </template>
      <template #default>
        <div class="margin-b-40">
          <div class="sub-title margin-b-16">治疗建议一</div>
          <div class="bg">
            <div>
              <p class="desc">
                会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述会诊意见描述
              </p>
            </div>
            <dynamic-table
              :table-data="medicine.physicianTableData"
              :table-header="medicine.tableHeader"
              :is-show-operation="false"
            />
          </div>
        </div>
        <div class="margin-b-40">
          <el-row gutter="40">
            <el-col :span="12">
              <div class="sub-title margin-b-16">治疗建议二</div>
              <div class="bg">
                <div>
                  <p class="desc">需要完善的检查：具体检查项目</p>
                  <p class="desc">动态监测指标：如监测血药浓度、肝肾功能</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="sub-title margin-b-16">采纳意见（医师和药师意见不一致）</div>
              <div class="bg">
                <div>
                  <p class="desc">
                    具体不一致的内容描述具体不一致的内容描述具体不一致的内容描述具体不一致的内容描述具体不一致的内容描述
                  </p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="sub-title margin-b-16">最终采纳意见（最终采纳药师+医师意见）</div>
        </div>
      </template>
    </el-card>
    <el-card
      class="card card-container"
      shadow="never"
    >
      <template #header>
        <div class="card-header">
          <span class="title">会诊建议类型/患者转归结局</span>
        </div>
      </template>
      <template #default>
        <div>
          <el-row
            gutter="40"
            type="flex"
          >
            <el-col :span="12">
              <div class="sub-title margin-b-16">会诊建议类型</div>
              <div class="bg">
                <div>
                  <p class="desc">微生物种类：细菌、真菌</p>
                  <p class="desc">维持当前治疗方案</p>
                  <p class="desc">血药浓度监测，调整剂量</p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="sub-title margin-b-16">患者转归结局</div>
              <div class="bg">
                <div>
                  <p class="desc">药敏情况：同前</p>
                  <p class="desc">转归结局：部分缓解</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import SvgIcon from '@components/SvgIcon/index.vue'
import DynamicTable from '@components/Table/DynamicTable.vue'
import { defineComponent, reactive } from 'vue'

defineComponent({
  name: 'ConsultationReport'
})

const medicine = reactive({
  tableHeader: [
    { prop: 'drugName', label: '药物名称（通用名）', width: '200' },
    { prop: 'drugType', label: '进口/国产' },
    { prop: 'isCollect', label: '是否集采' },
    { prop: 'specifications', label: '规格/g' },
    { prop: 'singleDose', label: '单次用药剂量/g' },
    { prop: 'medicationFrequency', label: '用药频次' },
    { prop: 'treatmentCourse', label: '疗程/d' },
    { prop: 'totalDose', label: '总剂量/g' },
    { prop: 'antibacterialCosts', label: '抗菌药花费（元）' }
  ],
  // 表格数据
  pharmacistTableData: [],
  physicianTableData: []
})
</script>

<style scoped>
.report {
  margin-top: 30px;
}

.report .info {
  height: 122px;
  background: #4949c9;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
}

.report .info .header {
  width: 64px;
  height: 64px;
  padding: 30px 15px 30px 30px;
}

.report .info .patientInfo {
  width: 100%;
  padding: 30px 15px;
}

.report .info .patientInfo .el-row:first-child {
  margin-bottom: 17px;
}

.report .info .patientInfo .item {
  flex: 1;
}

.report .card .sub-title {
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #222222;
  line-height: 20px;
}

.report .card .sub-title:before {
  content: '●';
  font-size: 6px;
  margin-right: 7px;
  color: rgba(73, 73, 201, 0.5);
}

.report .card .bg {
  background: #f4f7ff;
  border-radius: 6px;
  padding: 24px;
}

.report .card .bg .desc {
  font-size: 14px;
  font-weight: 400;
  color: #51515a;
  line-height: 22px;
}

:deep(.table-header) {
  background: #e5e5ff !important;
}
</style>
