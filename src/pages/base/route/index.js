import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import App from '../modules/Base.vue';
export default new Router({
    routes: [
        {
            path: '/',
            name: 'TroublelistQuery',
            component: App,
        }
        ]
})