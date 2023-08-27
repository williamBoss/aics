const LabTestsList = [
  {
    tableHeader: [
      { prop: 'projectName', label: '项目名称', isEdit: false, type: '' },
      { prop: 'testResult', label: '结果', isEdit: true, type: 'input' },
      { prop: 'reference', label: '参考值', isEdit: false, type: '' }
    ],
    tableData: [
      {
        projectName: '白细胞计数（WBC）',
        key: 'wbc',
        testResult: '',
        reference: '4~10 ×109/L'
      },
      {
        projectName: '淋巴细胞（LY%）',
        key: 'ly',
        testResult: '',
        reference: '20~40%'
      },
      {
        projectName: 'C-反应蛋白（CRP）',
        key: 'crp',
        testResult: '',
        reference: '＜10mg/L'
      },
      {
        projectName: '中性粒细胞百分比（GR%）',
        key: 'gr',
        testResult: '',
        reference: '50~70%'
      },
      {
        projectName: '降钙素原（PCT）',
        key: 'pct',
        testResult: '',
        reference: '<0.5ng/mL'
      }
    ]
  },
  {
    tableHeader: [
      { prop: 'projectName', label: '项目名称', isEdit: false, type: '' },
      { prop: 'testResult', label: '结果', isEdit: true, type: 'input' },
      { prop: 'reference', label: '参考值', isEdit: false, type: '' }
    ],
    tableData: [
      {
        projectName: 'IL-6',
        key: 'il6',
        testResult: '',
        reference: '＜7pg/mL'
      },
      {
        projectName: '尿白细胞计数',
        key: 'ul',
        testResult: '',
        reference: '男：0~2个/hp <br/> 女：0~5个/hp'
      },
      {
        projectName: '血沉（ESR）',
        key: 'esr',
        testResult: '',
        reference: '男：0～15mm/1h <br/> 女：0～20mm/1h'
      }
    ]
  }
]

const PathogenCxResultList = [
  {
    tableHeader: [
      { prop: 'pathogen', label: '病原体', isEdit: true },
      { prop: 'classificationBacteria', label: '细菌分类', isEdit: true },
      { prop: 'specificStrains', label: '具体菌种', isEdit: true }
    ],
    tableData: [
      {
        pathogenOptions: [{ value: '细菌', label: '细菌' }],
        classificationBacteriaOptions: [
          { value: '革兰阳性菌', label: '革兰阳性菌' },
          { value: '革兰阴性菌', label: '革兰阴性菌' },
          { value: '厌氧菌', label: '厌氧菌' }
        ],
        specificStrainsOptions: [
          { value: '金黄色葡萄球菌', label: '金黄色葡萄球菌' },
          { value: '表皮葡萄球菌', label: '表皮葡萄球菌' },
          { value: '溶血性葡萄球菌', label: '溶血性葡萄球菌' },
          { value: '尿肠球菌', label: '尿肠球菌' },
          { value: '粪肠球菌', label: '粪肠球菌' },
          { value: '其他', label: '其他' }
        ]
      },
      {
        pathogenOptions: [{ value: '真菌', label: '真菌' }],
        classificationBacteriaOptions: [
          { value: '白色念珠菌', label: '白色念珠菌' },
          { value: '光滑念珠菌', label: '光滑念珠菌' },
          { value: '近平滑念珠菌', label: '近平滑念珠菌' },
          { value: '曲霉菌', label: '曲霉菌' },
          { value: '毛霉菌', label: '毛霉菌' },
          { value: '隐球菌', label: '隐球菌' }
        ],
        specificStrainsOptions: [
          { value: '大肠杆菌', label: '大肠杆菌' },
          { value: '变形杆菌', label: '变形杆菌' },
          { value: '阴沟肠杆菌', label: '阴沟肠杆菌' },
          { value: '嗜麦芽窄食单胞菌', label: '嗜麦芽窄食单胞菌' },
          { value: '肺炎克雷伯菌', label: '肺炎克雷伯菌' },
          { value: '铜绿假单胞菌', label: '铜绿假单胞菌' },
          { value: '鲍曼不动杆菌', label: '鲍曼不动杆菌' },
          { value: '洋葱伯克霍尔德菌', label: '洋葱伯克霍尔德菌' }
        ]
      },
      {
        pathogenOptions: [{ value: '病毒', label: '病毒' }],
        classificationBacteriaOptions: [],
        specificStrainsOptions: []
      }
    ]
  }
]

export { LabTestsList, PathogenCxResultList }
