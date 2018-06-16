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
          <!--<p class="bd-notification has-background-primary">-->
            <!--Stacks-->
          <!--</p>-->
          <nav class="panel">
            <p class="panel-heading">
              Stacks
            </p>

            <div class="panel-block">
              <p class="control has-icons-left">
                <input class="input is-small" type="text" placeholder="search">
                <span class="icon is-small is-left">
                  <i class="mdi mdi-magnify is-medium" aria-hidden="true"></i>
                </span>
              </p>
            </div>

            <!-- is-active dla -->
            <a class="panel-block" v-for="stack in stacks" v-bind:key="stack.name">
            <span class="panel-icon">
              <i class="mdi mdi-checkbox-blank-circle" aria-hidden="true"></i>
              <!--<b-icon pack="mdi" icon="trending-neutral" />-->
            </span>
              {{ stack.name }}
            </a>

            <div class="panel-block">
              <button class="button is-link is-outlined is-fullwidth">
                new stack
              </button>
            </div>

          </nav>

          <nav class="panel">
            <p class="panel-heading">
              Selected stack repos
            </p>

            <div class="panel-block ">
              <p >
                <!--<input class="input is-small" type="text" placeholder="search">-->
                <!--<span class="icon is-small is-left">-->
                  <!--<i class="fas fa-search" aria-hidden="true"></i>-->
                <!--</span>-->
                <strong>stack name</strong>
              </p>
            </div>

            <!-- is-active dla -->
            <a class="panel-block" v-for="repo in stacks[0].repos" v-bind:key="repo">
              <span class="panel-icon">
                    <i class="mdi mdi-file-chart" aria-hidden="true"></i>
                  </span>
                {{ repo }}
            </a>

            <div class="panel-block">
              <!--<div class="field has-addons">-->

                <p class="control is-expanded">
                  <input class="input is-small" type="text" placeholder="new repo">
                </p>
                <!--<div class="control ">-->
                  <a class="button is-small">
                    add
                  </a>
                <!--</div>-->
              <!--</div>-->
            </div>


          </nav>


        </div>


        <div class="column">
          <!--<p class="bd-notification has-background-primary">-->
            <!--Chart-->
          <!--</p>-->
            <stars-chart :data="chartData" :options="{ filled: false }" />
        </div>

      </div>

    </div>
  </section>

  </div>

</template>

<script>
import stacks from "@/services/stacks";
// @ is an alias to /src
import StarsChart from "@/components/StarsChart.vue";

export default {
  name: "home",
  components: {
    StarsChart
  },
  data() {
    return {
      stacks: stacks,
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
  methods: {
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
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
