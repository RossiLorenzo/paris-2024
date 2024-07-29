<script setup>
//APIs & Utilities
import get_medals from "@/assets/js/get_medals.js";
// Components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import DefaultCounterCard from "@/components/DefaultCounterCard.vue";
</script>

<script>
export default {
  data() {
    return {
      medals: null,
      italian_medals: null,
      loading: true
    };
  },
  async mounted() {
    const medals = await get_medals();
    this.medals = medals
    this.italian_medals = medals.medalStandings.medalsTable.filter(x => x.organisation === 'ITA')[0].disciplines
    .map(x => {
      const w = x.medalWinners
      w['name'] = x.name
      return(w)
    })
    .flat()
    .flat()
    .reverse()
    console.log(this.italian_medals)
    this.loading = false;
  }
};
</script>

<template>

  <div class="card card-body blur shadow-blur mx-3 mx-md-9">

      <div class="container">
        <div class="row">
          <div class="col-6">
            <h4>🏅 Medals </h4>
          </div>
        </div>
      </div>  

    <div v-if="loading">Loading...</div>
    <div v-else>
      <!-- Medals Assigned -->
      <div class="container mt-3">
        <div class="row">
          <div class="col-6">
            <DefaultCounterCard
              description="Assigned Medals"
              :count="medals.medalStandings.eventInfo.finishedEvents"
              suffix=""
              :duration="3000"
              color="dark"
             />
          </div>
          <div class="col-6">
            <DefaultCounterCard
              description="To Assign"
              :count="medals.medalStandings.eventInfo.totalEvents - medals.medalStandings.eventInfo.finishedEvents"
              suffix=""
              :duration="3000"
              color="dark"
             />
          </div>
        </div>
      </div>
      <!-- Medals Table -->
      <div class="container">
      <h6>Standing</h6>
      <div class="row" >
          <div class="col-1" /> 
          <div class="col-5" /> 
          <div class="col-2">🥇</div>
          <div class="col-2">🥈</div>
          <div class="col-2">🥉</div>
      </div>
        <div class="row" v-for="nation in medals.medalStandings.medalsTable.filter(x => x.rank <= 10 || x.organisation === 'ITA')">
          <div class="col-1"> 
            <MaterialAvatar :image="'https://olympics.com/OG2024/assets/images/flags/OG2024/' + nation.organisation + '.webp'" size='xs' :alt="nation.organisation"/>
          </div>
          <div class="col-5">             
            <span v-if="nation.organisation === 'ITA'"> &nbsp; <b> {{ nation.description }} </b> </span>
            <span v-else> &nbsp; {{ nation.description === 'United States' ? 'USA' : nation.description.split(',')[0] }} </span>
          </div>
          <div class="col-2">             
            {{nation.medalsNumber.filter(x => x.type === 'Total')[0].gold}}
          </div>
          <div class="col-2">             
            {{nation.medalsNumber.filter(x => x.type === 'Total')[0].silver}}
          </div>
          <div class="col-2">             
            {{nation.medalsNumber.filter(x => x.type === 'Total')[0].bronze}}
          </div>
        </div>
      </div>
      <!-- Italian Medals -->
      <div class="container mt-4">
      <h6>🇮🇹 Medals </h6>
        <div v-for="italian in italian_medals">
          <div class="row mt-3" >
            <div class="col-1">
                <span v-if="italian.medalType === 'ME_GOLD'">🥇 </span>
                <span v-if="italian.medalType === 'ME_SILVER'">🥈 </span>
                <span v-if="italian.medalType === 'ME_BRONZE'">🥉 </span>
            </div>
            <div class="col-1">
              <MaterialAvatar :image="'https://gstatic.olympics.com/s1/t_original/static/light/pictograms-paris-2024/olympics/' + italian.disciplineCode + '_small.svg'" size='xs' :alt="italian.disciplineCode" />
            </div>
            <div class="col-10">
              <b>&nbsp;{{ italian.eventDescription }} </b>
            </div>
          </div>
        <div class="row" >
          <div class="col-2" />
          <div class="col-10" > 
            <MaterialAvatar v-if="isNaN(italian.competitorCode)" image="https://olympics.com/OG2024/assets/images/flags/OG2024/ITA.webp" size='xs' alt="ITA"/>
            <MaterialAvatar v-else :image="'https://olympics.com/OG2024/pic/OG2024/001/' + italian.competitorCode.slice(1, 4) + '/medium/' + italian.competitorCode + '.jpg'" size='xs' :alt="italian.competitorCode"/>
            <span>
                  <a v-if="isNaN(italian.competitorCode)" :href="'https://olympics.com/en/paris-2024/team/' + italian.competitorCode">
                    &nbsp; {{ italian.competitorDisplayName }} 
                  </a>
                  <a v-else :href="'https://olympics.com/en/paris-2024/athlete/' + italian.competitorCode">
                    &nbsp; {{ italian.competitorDisplayName }} 
                  </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>

</template>
