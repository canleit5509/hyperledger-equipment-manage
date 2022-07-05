import Vue from "vue"
import Vuex from "vuex"
import AuthStore from "./module/auth"
import Profile from "./module/profile"
import User from './module/user'
import Campaign from './module/campaign'
import Validation from './module/validation'
import ErrorMessage from './module/errorMessage'
import myEquipment from './module/myequipment'
import equipment from './module/equipment'
import myRequests from './module/myRequest'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        AUTH: AuthStore,
        PROFILE: Profile,
        USER: User,
        CAMPAIGN:Campaign,
        VALIDATION: Validation,
        ERROR: ErrorMessage,
        MYEQUIPMENT: myEquipment,
        EQUIPMENT: equipment,
        REQUEST: myRequests
    }
})