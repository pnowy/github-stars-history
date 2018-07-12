<template>
  <span/>
</template>

<script>
import eventBusService from "@/services/eventBus.service";

export default {
  name: "AppNotifications",
  mounted() {
    this.catchHttpErrors();
  },
  methods: {
    catchHttpErrors() {
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
      eventBusService.$on("NOTIFICATION_SUCCESS", message => {
        this.showSuccess(message);
      });

      eventBusService.$on("NOTIFICATION_ERROR", message => {
        this.showError(message);
      });

      // token expired - forward to login
      // EventBus.$on("UNAUTHORIZED_ACCESS", () => {
      //   this.$router.push({ name: "login" });
      // });
    },
    showError(text) {
      this.$snackbar.open({
        duration: 5000,
        message: text,
        type: "is-danger",
        position: "is-top",
        queue: false
      });
    },
    showSuccess(text) {
      this.$snackbar.open({
        duration: 5000,
        message: text,
        position: "is-top",
        queue: false
      });
    }
  }
};
</script>

<style scoped>
</style>
