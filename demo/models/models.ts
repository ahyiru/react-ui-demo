//sidebarMenu
export const sidebarMenu=[{
  url:'/#/',
  title:'主页',
  leftIcon:'fa fa-home',
  rightIcon:'fa fa-angle-right',
  open:''
},{
  url:'javascript:;',
  title:'功能',
  leftIcon:'fa fa-cogs',
  rightIcon:'fa fa-angle-right',
  open:'',
  subMenu:[{
    url:'/function/function1',
    icon:'fa fa-arrow-right',
    title:'功能1'
  },{
    url:'/function/function2',
    icon:'fa fa-arrow-right',
    title:'功能2'
  },{
    url:'/function/function3',
    icon:'fa fa-arrow-right',
    title:'功能3'
  }]
},{
  url:'javascript:;',
  title:'UI设计',
  leftIcon:'fa fa-picture-o',
  rightIcon:'fa fa-angle-right',
  open:'',
  subMenu:[{
    url:'/ui/ui1',
    icon:'fa fa-arrow-right',
    title:'UI设计1'
  },{
    url:'/ui/ui2',
    icon:'fa fa-arrow-right',
    title:'UI设计2'
  },{
    url:'/ui/ui3',
    icon:'fa fa-arrow-right',
    title:'UI设计3'
  }]
},{
  url:'javascript:;',
  title:'常用插件',
  leftIcon:'fa fa-gavel',
  rightIcon:'fa fa-angle-right',
  open:'',
  subMenu:[{
    url:'/plugins/plugin1',
    icon:'fa fa-arrow-right',
    title:'常用插件1'
  },{
    url:'/plugins/plugin2',
    icon:'fa fa-arrow-right',
    title:'常用插件2'
  },{
    url:'/plugins/plugin3',
    icon:'fa fa-arrow-right',
    title:'常用插件3'
  },{
    url:'/plugins/plugin4',
    icon:'fa fa-arrow-right',
    title:'常用插件4'
  }]
},{
  url:'javascript:;',
  title:'表格',
  leftIcon:'fa fa-table',
  rightIcon:'fa fa-angle-right',
  open:'',
  subMenu:[{
    url:'/tables/yTables',
    icon:'fa fa-arrow-right',
    title:'yTables'
  },{
    url:'/tables/datatables',
    icon:'fa fa-arrow-right',
    title:'bsTables'
  },{
    url:'/tables/bstables',
    icon:'fa fa-arrow-right',
    title:'bsTables'
  }]
},{
  url:'javascript:;',
  title:'图表',
  leftIcon:'fa fa-pie-chart',
  rightIcon:'fa fa-angle-right',
  open:'',
  subMenu:[{
    url:'/charts/highcharts',
    icon:'fa fa-arrow-right',
    title:'Highcharts'
  },{
    url:'/charts/echarts',
    icon:'fa fa-arrow-right',
    title:'Echarts'
  },{
    url:'/charts/Recharts',
    icon:'fa fa-arrow-right',
    title:'Recharts(D3)'
  },{
    url:'/charts/easypie',
    icon:'fa fa-arrow-right',
    title:'EasyPie'
  }]
}];

//notifyList
export const notifyList=[{
  class:'top-left success',
  icon:'fa fa-check-square-o',
  txt:'更新成功！'
},{
  class:'top-middle warning',
  icon:'fa fa-exclamation-triangle',
  txt:'数据格式不规范！'
},{
  class:'top-right danger',
  icon:'fa fa-times-circle',
  txt:'更新出错！'
},{
  class:'bottom-right info',
  icon:'fa fa-info-circle',
  txt:'请升级版本！'
}];

