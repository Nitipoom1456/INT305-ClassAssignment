<script setup>
import { ref, onBeforeMount } from 'vue'
import { doc, setDoc, Timestamp, query, collection, getDocs } from "firebase/firestore"
import db from "../firebase/init.js"

const fname = ref("")
const lname = ref("")
const year = ref(1)
const major = ref("")
const dob = ref("")
const courseRegis = ref([])
const courses = ref([])
const nation = ref("")
const gpax = ref(0)
const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


const getAllCourse = async () => {
    courses.value = []
    const qry = query(collection(db, "courses"))
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

const addStudent = async () => {
    await setDoc(doc(db, "students", fname.value.toLowerCase() + lname.value.toLowerCase()), {
        firstname: fname.value,
        lastname: lname.value,
        Major: major.value,
        Year: year.value,
        dob: Timestamp.fromDate(new Date(dob.value)),
        courseRegistered: courseRegis.value,
        graduated: false
    });
    clearValue()
    window.location.reload()
}

const clearValue = () => {
    fname.value = ""
    lname.value = ""
    major.value = ""
    year.value = 1
    dob.value = ""
    courseRegis.value = []
}


</script>

<template>
    <div>

        <div>
            <p class="text-2xl font-bold text-center">Add Student</p>
        </div>

        <div class="mt-5">
            <div class="mb-6">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Firstname</label>
                <input type="text" id="base-input" v-model="fname" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-6">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Lastname</label>
                <input type="text" id="base-input" v-model="lname" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-6">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Major</label>
                <input type="text" id="base-input" v-model="major" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-6">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Year</label>
                <input type="number" id="base-input" v-model="year" min="1" max="8" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-6">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Date of birth</label>
                <input type="datetime-local" id="base-input" v-model="dob" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-6">
                <label for="countries_multiple" class="block mb-2 text-sm font-medium text-gray-900">Nation</label>
                <select id="countries_multiple" v-model="nation" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option v-for="nation in country_list" :key="nation" :value="nation">{{ nation }}</option>
                </select>
            </div>
            <div class="mb-6">
                <label for="countries_multiple" class="block mb-2 text-sm font-medium text-gray-900">Select an
                    courses (Hold ctrl to choose multiple)</label>
                <select multiple id="countries_multiple" v-model="courseRegis" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.id }}</option>
                </select>
            </div>
            <div class="mb-6">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">GPAX</label>
                <input type="number" id="base-input" v-model="gpax" min="0" max="4" step=".01" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>


            <div class="flex space-x-5">
                <button type="submit" @click="addStudent()"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Save</button>
                <button type="submit" @click="clearValue()"
                    class="text-blue-700 underline underline-offset-2 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Clear</button>

            </div>
        </div>
    </div>

</template>

<style scoped>

</style>