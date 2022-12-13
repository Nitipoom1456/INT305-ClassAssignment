<script setup>
import StudentCard from '../components/StudentCard.vue';
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from "vue-router"
import { collection, query, where, getDocs, getCountFromServer } from "firebase/firestore"
import db from "../firebase/init.js"
import StudentAdd from '../components/StudentAdd.vue';
import aggResult from '../components/aggResult.vue';

const students = ref([])
const state = ref(0)
const aggData = ref(0)

const getAllStudents = async () => {
    const qry = query(collection(db, "students"))
    snap(qry)
}

const getWhoRegiscs101 = async () => {
    const qry = query(collection(db, "students"), where("courseRegistered", "array-contains", "cs101"))
    snap(qry)
}

const getnumITGrad = async () => {
    const qry = query(collection(db, "students"), where("graduated", "==", true), where("Major", "==", "Information Technology"))
    const snapshot = await getCountFromServer(qry);
    aggData.value = snapshot.data().count
}

const getWhoRegisint105andint205 = async () => {
    const qry = query(collection(db, "students"), where("courseRegistered", "in", [['int205','int105'],['int105','int205']]))
    snap(qry)
}


const snap = async (qry) => {
    const studentsSnap = await getDocs(qry)
    students.value = []
    studentsSnap.forEach((student) => {
        let studentdata = student.data();
        studentdata.id = student.id;
        students.value.push(studentdata)
    })
}



onBeforeMount(() => {
    state.value = 0
    getAllStudents()
})

const changeState = () => {
    if(state.value == 0){
        getAllStudents()
    }
    else if(state.value == 2){
        getWhoRegiscs101()
    }
    else if(state.value == 3){
        getnumITGrad()
    }
    else if(state.value == 4){
        getWhoRegisint105andint205()
    }
}

watch(() => state.value, changeState)


</script>

<template>
    <div class="flex">
        <div class="m-5 min-w-max w-1/2">
            <p class="text-2xl font-bold text-center">Query</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 0">Get all students.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 1">Add student.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 2">Get all student that registed 'cs101'.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 3">Get number of students that major is Information Technology and Already graduated.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 4">Get students that have registered int105 and int205.</p>
            <!-- <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 5">Get students that have registered int105 and int205.</p> -->
        </div>
        <div class="grid grid-cols-2 gap-4 items-center  m-5 w-1/2">
            <StudentCard v-if="state==0" v-for="student in students" :key="student.id" :student="student" @delete-student="getAllStudents()" />
            <StudentAdd v-else-if="state==1" />
            <StudentCard v-else-if="state==2" v-for="student in students" :student="student" @delete-student="getWhoRegiscs101()" />
            <aggResult v-else-if="state==3" :data="aggData" />
            <StudentCard v-else-if="state==4" v-for="student in students" :student="student" @delete-student="getWhoRegisint105andint205()" />
        </div>
    </div>
</template>

<style scoped>

</style>