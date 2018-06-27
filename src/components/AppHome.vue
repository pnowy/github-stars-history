<template>
  <!--<div class="home">-->
  <!--<img src="../assets/logo.png">-->
  <!--</div>-->

  <!-- Main container -->
  <div>
    <section class="section">
      <div class="container">

        <div class="columns is-centered">
          <div class="column is-one-third ">

            <app-stacks-panel :stacks="stacks"
                              @select-stack="selectStack"
                              @add-stack="addStack"
                              @delete-stack="deleteStack" />

            <app-stack-repos-panel v-if="selectedStack && selectedStack.id" :stack="selectedStack" />

          </div>

          <div class="column">
            <div class="columns is-centered is-vcentered">
              <app-repos-chart v-if="selectedStack && selectedStack.id" :stack="selectedStack" />
            </div>
          </div>

        </div>

      </div>
    </section>

  </div>

</template>

<script>
import AppStacksPanel from "@/components/AppStacksPanel";
import AppStackReposPanel from "@/components/AppStackReposPanel";
import AppReposChart from "@/components/AppReposChart";
import { guid } from "@/utils/random.utils";

export default {
  name: "AppHome",
  components: {
    AppStacksPanel,
    AppStackReposPanel,
    AppReposChart
  },
  data() {
    return {
      selectedStack: {},
      reposData: []
    };
  },
  computed: {
    stacks() {
      return this.$store.state.stacks;
    }
  },
  methods: {
    async selectStack(stack) {
      this.selectedStack = stack;
    },
    addStack(stackName) {
      const stack = {
        id: guid(),
        name: stackName,
        repos: []
      };
      this.$store.commit("addStack", { stack });
    },
    deleteStack(stack) {
      this.$store.commit("deleteStack", { stack });
      this.selectedStack.id = null;
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
