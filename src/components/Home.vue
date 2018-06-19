<template>
  <!--<div class="home">-->
  <!--<img src="../assets/logo.png">-->
  <!--</div>-->

  <!-- Main container -->
  <div>
    <section class="section">
      <div class="container">

        <div class="columns ">
          <div class="column is-one-third ">

            <available-stacks :stacks="stacks" @select-stack="selectStack" />

            <selected-stack v-if="selectedStack" :stack="selectedStack" />

          </div>


          <div class="column">
            <stars-chart :data="chartData" :options="{ filled: false }" />
          </div>

        </div>

      </div>
    </section>

  </div>

</template>

<script>
import AvailableStacks from "@/components/AvailableStacks.vue";
import SelectedStack from "@/components/SelectedStack.vue";
import StarsChart from "@/components/StarsChart.vue";
import { sync } from "vuex-pathify";

export default {
  name: "Home",
  components: {
    StarsChart,
    AvailableStacks,
    SelectedStack
  },
  data() {
    return {
      selectedStack: null,
      chartData: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [
          {
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: "Angular",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: "React",
            borderColor: "#8e5ea2",
            fill: false
          },
          {
            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
            label: "Angular.js",
            borderColor: "#3cba9f",
            fill: false
          },
          {
            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
            label: "Latin America",
            borderColor: "#e8c3b9",
            fill: false
          },
          {
            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 185],
            label: "North America",
            borderColor: "#c45850",
            fill: false
          }
        ]
      }
    };
  },
  computed: {
    stacks: sync("stacks")
  },
  methods: {
    selectStack(stack) {
      this.selectedStack = stack;
    }
  }
};
</script>

<style lang="scss">
@import "../../node_modules/bulma/sass/utilities/all";

.bd-notification {
  background-color: $primary;
  border-radius: 4px;
  color: $black;
  font-weight: 600;
  padding: 0.35rem 0;
  position: relative;
  text-align: center;
}
</style>
