<template>
  <!-- Main container -->
  <div>
    <section class="section">
      <div class="container">

        <div class="columns is-centered">
          <div class="column is-one-third ">

            <app-stacks-panel
              :stacks="stacks"
              @select-stack="selectStack"
              @add-stack="addStack"
              @delete-stack="deleteStack"
            />

            <app-repos-panel
              v-if="selectedStack"
              :stack="selectedStack"
              @edit-stack="editStack"/>
          </div>

          <div class="column">
            <div class="columns is-centered is-vcentered">
              <app-repos-chart
                v-if="selectedStack"
                :repos="selectedStack.repos"
              />
            </div>
          </div>

        </div>

      </div>
    </section>

  </div>

</template>

<script>
import AppStacksPanel from "@/components/AppStacksPanel";
import AppReposPanel from "@/components/AppReposPanel";
import AppReposChart from "@/components/AppReposChart";
import { guid } from "@/utils/random.utils";

export default {
  name: "AppHome",
  components: {
    AppStacksPanel,
    AppReposPanel,
    AppReposChart
  },
  data() {
    return {
      selectedStack: null
    };
  },
  computed: {
    stacks() {
      return this.$store.state.stacks;
    }
  },
  mounted() {
    this.$ga.page({
      page: "/",
      title: "Home page",
      location: window.location.href
    });
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
      this.selectedStack = stack;
    },
    deleteStack(stack) {
      this.$store.commit("deleteStack", { stack });
      this.selectedStack = null;
    },
    editStack(stack) {
      this.selectedStack = stack;
      this.$store.commit("editStack", { stack });
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