//dropList
export const dropList={
  searchFlag:true,
  leftList:[{
    name:'theme',
    icon:'fa fa-cog',
    animate:'fade-in-up',
    open:'',
    // items:['header','branding','sidebar','active']
    items:['头部','LOGO','侧边栏','选中']
  }],
  rightList:[{
    name:'msg',
    icon:'fa fa-envelope',
    animate:'fade-in-left',
    msg:'3',
    open:'',
    items:[{
      pic:'m1',
      h4:'你有一条新信息',
      p:'请注意查收 '
    },{
      pic:'m2',
      h4:'你有一条新信息',
      p:'请注意查收 '
    },{
      pic:'m3',
      h4:'你有一条新信息',
      p:'请注意查收 '
    },{
      pic:'m4',
      h4:'你有一条新信息',
      p:'请注意查收 '
    }]
  },{
    name:'tips',
    icon:'fa fa-bell',
    animate:'fade-in-up',
    msg:'5',
    open:'',
    items:[{
      pic:'t1',
      h4:'你的系统有更新',
      p:'请升级到最新版本'
    },{
      pic:'t2',
      h4:'你的系统有更新',
      p:'请升级到最新版本'
    },{
      pic:'t3',
      h4:'你的系统有更新',
      p:'请升级到最新版本'
    },{
      pic:'t4',
      h4:'你的系统有更新',
      p:'请升级到最新版本'
    },{
      pic:'t5',
      h4:'你的系统有更新',
      p:'请升级到最新版本'
    }]
  },{
    name:'language',
    icon:'fa fa-html5',
    animate:'fade-in-down',
    msg:'',
    open:'',
    items:[{
      pic:'中',
      h4:'中文',
      p:'简体'
    },{
      pic:'英',
      h4:'English',
      p:'en'
    },{
      pic:'日',
      h4:'Japanese',
      p:'japan'
    }]
  },{
    name:'profile',
    icon:'fa fa-user',
    animate:'fade-in-right',
    msg:'4',
    open:'',
    items:[{
      pic:'用',
      h4:'用户信息',
      p:''
    },{
      pic:'消',
      h4:'消息',
      p:''
    },{
      pic:'设',
      h4:'设置',
      p:''
    },{
      pic:'退',
      h4:'退出',
      p:''
    }]
  }]
};

//rightbarTabs
export const rightbarTabs=[{
  id:'0',
  name:'tab1',
  tabIcon:'fa fa-weibo',
  active:''
},{
  id:'1',
  name:'tab2',
  tabIcon:'fa fa-weixin',
  active:''
},{
  id:'2',
  name:'tab3',
  tabIcon:'fa fa-qq',
  active:''
},{
  id:'3',
  name:'tab4',
  tabIcon:'fa fa-apple',
  active:''
}];
//rightbarTabLists
export const rightbarTabLists=[{
  num:'l1',
  pic:'l1',
  h4:'我想起那天夕阳下的奔跑1111111',
  p:'那是我们逝去的青春',
  rightIcon:'fa fa-hand-o-left'
},{
  num:'l2',
  pic:'l2',
  h4:'我想起那天夕阳下的奔跑',
  p:'那是我们逝去的青春',
  rightIcon:'fa fa-hand-o-left'
},{
  num:'l3',
  pic:'l3',
  h4:'我想起那天夕阳下的奔跑',
  p:'那是我们逝去的青春',
  rightIcon:'fa fa-hand-o-left'
},{
  num:'l4',
  pic:'l4',
  h4:'我想起那天夕阳下的奔跑',
  p:'那是我们逝去的青春',
  rightIcon:'fa fa-hand-o-left'
}];

//tables
export const tableData={
  thead:['ID','青龙','白虎','朱雀','玄武'],
  tbody:[
    [1,'r11','r12','r13','r14'],
    [2,'r21','r22','r23','r24'],
    [3,'r31','r32','r33','r34'],
    [4,'r41','r42','r43','r44'],
    [5,'r51','r52','r53','r54'],
    [6,'r61','r62','r63','r64']
  ]
};

//projectList
export const projectList=[{
  url:'#/',
  title:'project1',
  icon:'fa fa-user'
},{
  url:'#/',
  title:'project2',
  icon:'fa fa-user'
},{
  url:'#/',
  title:'project3',
  icon:'fa fa-user'
},{
  url:'#/',
  title:'project4',
  icon:'fa fa-user'
},{
  url:'#/',
  title:'project5',
  icon:'fa fa-user'
}];














