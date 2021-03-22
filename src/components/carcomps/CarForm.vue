<template>
  <section>
    <base-card>
      <h2>Add Car</h2>
      <form @submit.prevent="addCar">
        <div class="form-control">
          <label for="carname">Car Model</label>
          <input
            type="text"
            id="carname"
            name="carname"
            v-model="enteredName"
          />
        </div>
        <div class="form-control">
          <label for="location">Manufacturer Location</label>
          <input
            type="text"
            id="location"
            name="location"
            v-model="enteredLocation"
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      enteredName: '',
      enteredLocation: '',
      invalidInput: false,
      error: null
    };
  },
  methods: {
    addCar() {
      if (this.enteredName === '' || this.enteredLocation === '') {
        this.invalidInput = true;
        return;
      }
      this.invalidInput = false;
      this.error = null;

      fetch(
        'https://ac-test-fdfba-default-rtdb.europe-west1.firebasedatabase.app/Cars.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            carname: this.enteredName,
            location: this.enteredLocation
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
          this.$router.push('/car-list'); // nav on submit
        })
        .catch(error => {
          console.log(error);
          this.error = error.message;
        });
      this.enteredName = '';
      this.enteredLocation = '';
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

input[type='text'] {
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
}
</style>
