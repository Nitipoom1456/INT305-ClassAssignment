<script setup>
defineProps({
  course: Object,
  require: true,
})
</script>

<template>

  <div
    class="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-md md:max-h-48 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <!-- <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://picsum.photos/200" alt=""> -->
    <div class="flex flex-col justify-between p-4 leading-normal">
      <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ course.courseName }}</h5>
      <h6 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">course id: {{ course.courseId }}
      </h6>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ course.courseDescription }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>