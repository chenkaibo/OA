import Vue from 'vue'
import Vuex from 'vuex'
import routeLoading from './modules/route'
import config from './modules/global-config'
import user from './modules/user'
import pagination from './modules/page'
import playback from './modules/playback'
import preview from './modules/preview'
import mapConfig from './modules/map/mapConfig'
import mapData from './modules/map/mapData'
import localConfig from './modules/localConfig.api'
import orgSetting from './modules/orgSetting'
import equipment from './modules/equipment'
import resource from './modules/resource'
import vehicle from './modules/vehicle'
import orgConfig from './modules/alarmManage/orgConfig'
import sortShow from './modules/alarmManage/sortShow'
import timeTemplate from './modules/alarmManage/timeTemplate'
import paramsSetting from './modules/alarmManage/paramsSetting'
import videoManage from './modules/videoManange'
import userManage from './modules/userManage'
import roleManage from './modules/roleManage'
import tvwall from './modules/tvwall'
import videoOrg from './modules/videoOrg'
import platform from './modules/platform'
import warningCount from './modules/warning/warningCount'
import warningDispose from './modules/warning/warningDispose'
import dict from './modules/dict'
import face from './modules/face'
import security from './modules/security'
import homePage from './modules/homepage'
import query from './modules/query'
import structure from './modules/structure'
Vue.use(Vuex)

let plugin = null

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    homePage,
    user,
    config,
    routeLoading,
    pagination,
    playback,
    mapConfig,
    mapData,
    videoManage,
    localConfig,
    preview,
    equipment,
    security,
    resource,
    vehicle,
    orgConfig,
    sortShow,
    timeTemplate,
    paramsSetting,
    userManage,
    roleManage,
    orgSetting,
    tvwall,
    videoOrg,
    platform,
    warningCount,
    dict,
    face,
    warningDispose,
    query,
    structure
  },
  getters: {
    plugin() {
      return plugin
    }
  },
  mutations: {
    SET_PLUGIN(state, pl) {
      plugin = pl
    }
  }
})

export default store
