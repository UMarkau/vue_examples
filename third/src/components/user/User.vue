<template>
  <div>
    <h1>The User Page</h1>
    <hr>
    <button @click="navigateToHome" class="btn btn-primary">Go To Home</button>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import UserDetail from "./UserDetail.vue";
import UserEdit from "./UserEdit.vue";
import UserStart from "./UserStart.vue";

export default {
  components: {
    userDetail: UserDetail,
    userEdit: UserEdit,
    userStart: UserStart
  },
  methods: {
    navigateToHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
