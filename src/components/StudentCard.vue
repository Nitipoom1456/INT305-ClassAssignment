<script setup>
import { ref } from "vue";
import { doc, deleteDoc } from "firebase/firestore"
import db from "../firebase/init.js"

defineProps({
    student: Object,
    require: true,
})
const emit = defineEmits(['delete-student'])

const deleteStudent = async (id) => {
    const res = await deleteDoc(doc(db, "students", id));
    emit('delete-student')
}

// const onToggle = ref(false)

</script>

<template>

    <div
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center py-10">
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ student.firstname }}
                {{ student.lastname }}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ student.Major }}</span>
            <div class="flex mt-4 space-x-3 md:mt-6">
                <button  type="button"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Details</button>
                <button @click="deleteStudent(student.id)" type="button"
                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
            </div>
        </div>
    </div>

    

    
</template>

<style scoped>

</style>