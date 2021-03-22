<template>
  <section>
    <base-card>
      <h2>List of Purchase Orders</h2>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <p v-else-if="!isLoading && (!results || results.length === 0)">
        No stored sales found. Start by adding some purchase orders first.
      </p>
      <ul v-else>
        <sale-entry
          v-for="result in results"
          :key="result.id"
          :transactionid="result.id"
          :carid="result.carid"
          :carname="result.carname"
          :buyer="result.buyer"
          :price="result.price"
        ></sale-entry>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SaleEntry from './SaleEntry.vue';

export default {
  components: {
    SaleEntry
  },
  data() {
    return {
      results: [],
      isLoading: false,
      error: null
    };
  },
  methods: {
    loadPo() {
      console.log('load pos');
      this.isLoading = true;
      this.error = null;
      fetch(
        'https://ac-test-fdfba-default-rtdb.europe-west1.firebasedatabase.app/Sales.json'
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
              carid: data[id].carid,
              carname: data[id].carname,
              buyer: data[id].buyer,
              price: data[id].price
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
    this.loadPo();
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
