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
}

const eb = new EventBus();

export default eb;
