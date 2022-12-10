import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import Lecturer from '../views/Lecturer.vue'
import Student from '../views/Student.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/course', name: 'course', component: Course },
    { path: '/lecturer', name: 'lecturer', component: Lecturer },
    { path: '/student', name: 'student', component: Student },
  ]
})

export default router

