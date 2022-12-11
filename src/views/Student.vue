<script setup>
import UserCard from '../components/UserCard.vue';
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from "vue-router"
import { collection, query, where, getDocs, onSnapshot, doc, getDoc } from "firebase/firestore"
import db from "../firebase/init.js"
import StudentAdd from '../components/StudentAdd.vue';

const students = ref([])
const state = ref(0)

const getAllStudents = async () => {
    students.value = []
    const qry = query(collection(db, "students"))
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
    <div class="flex">
        <div class="m-5 min-w-max w-1/2">
            <p class="text-2xl font-bold">Query</p>
            <p class="text-lg cursor-pointer" @click="state = 0" >Get all students.</p>
            <p class="text-lg cursor-pointer" @click="state = 1">Add student.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 items-center  m-5 w-1/2">
            <UserCard v-if="state==0" v-for="student in students" :key="student.id" :student="student" />
            <StudentAdd v-else-if="state==1" />
        </div>
    </div>
</template>

<style scoped>

</style>