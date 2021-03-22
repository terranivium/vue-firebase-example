<template>
  <li>
    <p>
      <span class="highlight">{{ buyer }}</span> has purchased
      <span class="highlight">{{ carname }}</span> for
      <span class="highlight">£{{ price }}</span
      >. <br /><br />
      <base-button class="button-link" @click="moreInfo">More Info</base-button
      ><br />
      <base-card v-if="infoVisible">
        <span class="small-text"
          >Transaction ID: {{ transactionid }} <br />Car ID: {{ carid }}</span
        >
      </base-card>
    </p>
  </li>
</template>

<script>
export default {
  props: ['transactionid', 'carid', 'carname', 'buyer', 'price'],
  data() {
    return {
      infoVisible: false
    };
  },
  methods: {
    moreInfo() {
      this.infoVisible = !this.infoVisible;
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

.form-control {
  margin: 0.5rem 0;
}

input[type='text'] {
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
}

.small-text {
  font-size: 12px;
  font-style: italic;
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
</style>
