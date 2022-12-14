<script setup>
import StudentCard from '../components/StudentCard.vue';
import { ref, onBeforeMount, watch } from 'vue'
import { collection, query, where, getDocs, getCountFromServer, orderBy } from "firebase/firestore"
import db from "../firebase/init.js"
import StudentAdd from '../components/StudentAdd.vue';
import aggResult from '../components/aggResult.vue';
import cardDetails from '../components/cardDetails.vue';

const students = ref([])
const currStudent = ref({})
const state = ref(0)
const detail = ref(false)
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
    const qry = query(collection(db, "students"), where("courseRegistered", "in", [['int205', 'int105'], ['int105', 'int205']]))
    snap(qry)
}

const getUkbyFname = async () => {
    const qry = query(collection(db, "students"), where("nation", "==", "United Kingdom"), orderBy("firstname"))
    snap(qry)
}

const snap = async (qry) => {
    const studentsSnap = await getDocs(qry)
    students.value = []
    studentsSnap.forEach(async (student) => {
        let studentdata = student.data();
        studentdata.id = student.id;
        const q2 = query(collection(db, "students", student.id, "transcrips"))
        const trancriptsSnap = await getDocs(q2)
        studentdata.trancripts = []
        trancriptsSnap.forEach((trancript) => {
            let trancriptdata = trancript.data();
            trancriptdata.id = trancript.id;
            studentdata.trancripts.push(trancriptdata)
        })
        students.value.push(studentdata)
    })
    console.log(students.value);
}

onBeforeMount(() => {
    state.value = 0
    getAllStudents()
})

const changeState = () => {
    if (state.value == 0) {
        getAllStudents()
    }
    else if (state.value == 2) {
        getWhoRegiscs101()
    }
    else if (state.value == 3) {
        getnumITGrad()
    }
    else if (state.value == 4) {
        getWhoRegisint105andint205()
    }
    else if (state.value == 5) {
        getUkbyFname()
    }
}

watch(() => state.value, changeState)

const showDetail = (stu) => {
    detail.value = !detail.value
    currStudent.value = stu
}
</script>

<template>
    <div class="flex">
        <div class="m-5 min-w-max w-1/2">
            <p class="text-2xl font-bold text-center">Student Query</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 0;detail = false">Get all students.
            </p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 1;detail = false">Add student.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 2;detail = false">Get all student that
                registed 'cs101'.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 3;detail = false">Get number of
                students that major is Information Technology and Already graduated.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 4;detail = false">Get students that
                have only registered int105 and int205.</p>
            <p class="text-lg cursor-pointer hover:text-blue-600" @click="state = 5;detail = false">Get students are nation is United Kingdom sort by firstname.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 items-center  m-5 w-1/2">
            <StudentCard v-if="state==0 && detail == false" v-for="student in students" :key="student.id"
                :student="student" @delete-student="getAllStudents()" @detail="showDetail" />
            <StudentAdd v-else-if="state==1 && detail == false" />
            <StudentCard v-else-if="state==2 && detail == false" v-for="student in students" :student="student"
                @delete-student="getWhoRegiscs101()" @detail="showDetail" />
            <aggResult v-else-if="state==3 && detail == false" :data="aggData" />
            <StudentCard v-else-if="state==4 && detail == false" v-for="student in students" :student="student"
                @delete-student="getWhoRegisint105andint205()" @detail="showDetail" />
            <StudentCard v-else-if="state==5 && detail == false" v-for="student in students" :student="student"
                @delete-student="getUkbyFname()" @detail="showDetail" />
            <cardDetails v-if="detail" :data="currStudent" @go-back="detail = !detail" />
        </div>
    </div>
</template>

<style scoped>

</style>