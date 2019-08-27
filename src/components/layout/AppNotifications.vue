<template>
  <span></span>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import eventBusService from '@/services/event-bus.service';

  @Component
  export default class AppNotifications extends Vue {
    private catchHttpErrors() {

      eventBusService.$on('NOTIFICATION_SUCCESS', (message: string) => {
        this.showSuccess(message);
      });

      eventBusService.$on('NOTIFICATION_ERROR', (message: string) => {
        this.showError(message);
      });

    }

    private showError(text: string) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: text,
        type: 'is-danger',
        position: 'is-top',
        queue: false,
      });
    }

    private showSuccess(text: string) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: text,
        position: 'is-top',
        queue: false,
      });
    }

    private mounted() {
      this.catchHttpErrors();
    }
  }
</script>
