import Vue from 'vue';
import app from './components/app.vue';
import vuetify from './plugins/vuetify';

new Vue({
  vuetify,
  render(h) { return h(app); },
}).$mount('#myapp');
