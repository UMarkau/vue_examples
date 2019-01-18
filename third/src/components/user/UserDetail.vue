<template>
  <div>
    <h3>Some User Details</h3>
    <hr>
    <h3>This user has ID {{$route.params.id}}</h3>
    <hr>
    <router-link
      tag="button"
      :to="{name: 'userEdit', params: {id: $route.params.id}}"
      class="btn btn-primary"
    >EDIT</router-link>
  </div>
</template>
