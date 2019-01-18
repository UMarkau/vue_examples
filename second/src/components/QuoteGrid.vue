<template>
  <div class="row">
    <myQuote
      :key="index"
      v-for="(quote, index) in quotes"
      @click.native="deleteQuote(index)"
    >{{quote}}</myQuote>
  </div>
</template>

<script>
import Quote from "./Quote.vue";
export default {
  props: ["quotes"],
  components: {
    myQuote: Quote
  },
  methods: {
    deleteQuote(index) {
      this.$emit("quoteDeleted", index);
    }
  }
};
</script>

<style>
</style>
