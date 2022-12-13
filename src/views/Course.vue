<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from "vue-router"
import { collection, query, where, getDocs, getCountFromServer } from "firebase/firestore"
import db from "../firebase/init.js"
import CourseList from '../components/CourseList.vue'
import AggResult from '../components/AggResult.vue'


const courses = ref([])
const state = ref(0)
const aggData = ref(0)

const getAllCourse = async () => {
    courses.value = []
    const qry = query(collection(db, "courses"))
    snap(qry)
}

const snap = async (qry) => {
    const coursesSnap = await getDocs(qry)
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
}

watch(() => state.value, changeState)

</script>

<template>
    <div class="flex">
        <div class="m-5 min-w-max w-1/2">
            <p class="text-2xl font-bold text-center">Query</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 0">Get all courses.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 1">Get number of courses that have 3 credit.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 items-center  m-5 w-1/2">
            <CourseList v-if="state == 0" v-for="course in courses" :key="course.id" :course="course" />
            <AggResult v-else-if="state == 1" :data="aggData" />
        </div>
    </div>
</template>

<style scoped>

</style>