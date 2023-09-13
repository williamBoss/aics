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

const PathogenOptions = [
  {
    label: '细菌',
    value: '细菌'
  },
  {
    label: '真菌',
    value: '真菌'
  },
  {
    label: '病毒',
    value: '病毒'
  },
  {
    label: '寄生虫类型',
    value: '寄生虫类型'
  },
  {
    label: '立克次体',
    value: '立克次体'
  },
  {
    label: '衣原体',
    value: '衣原体'
  },
  {
    label: '支原体',
    value: '支原体'
  },
  {
    label: '其他病原体',
    value: '其他病原体'
  }
]

const PathogenCxResultList = [
  {
    tableHeader: [
      { prop: 'pathogen', label: '病原体', isEdit: true, width: 150 },
      { prop: 'classificationBacteria', label: '分类', isEdit: true, width: 150 },
      { prop: 'specificStrains', label: '具体病原体', isEdit: true }
    ],
    tableData: [
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '细菌', label: '细菌' }],
        classificationBacteriaOptions: [{ value: '革兰阳性菌', label: '革兰阳性菌' }],
        specificStrainsOptions: [
          { value: '金黄色葡萄球菌', label: '金黄色葡萄球菌' },
          { value: '表皮葡萄球菌', label: '表皮葡萄球菌' },
          { value: '溶血性葡萄球菌', label: '溶血性葡萄球菌' },
          { value: '屎肠球菌', label: '屎肠球菌' },
          { value: '粪肠球菌', label: '粪肠球菌' }
        ],
        spanArray: [3, 1]
      },
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '细菌', label: '细菌' }],
        classificationBacteriaOptions: [{ value: '革兰阴性菌', label: '革兰阴性菌' }],
        specificStrainsOptions: [
          { value: '大肠杆菌', label: '大肠杆菌' },
          { value: '肺炎克雷伯菌', label: '肺炎克雷伯菌' },
          { value: '铜绿假单胞菌', label: '铜绿假单胞菌' },
          { value: '鲍曼不动杆菌', label: '鲍曼不动杆菌' },
          { value: '变形杆菌', label: '变形杆菌' },
          { value: '阴沟肠杆菌', label: '阴沟肠杆菌' },
          { value: '嗜麦芽窄食单胞菌', label: '嗜麦芽窄食单胞菌' },
          { value: '洋葱伯克霍尔德菌', label: '洋葱伯克霍尔德菌' }
        ],
        spanArray: [0, 0]
      },
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '细菌', label: '细菌' }],
        classificationBacteriaOptions: [{ value: '厌氧菌', label: '厌氧菌' }],
        specificStrainsOptions: [
          { value: '产气荚膜梭菌', label: '产气荚膜梭菌' },
          { value: '破伤风梭菌', label: '破伤风梭菌' }
        ],
        spanArray: [0, 0]
      },
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '真菌', label: '真菌' }],
        classificationBacteriaOptions: [],
        specificStrainsOptions: [
          { value: '白色念珠菌', label: '白色念珠菌' },
          { value: '光滑念珠菌', label: '光滑念珠菌' },
          { value: '近平滑念珠菌', label: '近平滑念珠菌' },
          { value: '曲霉菌', label: '曲霉菌' },
          { value: '肺孢子菌', label: '肺孢子菌' },
          { value: '毛霉菌', label: '毛霉菌' },
          { value: '隐球菌', label: '隐球菌' }
        ]
      },
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '病毒', label: '病毒' }],
        classificationBacteriaOptions: [],
        specificStrainsOptions: [
          { value: '乙肝病毒（HBV）', label: '乙肝病毒（HBV）' },
          { value: '丙肝病毒（HCV）', label: '丙肝病毒（HCV）' },
          { value: '流感病毒', label: '流感病毒' },
          { value: 'EB病毒', label: 'EB病毒' },
          { value: '乙型脑炎病毒', label: '乙型脑炎病毒' },
          { value: '新型冠状病毒', label: '新型冠状病毒' },
          { value: '单纯疱疹病毒', label: '单纯疱疹病毒' },
          { value: '柯萨奇病毒', label: '柯萨奇病毒' },
          { value: 'HIV', label: 'HIV' }
        ]
      },
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '寄生虫类型', label: '寄生虫类型' }],
        classificationBacteriaOptions: [],
        specificStrainsOptions: [
          { value: '蛔虫', label: '蛔虫' },
          { value: '血吸虫', label: '血吸虫' },
          { value: '绦虫', label: '绦虫' },
          { value: '钩虫', label: '钩虫' },
          { value: '疥虫', label: '疥虫' },
          { value: '蛲虫', label: '蛲虫' },
          { value: '弓形虫', label: '弓形虫' },
          { value: '痢疾阿米巴', label: '痢疾阿米巴' },
          { value: '蓝氏贾第虫', label: '蓝氏贾第虫' }
        ]
      },
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '立克次体', label: '立克次体' }],
        classificationBacteriaOptions: [],
        specificStrainsOptions: [
          { value: '普氏立克次体', label: '普氏立克次体' },
          { value: '莫氏立克次体', label: '莫氏立克次体' },
          { value: '贝纳柯克斯体', label: '贝纳柯克斯体' },
          { value: '西伯利亚立克次体', label: '西伯利亚立克次体' }
        ]
      },
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '衣原体', label: '衣原体' }],
        classificationBacteriaOptions: [],
        specificStrainsOptions: [
          { value: '肺炎衣原体', label: '肺炎衣原体' },
          { value: '沙眼衣原体', label: '沙眼衣原体' }
        ]
      },
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '支原体', label: '支原体' }],
        classificationBacteriaOptions: [],
        specificStrainsOptions: [
          { value: '肺炎支原体', label: '肺炎支原体' },
          { value: '生殖支原体', label: '生殖支原体' }
        ]
      },
      {
        pathogen: [],
        classificationBacteria: [],
        specificStrains: [],
        pathogenOptions: [{ value: '其他病原体', label: '其他病原体' }],
        classificationBacteriaOptions: [],
        specificStrainsOptions: []
      }
    ]
  }
]

export { LabTestsList, PathogenOptions, PathogenCxResultList }
