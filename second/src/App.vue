<template>
  <div class="container">
    <appHeader :quoteCount="quotes.length" :maxQuotes="maxQuotes"></appHeader>
    <myQuoteGrid :quotes="quotes" @quoteDeleted="removeQuote"></myQuoteGrid>
    <appNewQuote @quoteAdded="newQuote"></appNewQuote>
    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="alert alert-info">Info: Click on a Quote to Delete it!</div>
      </div>
    </div>
  </div>
</template>

<script>
import QuoteGrid from "./components/QuoteGrid.vue";
import NewQuote from "./components/NewQuote.vue";
import Header from "./components/Header.vue";

export default {
  data() {
    return {
      quotes: ["Quote to see something"],
      maxQuotes: 10
    };
  },
  components: {
    myQuoteGrid: QuoteGrid,
    appNewQuote: NewQuote,
    appHeader: Header
  },
  methods: {
    newQuote(quote) {
      this.quotes.length === 10
        ? alert("Please delete quotes")
        : this.quotes.push(quote);
    },
    removeQuote(quote) {
      this.quotes.splice(quote, 1);
    }
  }
};
</script>

<style>
</style>
