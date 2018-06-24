<template>
  <nav class="panel">
    <p class="panel-heading">
      Stacks
    </p>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input v-model="search" class="input is-small" type="text" placeholder="search">
        <span class="icon is-small is-left">
          <i class="mdi mdi-magnify is-medium" aria-hidden="true"/>
        </span>
      </p>
    </div>

    <label class="panel-block">
      <input type="checkbox" v-model="showPredefined" >
      show predefined stacks
    </label>

    <a class="panel-block"  :class="{ 'is-active': currIndex === index, 'panel-with-remove-button': !stack.predefined }"
       v-for="(stack, index) in filteredStacks" :key="stack.name"
       @click="selectStackEvent(stack, index)" >

      <div>
        <span class="panel-icon">
          <i class="mdi mdi-checkbox-blank-circle" aria-hidden="true"/>
        </span>
        <span>
          {{ stack.name }}
        </span>
      </div>

      <span v-if="!stack.predefined">
        <a class="button is-small" @click="deleteStackEvent(stack)">remove</a>
      </span>

    </a>

    <div class="panel-block">
      <p class="control is-expanded">
        <input v-model="newStackName" class="input is-small" type="text" placeholder="new stack" @keyup.enter="newStackEvent">
      </p>
      <a class="button is-small" @click="newStackEvent">add</a>
    </div>

  </nav>
</template>

<script>
import predefinedStacks from "@/data/stacks";
import { sync } from "vuex-pathify";

export default {
  name: "AvailableStacks",
  props: {
    stacks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currIndex: -1,
      search: "",
      newStackName: null
    };
  },
  computed: {
    filteredStacks() {
      const userStacks = this.stacks.filter(stack => {
        return stack.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
      const predefined = predefinedStacks.filter(stack => {
        return (
          stack.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 &&
          this.showPredefined === true
        );
      });
      return predefined.concat(userStacks);
    },
    showPredefined: sync("showPredefined")
  },
  methods: {
    selectStackEvent(stack, index) {
      this.$emit("select-stack", stack);
      this.currIndex = index;
    },
    newStackEvent() {
      this.$emit("add-stack", this.newStackName);
      this.newStackName = null;
    },
    deleteStackEvent(stack) {
      this.$emit("delete-stack", stack);
    }
  }
};
</script>

<style scoped>
.panel-with-remove-button {
  justify-content: space-between;
}
</style>
