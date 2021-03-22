<template>
  <section>
    <base-card>
      <h2>List of available cars</h2>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <p v-else-if="!isLoading && (!results || results.length === 0)">
        No stored cars found. Start by adding some cars first.
      </p>
      <ul v-else>
        <car-entry
          v-for="result in results"
          @new-po="newPoEvent"
          :key="result.id"
          :id="result.id"
          :carname="result.carname"
          :location="result.location"
        ></car-entry>
      </ul>
    </base-card>
  </section>
</template>

<script>
import CarEntry from './CarEntry.vue';

export default {
  components: {
    CarEntry
  },
  emits: ['new-po'],
  data() {
    return {
      results: [],
      isLoading: false,
      error: null
    };
  },
  methods: {
    newPoEvent() {
      this.$emit('new-po');
    },
    loadCars() {
      console.log('load cars');
      this.isLoading = true;
      this.error = null;
      fetch(
        'https://ac-test-fdfba-default-rtdb.europe-west1.firebasedatabase.app/Cars.json'
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          this.isLoading = false;
          const results = [];
          for (const id in data) {
            results.push({
              id: id,
              carname: data[id].carname,
              location: data[id].location
            });
          }
          this.results = results;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          this.error = 'Failed to fetch data - please try again.';
        });
    }
  },
  mounted() {
    this.loadCars();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
