<template>
  <div
    id="app"
    class="site"
  >
    <app-header />

    <div class="site__content">
      <app-home />
    </div>

    <app-notifications />

    <app-footer />
  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import AppNotifications from "@/components/layout/AppNotifications";
import AppHome from "@/components/AppHome";

export default {
  components: { AppHeader, AppFooter, AppHome, AppNotifications }
};
</script>

<style lang="scss">
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site__content {
  flex: 1;
}
// Import Bulma's core

// Set your colors
// $primary: #f15848;

@import "~bulma/sass/utilities/_all";

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
