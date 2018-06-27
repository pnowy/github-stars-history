import Vue from "vue";

class EventBus {
  constructor() {
    this._eventBus = new Vue();
  }

  $on(eventName, callback) {
    this._eventBus.$on(eventName, callback);
  }

  $emit(eventName, payload) {
    this._eventBus.$emit(eventName, payload);
  }

  successNotification(message) {
    this.$emit("NOTIFICATION_SUCCESS", message);
  }

  errorNotification(message) {
    this.$emit("NOTIFICATION_ERROR", message);
  }
}

const eb = new EventBus();

export default eb;

// available events <payload>

// SERVER_ERROR <error response>
// NO_RESPONSE_ERROR <error request>
// SETUP_REQUEST_ERROR <error message>

// UNAUTHORIZED_ACCESS <in case of unauthorized access>

// NOTIFICATION_SUCCESS <message>
