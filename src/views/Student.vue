<script setup>
import UserCard from '../components/UserCard.vue';
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from "vue-router"
import { collection, query, where, getDocs, onSnapshot, doc, getDoc } from "firebase/firestore"
import db from "../firebase/init.js"
import CourseList from '../components/CourseList.vue'


const students = ref([])

const getAllStudents = async () => {
    students.value = []
    const qry = query(collection(db,"students"))
    const studentsSnap = await getDocs(qry)
    studentsSnap.forEach((student) => {
        let studentdata = student.data();
        studentdata.id = student.id;
        students.value.push(studentdata)
    })
}


onBeforeMount(() => {
    getAllStudents()
})
</script>

<template>
 <UserCard v-for="student in students" :key="student.id" :student="student"/>
</template>

<style scoped>

</style>