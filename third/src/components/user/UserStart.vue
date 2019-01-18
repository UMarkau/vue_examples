<template>
  <div>
    <p>Please select a User</p>
    <hr>
    <ul class="list-group">
      <router-link
        v-for="userId in usersId"
        :key="userId"
        :to="`user/${userId}`"
        tag="li"
        class="list-group-item"
        style="cursor: pointer"
      >User {{userId}}</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usersId: [1, 2, 3]
    };
  }
};
</script>
