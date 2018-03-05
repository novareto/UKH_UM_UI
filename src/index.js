import Vue from 'vue';
import App from './components/App.vue';
import Search from './components/Search.vue';
import Add from './components/Add.vue';
import Edit from './components/Edit.vue';
import List from './components/List.vue';
import Personal from './components/Personal.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';
import auth from './auth'

import axios from 'axios';
import VueFormGenerator from "vue-form-generator";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


// Check the users auth status when the app starts
auth.checkAuth()

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueFormGenerator);

const routes = [
    { path: '/search', component: Search },
    { path: '/add', component: Add },
    { path: '/list', component: List },
    { path: '/personal', component: Personal },
    { path: '/edit/:id', component: Edit },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '*', redirect: '/search' }
]

export const router = new VueRouter({
    routes
})

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
