import eventBus from '@/services/event-bus.service';

const error = (message: string) => {
  eventBus.$emit('NOTIFICATION_ERROR', message);
};

const success = (message: string) => {
  eventBus.$emit('NOTIFICATION_SUCCESS', message);
};

export default {error, success};
