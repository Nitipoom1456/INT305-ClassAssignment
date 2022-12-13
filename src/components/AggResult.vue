<script setup>
defineProps({
  data: {
    type: Number,
    reqired: true,
  },
});
</script>

<template>
    <div>
        <div>
            <p class="text-2xl font-bold text-center">Result</p>
        </div>
        <div>
            <p>{{data}}</p>
        </div>
    </div>


</template>

<style scoped>

</style>