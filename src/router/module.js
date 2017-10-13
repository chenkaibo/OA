export default [{
  // 主页
  path: '/home',
  component: (resolve) => {
    require(['../view/Home.vue'], resolve)
  }
}, {
  // 员工管理
  path: '/staff',
  component: (resolve) => {
    require(['../view/Staff/Staff.vue'], resolve)
  }
}, {
  // 日报管理
  path: '/daily',
  redirect: '../view/Daily/Daily.vue'
}, {
  // 绩效管理
  path: '/performance',
  component: (resolve) => {
    require(['../view/Performance/Performance.vue'], resolve)
  }
}, {
  // 时间管理
  path: '/time',
  component: (resolve) => {
    require(['../view/Time/Time.vue'], resolve)
  }
}]
