<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import Header from "../../components/Header.vue";

// sections
import Schedule from "./Sections/Schedule.vue";

//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
</script>

<template>
  <Header>
    <div class="page-header min-vh-35" :style="`background-image: url(${vueMkHeader})`" loading="lazy" />
  </Header>
  <Schedule />
</template>
