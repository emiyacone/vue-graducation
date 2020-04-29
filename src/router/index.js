import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
import List from '../components/List.vue'
import Listinvoice from '../components/Listinvoice.vue'
import Users from '../components/Users.vue'
import Invoiceconfirm from '../components/invoiceconfirm.vue'
import Stack from '../components/Stack.vue'
import Prodetail from '../components/Prodetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LOGIN',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/listorder',
    children: [
      { path: '/listorder', component: List },
      { path: '/confirmmessage', component: Invoiceconfirm },
      { path: '/listinvoice', component: Listinvoice },
      { path: '/usermanage', component: Users },
      { name: 'StackNo', path: '/stackno', component: Stack },
      { name: 'ProDetail', path: '/prodetail', component: Prodetail }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
