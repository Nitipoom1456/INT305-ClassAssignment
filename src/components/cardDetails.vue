<script setup>

const props = defineProps({
    data: Object,
    require: true,
})
const emit = defineEmits(['go-back'])

</script>

<template>
    <div>
        <p class="font-bold text-center text-2xl">Detail</p>
        <p class="text-lg" v-for="ele in Object.keys(data)" :key="ele">{{ele}}: {{data[ele]}}</p>
        <button type="submit" @click="$emit('go-back')"
            class="text-blue-700 underline underline-offset-2 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Back</button>

    </div>

</template>

<style scoped>

</style>