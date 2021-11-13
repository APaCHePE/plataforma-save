import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
  const routes = [
  {
   // path: '/:id',
    path: '/',
    name: 'Home',
    component: () => import('../views/customer/Home.vue')
  },
  
  {
    path: '/consult',
    name: 'Consult',
    component: () => import('../views/customer/Consult.vue')
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () => import('../views/customer/panel/question/ListQuestion.vue')
  },
  {
    path: '/panel/misCitas',
    name: 'misCitas',
    component: () => import('../views/customer/panel/CitasCliente.vue')
  },
  {
    path: '/panel/detail-question/:id',
    name: 'DetailQuestion',
    component: () => import('../views/customer/panel/question/DetailQuestion.vue')
  },
  {
    path: '/panel/cita-question/:id',
    name: 'CitaQuestion',
    component: () => import('../views/customer/panel/question/CitaQuestion.vue')
  },
  {
    path: '/active/:id',
    name: 'ActiveEmail',
    component: () => import('../views/shared/ActiveEmail.vue')
  },
  {
    path: '/lawyer',
    name: 'HomeLawyer',
    component: () => import('../views/lawyer/Home.vue')
  },
  {
    path: '/text/:id',
    name: 'HomeText',
    component: () => import('../views/lawyer/Text.vue'),
    props: true
  },
  {
    path: '/cita/:id',
    name: 'citaAsesoria',
    component: () => import('../views/cita/cita.vue')
  },
  {
    path: '/listHorario',
    name: 'listHorario',
    component: () => import('../views/cita/listHorario.vue')
  },
  {
    path: '/horario',
    name: 'horarioAsesoria',
    component: () => import('../views/cita/Horario.vue')
  },
  {
    path: '/:hash',
    name: 'Home',
    component: () => import('../views/customer/Home.vue')
  },
  {
    path: '/lawyer/:hash',
    name: 'HomeLawyer',
    component: () => import('../views/lawyer/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
