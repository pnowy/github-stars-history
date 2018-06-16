<template>
  <div id="app">
    <AppHeader />

    <home />


  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
import Home from "@/components/Home";

export default {
  components: { AppHeader, Home }
};
</script>

<style lang="scss">
// Import Bulma's core

// Set your colors
// $primary: #f15848;

@import "~bulma/sass/utilities/_all";

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
