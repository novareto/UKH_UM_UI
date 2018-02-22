import Vue from 'vue';
import App from './components/App.vue';
import Search from './components/Search.vue';
import Add from './components/Add.vue';
import List from './components/List.vue';
import Personal from './components/Personal.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';
import auth from './auth'

import axios from 'axios';
import FormSchema from 'vue-json-schema'
import ElementUI from 'element-ui'
import {
  Form,
  FormItem,
  Input,
  Radio,
  Checkbox,
  Select,
  Option,
  Button
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

FormSchema.setComponent('label', FormItem)
FormSchema.setComponent('email', Input)
FormSchema.setComponent('text', Input)
FormSchema.setComponent('textarea', Input)
FormSchema.setComponent('password', Input)
FormSchema.setComponent('checkbox', Checkbox)
FormSchema.setComponent('radio', Radio)
FormSchema.setComponent('select', Select)
FormSchema.setComponent('option', Option)

// Use the third argument to define props of the component
FormSchema.setComponent('button', Button, {
  type: 'primary',
  label: 'Subscribe'
})

// The third argument can also be a function that return an object
FormSchema.setComponent('form', Form, ({ vm }) => {
  // vm is the FormSchema VM

  const labelWidth = '120px'
  const model = vm.data
  const rules = {}

  vm.fields.forEach((field) => {
    rules[field.name] = {
      required: field.required,
      message: field.title
    }
  })

  // returning the form props
  return { labelWidth, rules, model }
})

// Check the users auth status when the app starts
auth.checkAuth()

Vue.use(VueRouter)
Vue.use(ElementUI, { locale })
Vue.component('form-schema', FormSchema)

const routes = [
    { path: '/search', component: Search },
    { path: '/add', component: Add },
    { path: '/list', component: List },
    { path: '/personal', component: Personal },
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
