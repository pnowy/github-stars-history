
<script>
import { Line } from "vue-chartjs";
export default {
  name: "StarsChart",
  extends: Line,
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default() {
        return {
          fill: false
        };
      }
    }
  },
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>

<style scoped>
</style>
