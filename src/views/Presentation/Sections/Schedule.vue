<script setup>
import { ref } from "vue";
let showDropdown = ref(false);
//APIs & Utilities
import get_schedule from "@/assets/js/get_schedule.js";
import clean_schedules from "@/assets/js/clean_schedules.js";
import filter_schedules from "@/assets/js/filter_schedules.js";
// Components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";
</script>

<script>
export default {
  data() {
    return {
      schedule: [],
      filter: 'all',
      filtered_schedule: [],
      athletes: [],
      loading: true,
      selectedDate: null //Start of the Olympics
    };
  },
  async created() {
    // At mount update immediately the date
    const right_now = new Date();
    const offset = right_now.getTimezoneOffset()
    this.selectedDate = (new Date(right_now.getTime() - (offset*60*1000))).toISOString().split('T')[0];
    // Get Schedules and Athletes
    const schedule = await get_schedule(this.selectedDate);
    // const schedule = await get_schedule("2024-07-27");
    this.schedule = clean_schedules(schedule);
    this.filtered_schedule = this.schedule;
    // Loading completed
    this.loading = false;

    // Reload the data 
    setInterval(async () => {
      const schedule = await get_schedule(this.selectedDate);
      this.schedule = clean_schedules(schedule);
      this.filtered_schedule = filter_schedules(this.schedule, this.filter);
    }, 10000)
  },
  methods: {
    async updateSelectedDate(direction) {
      this.loading = true;
      const currentDate = new Date(this.selectedDate);
      if (direction === 'previous') {
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (direction === 'next') {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.selectedDate = currentDate.toISOString().slice(0, 10);
      const schedule = await get_schedule(this.selectedDate);
      this.schedule = clean_schedules(schedule);
      this.filter = 'all';
      this.filtered_schedule = filter_schedules(this.schedule, this.filter);
      this.loading = false;
    },
    filterEvents(f) {
      this.filter = f;
      this.filtered_schedule = filter_schedules(this.schedule, f);
    }
  },
};
</script>

<template>

  <div class="card card-body blur shadow-blur mx-3 mx-md-9 mt-3">

      <div class="container">
        <div class="row">
          <div class="col-6">
            <h4>🇮🇹 Schedule</h4>
          </div>
          <div class="col-6">
            <div class="container">
              <div class="row">
                  <i> {{ (new Date(selectedDate)).toLocaleString('en-US', { day: '2-digit', month: 'short'})}} </i>
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

          <div class="container">
      <div class="row justify-space-between text-center py-2">
        <div class="col-12 mx-auto">
        <div class="btn-group" role="group" aria-label="Event Filters">
          <input type="radio" class="btn-check" name="btnradio" id="all" 
            @click="filterEvents('all')" checked>
          <label class="btn btn-outline-dark" for="all" style="padding: 0.5rem !important;">All</label>

          <input type="radio" class="btn-check" name="btnradio" id="RUNNING"
            @click="filterEvents('RUNNING')">
          <label class="btn btn-outline-dark"  for="RUNNING" style="padding: 0.5rem !important;">Live</label>

          <input type="radio" class="btn-check" name="btnradio" id="FINISHED"
            @click="filterEvents('FINISHED')">
          <label class="btn btn-outline-dark"  for="FINISHED" style="padding: 0.5rem !important;">Completed</label>

          <input type="radio" class="btn-check" name="btnradio" id="SCHEDULED"
            @click="filterEvents('SCHEDULED')">
          <label class="btn btn-outline-dark"  for="SCHEDULED" style="padding: 0.5rem !important;">Scheduled</label>
        </div>
        </div>
      </div>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <!-- Schedule printing -->
      <div v-if="schedule.length == 0">No Italians on this Date</div>      
      <div v-else>
          <div v-for="event in filtered_schedule" :key="event.id" class="card card-body blur shadow-blur mx-3 mx-md-9 mt-2">
            <span>
              <span v-if="event.liveFlag"> 🔴 </span> 
              <span v-if="event.medalFlag"> 🏅 </span> 
              <MaterialAvatar :image="'https://gstatic.olympics.com/s1/t_original/static/light/pictograms-paris-2024/olympics/' + event.disciplineCode + '_small.svg'" size='xs' :alt="event.disciplineCode" /> 
              <b>&nbsp;{{ event.disciplineName }}: </b>
              {{ event.startDate }}
            </span>
            <span>
              <i><a :href="'https://olympics.com' + event.url">{{ event.eventUnitName }}</a></i>
            </span>
            <span class="mt-2"> 
              <div v-for="(id, index) in event.italians_ids">
                <!-- Winner/Loser -->
                <span v-if="event.italians_winners[index]==='W'"> ✅ </span>
                <span v-if="event.italians_winners[index]==='L'"> ⛔️ </span>
                <!-- Either the photo or the italian flag -->
                <MaterialAvatar v-if="isNaN(id)" image="https://olympics.com/OG2024/assets/images/flags/OG2024/ITA.webp" size='xs' alt="ITA"/>
                <MaterialAvatar v-else :image="'https://olympics.com/OG2024/pic/OG2024/001/' + id.slice(1, 4) + '/medium/' + id + '.jpg'" size='xs' :alt="event.italians_names[index]"/>
                <!-- Athlete Names and Links -->
                <span>
                  <a v-if="isNaN(id)" :href="'https://olympics.com/en/paris-2024/team/' + id">
                    &nbsp; {{ event.italians_names[index] }} 
                  </a>
                  <a v-else :href="'https://olympics.com/en/paris-2024/athlete/' + id">
                    &nbsp; {{ event.italians_names[index] }} 
                  </a>
                </span>
                <!-- Opponent Info -->
                {{ event.is_h2h ? ' Vs. ' + event.opponents_names.join(', ') : '' }}
              </div>
            </span>
          </div>
      </div>
    </div>
  </div>  
</template>
