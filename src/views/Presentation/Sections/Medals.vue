<script setup>
//APIs
// Utilities
// Components
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
</script>

<script>
export default {
  data() {
    return {
      dates: [],
      loading: true,
      error: null,
      athletes: []
    };
  },
  async mounted() {
    // Get Schedules and Athletes
    // this.dates = generate_dates('2024-07-24', '2024-07-26');
    this.athletes = null;

    // Combine

    this.loading = false;
  },
};
</script>

<template>
  <div class="card card-body blur shadow-blur mx-3 mx-md-9 mt-2">
    <h1>🏅 Medals Table</h1>

    <div v-if="loading">Loading...</div>
    <div v-else>
        <MaterialPagination>
          <MaterialPaginationItem label="<" />
          <MaterialPaginationItem label="Today" active />
          <MaterialPaginationItem label=">" />
        </MaterialPagination>
      </div>
  </div>
</template>
