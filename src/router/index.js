import Vue from 'vue'
import VueRouter from 'vue-router'
import otherModuleRoutes from './module'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(VueRouter)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Hello',
//       component: HelloWorld
//     }
//   ]
// })
const routes = [{
  path: '/',
  component: (resolve) => {
    import('../components/BScontainer.vue').then(resolve)
  },
  children: [{
    path: 'login',
    component: (resolve) => {
      require(['../view/Auth/Login.vue'], resolve)
    },
    meta: {
      skipAuth: true
    }
  }, {
    path: '/',
    component: (resolve) => {
      require(['../view/CommonView.vue'], resolve)
    },
    children: [
      ...otherModuleRoutes, {
        path: '/',
        redirect: '/home'
      }
    ]
  }]
}, {
  path: '*',
  component: {
    render (h) {
      return h('div', {
        staticClass: 'flex flex-main-center',
        attrs: {
          style: 'width:100%;font-size:32px'
        }
      }, '未找到哦')
    }
  }
}]

const router = new VueRouter({
  linkActiveClass: 'active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

// export function hook(userPromise) {
//   router.beforeEach((to, from, next) => {
//     store.commit('SET_ROUTE_STATE', to.path)
//       // 确保用户身份信息已获取
//     store.dispatch('changeRouteLoading', true).then(() => {
//       // has logged in, reject
//       if (to.path === '/login' && store.getters.loggedIn) {
//         return next(false)
//       }
//       if (!to.meta.skipAuth) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         if (!store.getters.loggedIn) {
//           next({
//             path: '/login',
//             query: {
//               redirect: to.fullPath
//             }
//           })
//         } else {
//           var jurisdiction = read('themelistFlag').split(',')
//           var splitPath = to.path.split('/')[1]
//           var splitPathTwo = '/' + to.path.split('/')[1] + '/' + to.path.split('/')[2]
//           if (to.path === '/') {
//             next({
//               path: read('homeRoute')
//             })
//           } else {
//             if (to.path === '/home' && jurisdiction.indexOf('homePage') >= 0) {
//               next()
//             } else if (to.path === '/map' && read('arrsecurityMonitor') && JSON.parse(read('arrsecurityMonitor')).indexOf('map') >= 0) {
//               next()
//             } else if (urlArg[splitPath] && read('arr' + ormmap[splitPath]) && JSON.parse(read('arr' + ormmap[splitPath])).indexOf(urlArg[splitPath][splitPathTwo]) > -1) {
//               next()
//             } else if (to.path === '/nojurisdiction' || to.path === '/log' || to.path === '*' || to.path === '/demo' || to.path === '/login' || to.path === '/journal' || to.path === '/map/main') {
//               next()
//             } else {
//               next({
//                 path: read('homeRoute')
//               })
//             }
//           }
//         }
//       } else {
//         next()
//       }
//     })
//   })

//   router.afterEach(() => {
//     store.dispatch('changeRouteLoading', false)
//   })
// }

export default router
