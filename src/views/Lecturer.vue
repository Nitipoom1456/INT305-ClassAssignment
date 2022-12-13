<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from "vue-router"
import { collection, query, getDocs, orderBy, limit, startAt, endAt, where } from "firebase/firestore"
import db from "../firebase/init.js"
import LecturerCard from '../components/LecturerCard.vue'

const lecturers = ref([])
const state = ref(0)

const getAllLecturers = async () => {
    const qry = query(collection(db, "lecturers"))
    snap(qry)
}

const getBynumOfCourses = async () => {
    const qry = query(collection(db, "lecturers"), orderBy("teaching.courseTeaches","desc"), limit(10))
    snap(qry)
}

const getStartWithA = async () => {
    const qry = query(collection(db, "lecturers"), orderBy("firstname"), startAt("A"), endAt("A\uf8ff"), limit(5))
    snap(qry)
}

const getTeachcs409 = async () => {
    const qry = query(collection(db, "lecturers"), where("teaching.courses","array-contains","cs409"))
    snap(qry)
}


const snap = async (qry) => {
    const lecturersSnap = await getDocs(qry)
    lecturers.value = []
    lecturersSnap.forEach((lecturer) => {
        let lecturerdata = lecturer.data();
        lecturerdata.id = lecturer.id;
        lecturers.value.push(lecturerdata)
    })
}

const changeState = () => {
    if (state.value == 0) {
        getAllLecturers()
        // console.log(state.value);
    }
    else if (state.value == 1) {
        // console.log(state.value);
        getStartWithA()
    }
    else if (state.value == 2) {
        // console.log(state.value);
        getBynumOfCourses()
    }
    else if (state.value == 3) {
        // console.log(state.value);
        getTeachcs409()
    }
    // else {
    //     state.value = 0
    // }
}

watch(() => state.value, changeState)

onBeforeMount(() => {
    state.value = 0
    getAllLecturers()
})



</script>

<template>
    <div class="flex">
        <div class="m-5 min-w-max w-1/2">
            <p class="text-2xl font-bold text-center">Query</p>
            <p class="text-lg cursor-pointer hover:text-blue-600 " @click="state = 0">Get all lecturers.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600 " @click="state = 1">Get lecturer firstname start with
                'A' limit 5</p>
            <p class="text-lg cursor-pointer hover:text-blue-600 " @click="state = 2">Get all lecturer order by number
                of course teaches limit 10.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600 " @click="state = 3">Get all lecturer who teaching 'cs409'.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 items-center  m-5 w-1/2">
            <LecturerCard v-if="state == 0" v-for="lecturer in lecturers" :key="lecturer.id" :lecturer="lecturer" />
            <LecturerCard v-else-if="state == 1" v-for="lecturer in lecturers" :lecturer="lecturer" />
            <LecturerCard v-else-if="state == 2" v-for="lecturer in lecturers" :lecturer="lecturer" />
            <LecturerCard v-else-if="state == 3" v-for="lecturer in lecturers" :lecturer="lecturer" />
        </div>
    </div>
</template>

<style scoped>

</style>