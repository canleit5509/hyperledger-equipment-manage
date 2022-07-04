import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from "vuelidate";
import Datepicker from "vuejs-datepicker";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import Toasted from 'vue-toasted';
import interceptors from './helper/interceptors'
import JsonExcel from "vue-json-excel";
Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Datepicker);
Vue.use(Toasted, {
    type: 'center',
    duration: 3000,
    wordWrap: true,
    width: '150px'
})
// Vue.use(ModalPlugin);
Vue.use(Datetime);
Vue.use(JsonExcel);

new Vue({
  router,
  store,
  interceptors,
  render: h => h(App)
}).$mount('#app')
