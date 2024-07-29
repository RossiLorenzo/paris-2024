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
  components: { Schedule, Medals },
  data() {
    return {
      country: 'ITA'
    };
  },
  mounted() {
    // Set Schedule
    document.getElementById('schedule_section').classList.remove('collapse');
    document.querySelector('label[for="' + 'schedule' +'"]').style.backgroundColor = "#344767";
    document.querySelector('label[for="' + 'schedule' +'"]').style.color = "white";
    document.querySelector('label[for="' + 'schedule' +'"]').style.opacity = "1";
    // Set Country
    document.querySelector('label[for="' + 'ITA' +'"]').style.backgroundColor = "#344767";
    document.querySelector('label[for="' + 'ITA' +'"]').style.color = "white";
    document.querySelector('label[for="' + 'ITA' +'"]').style.opacity = "1";
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
    },
    setCountry(c) {
      const countries = ['ITA', 'GBR'];
      for (var i = 0; i < countries.length; i++) {
        if(countries[i] != c){
          document.querySelector('label[for="' + countries[i] +'"]').style.backgroundColor = "white";
          document.querySelector('label[for="' + countries[i] +'"]').style.color = "#344767";
          document.querySelector('label[for="' + countries[i] +'"]').style.opacity = "1";  
        }
        else{
          document.querySelector('label[for="' + countries[i] +'"]').style.backgroundColor = "#344767";
          document.querySelector('label[for="' + countries[i] +'"]').style.color = "white";
          document.querySelector('label[for="' + countries[i] +'"]').style.opacity = "1";
          this.country = c;
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
      <div class="col-7 mx-auto">
        <div class="btn-group" role="group" aria-label="Section">
          <input type="radio" class="btn-check" name="btnradio" id="schedule" @click="setView('schedule')" checked>
          <label class="btn btn-outline-dark" for="schedule" style="padding: 0.5rem !important;">📅 Schedule</label>
          <input type="radio" class="btn-check" name="btnradio" id="medals" @click="setView('medals')">
          <label class="btn btn-outline-dark" for="medals" style="padding: 0.5rem !important;">🏅 Medals</label>
        </div>
      </div>
      <div class="col-4 mx-auto">
        <div class="btn-group" role="group" aria-label="Section">
          <input type="radio" class="btn-check" name="btnradio" id="ITA" @click="setCountry('ITA')" checked>
          <label class="btn btn-outline-dark" for="ITA" style="padding: 0.5rem !important;">🇮🇹</label>
          <input type="radio" class="btn-check" name="btnradio" id="GBR" @click="setCountry('GBR')">
          <label class="btn btn-outline-dark" for="GBR" style="padding: 0.5rem !important;">🇬🇧</label>
        </div>
      </div>
      <div class="col-1 mx-auto" />
    </div>
  </div>
  <Schedule id='schedule_section' :country="country"/>
  <Medals id='medals_section' :country="country" class='collapse'/>
</template>
