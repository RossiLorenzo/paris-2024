<script setup>
//APIs & Utilities
import get_schedule from "@/assets/js/get_schedule.js";
import clean_schedules from "@/assets/js/clean_schedules.js";
// Components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";
</script>

<script>
export default {
  data() {
    return {
      schedule: [],
      athletes: [],
      loading: true,
      selectedDate: new Date().toISOString().slice(0, 10)
    };
  },
  async mounted() {
    console.log('Hello!')
    console.log(new Date().toISOString().slice(0, 10));
    console.log(this.selectedDate);
    // Get Schedules and Athletes
    const schedule = await get_schedule(this.selectedDate);
    // const schedule = await get_schedule("2024-07-27");
    this.schedule = clean_schedules(schedule);
    // Loading completed
    this.loading = false;

    // Reload the data 
    setInterval(async () => {
      const schedule = await get_schedule(this.selectedDate);
      this.schedule = clean_schedules(schedule);
    }, 60000)
  },
  methods: {
    async updateSelectedDate(direction) {
      this.loading = false;
      const currentDate = new Date(this.selectedDate);
      if (direction === 'previous') {
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (direction === 'next') {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.selectedDate = currentDate.toISOString().slice(0, 10);
      const schedule = await get_schedule(this.selectedDate);
      // const schedule = await get_schedule("2024-07-27");
      this.schedule = clean_schedules(schedule);
      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="card card-body blur shadow-blur mx-3 mx-md-9 mt-2">

      <div class="container">
        <div class="row">
          <div class="col-6">
            <h4>🇮🇹 Schedule</h4>
          </div>
          <div class="col-6">
            <div class="container">
              <div class="row">
                  <i> {{ (new Date(this.selectedDate)).toLocaleString('en-US', { day: '2-digit', month: 'short'})}} </i>
                <!-- </div> -->
              </div>
              <div class="row">
                <div class="col-6">
                  <MaterialButton variant="contained" color="light" class="btn-icon" size="sm"
                    @click="updateSelectedDate('previous')" >
                    <div class="d-flex align-items-center">
                      <i class="material-icons me-2" aria-hidden="true">arrow_back</i>
                    </div>
                  </MaterialButton>
                </div>
                <div class="col-6">
                  <MaterialButton variant="contained" color="light" class="btn-icon" size="sm"
                    @click="updateSelectedDate('next')">
                    <div class="d-flex align-items-center">
                      <i class="material-icons me-2" aria-hidden="true">arrow_forward</i>
                    </div>
                  </MaterialButton>
                </div>
              </div>
          </div>
        </div>
      </div>  
      </div>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <!-- Schedule printing -->
      <div v-if="schedule.length == 0">No Italians on this Date</div>      
      <div v-else>
          <div v-for="event in schedule" :key="event.id" class="card card-body blur shadow-blur mx-3 mx-md-9 mt-2">
            <span>
              <span v-if="event.liveFlag">🔴</span> 
              <span v-if="event.medalFlag">🏅</span> 
              <MaterialAvatar :image="'https://gstatic.olympics.com/s1/t_original/static/light/pictograms-paris-2024/olympics/' + event.disciplineCode + '_small.svg'" size='xs' :alt="event.disciplineCode" /> 
              <b>&nbsp;{{ event.disciplineName }}: </b>
              {{ event.startDate }}
            </span>
            <span>
              <i><a :href="'https://olympics.com' + event.url">{{ event.eventUnitName }}</a></i>
            </span>
            <span class="mt-2"> 
              <div v-for="(id, index) in event.italians_ids">
                <MaterialAvatar v-if="event.italians_names[index] == 'Italy'" image="https://olympics.com/OG2024/assets/images/flags/OG2024/ITA.webp" size='xs' :alt="ITA"/>
                <MaterialAvatar v-else :image="'https://olympics.com/OG2024/pic/OG2024/001/' + id.slice(1, 4) + '/medium/' + id + '.jpg'" size='xs' :alt="event.italians_names[index]"/> 
                {{ event.italians_names[index] }} {{ event.is_h2h ? 'Vs. ' + event.opponents_names.join(', ') : '' }}
              </div>
            </span>
          </div>
      </div>
    </div>
  </div>  
</template>
