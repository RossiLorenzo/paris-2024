<script setup>
import { onMounted, onUnmounted } from "vue";

// Components
import Header from "../../components/Header.vue";

// sections
import Schedule from "./Sections/Schedule.vue";
import Medals from "./Sections/Medals.vue";

//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
</script>

<script>
export default {
  mounted() {
    document.getElementById('schedule_section').classList.remove('collapse');
    document.querySelector('label[for="' + 'schedule' +'"]').style.backgroundColor = "#344767";
    document.querySelector('label[for="' + 'schedule' +'"]').style.color = "white";
    document.querySelector('label[for="' + 'schedule' +'"]').style.opacity = "1";
  },
  methods: {
    setView(s) {
      const pages = ['schedule', 'medals'];
      for (var i = 0; i < pages.length; i++) {
        if(pages[i] != s){
          document.getElementById(pages[i] + '_section').classList.add('collapse');
          document.querySelector('label[for="' + pages[i] +'"]').style.backgroundColor = "white";
          document.querySelector('label[for="' + pages[i] +'"]').style.color = "#344767";
          document.querySelector('label[for="' + pages[i] +'"]').style.opacity = "1";  
        }
        else{
          document.getElementById(pages[i] + '_section').classList.remove('collapse');
          document.querySelector('label[for="' + pages[i] +'"]').style.backgroundColor = "#344767";
          document.querySelector('label[for="' + pages[i] +'"]').style.color = "white";
          document.querySelector('label[for="' + pages[i] +'"]').style.opacity = "1";
        }
      }
    }
  }
};
</script>

<template>
  <Header>
    <div class="page-header min-vh-35" :style="`background-image: url(${vueMkHeader})`" loading="lazy" />
  </Header>

    <div class="container mt-3">
      <div class="row justify-space-between text-center py-2">
        <div class="col-12 mx-auto">
        <div class="btn-group" role="group" aria-label="Section">
          <input type="radio" class="btn-check" name="btnradio" id="schedule" 
            @click="setView('schedule')" checked>
          <label class="btn btn-outline-dark" for="schedule" style="padding: 0.5rem !important;">🇮🇹 Schedule</label>

          <input type="radio" class="btn-check" name="btnradio" id="medals"
            @click="setView('medals')">
          <label class="btn btn-outline-dark" for="medals" style="padding: 0.5rem !important;">🏅 Medals</label>
        </div>
        </div>
      </div>
    </div>

  <Schedule id='schedule_section'/>
  <Medals id='medals_section' class='collapse' />
</template>
