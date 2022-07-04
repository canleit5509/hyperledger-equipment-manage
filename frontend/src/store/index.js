import Vue from "vue"
import Vuex from "vuex"
import AuthStore from "../store/module/auth"
import Profile from "../store/module/profile"
import User from '../store/module/user'
import Campaign from '../store/module/campaign'
import Validation from '../store/module/validation'
import ErrorMessage from '../store/module/errorMessage'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        AUTH: AuthStore,
        PROFILE: Profile,
        USER: User,
        CAMPAIGN:Campaign,
        VALIDATION: Validation,
        ERROR: ErrorMessage
    }
})