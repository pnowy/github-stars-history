<template>
  <div id="app">
    <AppHeader />

    <home />

  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
import Home from "@/components/Home";
import store from "@/store";
import predefinedStacks from "@/data/stacks";
import _ from "lodash";

export default {
  components: { AppHeader, Home },
  mounted() {
    this.initialize();
  },

  methods: {
    initialize: function() {
      const stacks = store.get("stacks");
      for (const predefinedStack of predefinedStacks) {
        const index = _.findIndex(stacks, { id: predefinedStack.id });
        if (index < 0) {
          stacks.push(predefinedStack);
        } else {
          const savedStack = stacks[index];
          if (!savedStack.modified) {
            stacks[index] = Object.assign({}, predefinedStack);
          }
        }
      }
      store.set("stacks", stacks);
    }
  }
};
</script>

<style lang="scss">
// Import Bulma's core

// Set your colors
// $primary: #f15848;

@import "~bulma/sass/utilities/_all";

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
