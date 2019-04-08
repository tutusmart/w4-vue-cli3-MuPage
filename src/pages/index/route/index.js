import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import App from '../modules/Index.vue';
export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: App,
        }
        ]
})