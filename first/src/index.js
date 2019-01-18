import Vue from "vue";
import "bootstrap";
import "./scss/app.scss";
import AppComponent from "./components/AppComponent.vue";

new Vue({
  render: h => h(AppComponent)
}).$mount("#app");
