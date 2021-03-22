<template>
  <li>
    <p>
      <span class="highlight">{{ carname }}</span> - manufacturer based in
      <span class="highlight">{{ location }}</span
      >.<br />
      <base-button class="button-link" @click="showPo"
        >Create Purchase Order</base-button
      >
    </p>
    <base-card v-if="poVisible">
      <form @submit.prevent="addPo(id, carname)">
        <div class="form-control">
          <label for="buyer">Buyer Name</label>
          <input type="text" id="buyer" name="buyer" v-model="enteredBuyer" />
        </div>
        <div class="form-control">
          <label for="price">Agreed Price (£)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            id="price"
            name="price"
            v-model.trim="enteredPrice"
          />
        </div>
        <p v-if="invalidInput">
          One or more input fields are invalid. Please check your provided data.
        </p>
        <p v-if="error">{{ error }}</p>
        <div>
          <base-button>Submit</base-button>
        </div>
      </form>
    </base-card>
  </li>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';
export default {
  components: { BaseButton },
  props: ['id', 'carname', 'location'],
  data() {
    return {
      poVisible: false,
      enteredBuyer: '',
      enteredPrice: 0,
      invalidInput: null,
      error: null
    };
  },
  methods: {
    showPo() {
      this.poVisible = !this.poVisible;
    },
    addPo(id, carname) {
      if (this.enteredBuyer === '' || this.enteredPrice === null) {
        this.invalidInput = true;
        return;
      }
      this.invalidInput = false;
      this.error = null;

      fetch(
        'https://ac-test-fdfba-default-rtdb.europe-west1.firebasedatabase.app/Sales.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            buyer: this.enteredBuyer,
            price: this.enteredPrice,
            carid: id,
            carname: carname
          })
        }
      )
        .then(response => {
          if (response.ok) {
            // ...
          } else {
            throw new Error('Could not save data!');
          }
        })
        .then(() => {
          this.$router.push('/po-list');
        })
        .catch(error => {
          console.log(error);
          this.error = error.message;
        });
      this.enteredBuyer = '';
      this.enteredPrice = 0;
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

h3,
p {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.highlight {
  font-weight: bold;
}

.button-link {
  background: none !important;
  border: none;
  padding: 0 !important;
  font-size: 12px;
  font-family: arial, sans-serif;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
}

.form-control {
  margin: 0.5rem 0;
}

input {
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
}
</style>
