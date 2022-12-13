<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from "vue-router"
import { collection, query, where, getDocs, getCountFromServer, orderBy, startAt, endAt, limit } from "firebase/firestore"
import db from "../firebase/init.js"
import CourseList from '../components/CourseList.vue'
import AggResult from '../components/AggResult.vue'


const courses = ref([])
const state = ref(0)
const aggData = ref(0)

const getAllCourse = async () => {
    const qry = query(collection(db, "courses"))
    snap(qry)
}

const getStartWithcs = async () => {
    const qry = query(collection(db, "courses"), orderBy("courseId"), startAt("cs"), endAt("cs\uf8ff"), limit(3))
    snap(qry)
}


const snap = async (qry) => {
    const coursesSnap = await getDocs(qry)
    courses.value = []
    coursesSnap.forEach((course) => {
        let coursedata = course.data();
        coursedata.id = course.id;
        courses.value.push(coursedata)
    })
}

const getNumCredit3 = async () => {
    const coll = collection(db, "courses");
    const query_ = query(coll, where('credit', '==', 3));
    const snapshot = await getCountFromServer(query_);
    aggData.value = snapshot.data().count
}


onBeforeMount(() => {
    getAllCourse()
})

const changeState = () => {
    if(state.value == 1){
        getNumCredit3()
    }
    if(state.value == 2){
        getStartWithcs()
    }
}

watch(() => state.value, changeState)

</script>

<template>
    <div class="flex">
        <div class="m-5 min-w-max w-1/2">
            <p class="text-2xl font-bold text-center">Query</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 0">Get all courses.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 1">Get number of courses that have 3 credit.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 2">Get courses are course id start with 'cs' limit 3.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 items-center  m-5 w-1/2">
            <CourseList v-if="state == 0" v-for="course in courses" :key="course.id" :course="course" />
            <AggResult v-else-if="state == 1" :data="aggData" />
            <CourseList v-if="state == 2" v-for="course in courses"  :course="course" />
        </div>
    </div>
</template>

<style scoped>

</style>