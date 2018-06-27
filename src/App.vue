<template>
  <div id="app">
    <app-header />

    <app-home />

    <app-notifications />
  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
import AppNotifications from "@/components/layout/AppNotifications";
import AppHome from "@/components/AppHome";

export default {
  components: { AppHeader, AppHome, AppNotifications }
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
