import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';

import CarForm from './components/carcomps/CarForm.vue';
import CarList from './components/carcomps/CarList.vue';
import PoList from './components/carcomps/PoList.vue';

import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/car-list' },
    { path: '/add-car', component: CarForm },
    { path: '/car-list', component: CarList },
    { path: '/po-list', component: PoList },
    { path: '/:catchAll(.*)', redirect: '/car-list'}
  ]
});

const app = createApp(App);

app.use(router);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);

app.mount('#app');