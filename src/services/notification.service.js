import eventBus from "@/services/eventBus.service";

const error = message => {
  eventBus.$emit("NOTIFICATION_ERROR", message);
};

const success = message => {
  eventBus.$emit("NOTIFICATION_SUCCESS", message);
};

export default { error, success };
