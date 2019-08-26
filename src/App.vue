<template>
  <div id="app" class="site">
    <app-header/>

    <div class="site__content">
      <section class="section">
        <div class="container">
          <router-view/>
        </div>
      </section>
    </div>

    <app-notifications/>

    <app-footer/>
  </div>

</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AppHeader from '@/components/layout/AppHeader.vue';
  import AppFooter from '@/components/layout/AppFooter.vue';
  import AppNotifications from '@/components/layout/AppNotifications.vue';

  @Component({
    components: {
      AppFooter,
      AppHeader,
      AppNotifications,
    },
  })
  export default class App extends Vue {
  }
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
