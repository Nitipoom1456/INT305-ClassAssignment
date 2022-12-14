<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { collection, query, getDocs, orderBy, limit, startAt, endAt, where } from "firebase/firestore"
import db from "../firebase/init.js"
import LecturerCard from '../components/LecturerCard.vue'
import cardDetails from '../components/cardDetails.vue'

const lecturers = ref([])
const currLecturer = ref({})
const state = ref(0)
const detail = ref(false)

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
    }
    else if (state.value == 1) {
        getStartWithA()
    }
    else if (state.value == 2) {
        getBynumOfCourses()
    }
    else if (state.value == 3) {
        getTeachcs409()
    }
}

watch(() => state.value, changeState)

onBeforeMount(() => {
    state.value = 0
    getAllLecturers()
})

const showDetail = (lec) => {
    detail.value = !detail.value
    currLecturer.value = lec
}

</script>

<template>
    <div class="flex">
        <div class="m-5 min-w-max w-1/2">
            <p class="text-2xl font-bold text-center">Lecturer Query</p>
            <p class="text-lg cursor-pointer hover:text-blue-600 " @click="state = 0;detail = false">Get all lecturers.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600 " @click="state = 1;detail = false">Get lecturer firstname start with
                'A' limit 5</p>
            <p class="text-lg cursor-pointer hover:text-blue-600 " @click="state = 2;detail = false">Get all lecturer order by number
                of course teaches limit 10.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600 " @click="state = 3;detail = false">Get all lecturer who teaching 'cs409'.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 items-center  m-5 w-1/2">
            <LecturerCard v-if="state == 0 && detail == false" v-for="lecturer in lecturers" :key="lecturer.id" :lecturer="lecturer" @delete-lecturer="getAllLecturers()" @detail="showDetail" />
            <LecturerCard v-else-if="state == 1 && detail == false" v-for="lecturer in lecturers" :lecturer="lecturer" @delete-lecturer="getStartWithA()" @detail="showDetail" />
            <LecturerCard v-else-if="state == 2 && detail == false" v-for="lecturer in lecturers" :lecturer="lecturer" @delete-lecturer="getBynumOfCourses()" @detail="showDetail" />
            <LecturerCard v-else-if="state == 3 && detail == false" v-for="lecturer in lecturers" :lecturer="lecturer" @delete-lecturer="getTeachcs409()" @detail="showDetail" />
            <cardDetails v-if="detail" :data="currLecturer" @go-back="detail = !detail" />
        </div>
    </div>
</template>

<style scoped>

</style>