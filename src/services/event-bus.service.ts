import Vue from 'vue';

class EventBusService {
  private static instance: EventBusService;

  private eventBus = new Vue();

  private constructor() {
  }

  // tslint:disable-next-line:ban-types
  public $on(eventName: string, callback: Function) {
    this.eventBus.$on(eventName, callback);
  }

  public $emit(eventName: string, payload: any) {
    this.eventBus.$emit(eventName, payload);
  }

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

}

const eventBusService = EventBusService.Instance;

export default eventBusService;
