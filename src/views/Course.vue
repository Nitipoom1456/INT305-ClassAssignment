<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from "vue-router"
import { collection, query, where, getDocs, onSnapshot, doc, getDoc } from "firebase/firestore"
import db from "../firebase/init.js"
import CourseList from '../components/CourseList.vue'


const courses = ref([])

const getAllCourse = async () => {
    courses.value = []
    const qry = query(collection(db,"courses"))
    const coursesSnap = await getDocs(qry)
    coursesSnap.forEach((course) => {
        let coursedata = course.data();
        coursedata.id = course.id;
        courses.value.push(coursedata)
    })
}


onBeforeMount(() => {
    getAllCourse()
})


</script>

<template>
 <div class="flex">
  <div class="m-5 max-w-min w-1/2">
   <p class="text-2xl font-bold">query</p>
   <p class="text-lg ">Get all coursessssssssssssssssssssssssssssssssssssssssssssssssssss.</p>
   <p class="text-lg ">Get all coursessssssssssssssssssssssssssssss.</p>
  </div>
  <div class="grid grid-cols-2 gap-4 items-center space-y-2 m-5 w-1/2">
  <!-- <div class="flex flex-wrap items-center space-y-2 m-5 max-w-fit "> -->
   <CourseList v-for="course in courses" :key="course.id" :course="course"/>
  </div>
 </div>
</template>

<style scoped>

</style>