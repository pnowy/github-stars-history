<template>
  <span></span>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import eventBusService from '@/services/event-bus.service';

  @Component
  export default class AppNotifications extends Vue {
    private catchHttpErrors() {
      // EventBus.$on("SERVER_ERROR", response => {
      //   const { data } = response;
      //   if (data && data["project-code"]) {
      //     const code = data["project-code"];
      //     const params = data["project-params"];
      //     this.showError(`errors.${code}`, params);
      //   } else if (data.title) {
      //     this.showError(data.title);
      //   } else {
      //     this.showError(data.error);
      //   }
      // });
      //
      // EventBus.$on("NO_RESPONSE_ERROR", request => {
      //   this.showError("errors.NO_RESPONSE_ERROR", request);
      // });
      //
      // EventBus.$on("SETUP_REQUEST_ERROR", message => {
      //   this.showError("errors.SETUP_REQUEST_ERROR", message);
      // });
      //
      eventBusService.$on('NOTIFICATION_SUCCESS', (message: string) => {
        this.showSuccess(message);
      });

      eventBusService.$on('NOTIFICATION_ERROR', (message: string) => {
        this.showError(message);
      });

      // token expired - forward to login
      // EventBus.$on("UNAUTHORIZED_ACCESS", () => {
      //   this.$router.push({ name: "login" });
      // });
    }

    private showError(text: string) {
      // @ts-ignore
      this.$snackbar.open({
        duration: 5000,
        message: text,
        type: 'is-danger',
        position: 'is-top',
        queue: false,
      });
    }

    private showSuccess(text: string) {
      // @ts-ignore
      this.$snackbar.open({
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
