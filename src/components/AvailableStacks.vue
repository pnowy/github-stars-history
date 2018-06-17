<template>
  <nav class="panel">
    <p class="panel-heading">
      Stacks
    </p>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="search">
        <span class="icon is-small is-left">
          <i class="mdi mdi-magnify is-medium" aria-hidden="true"/>
        </span>
      </p>
    </div>

    <a class="panel-block" :class="{ 'is-active': currIndex === index }"
       v-for="(stack, index) in Object.values(stacks)" :key="stack.name"
       @click="selectStackEvent(stack, index)" >
      <span class="panel-icon">
        <i class="mdi mdi-checkbox-blank-circle" aria-hidden="true"/>
      </span>
      {{ stack.name }}
    </a>

    <div class="panel-block">
      <p class="control is-expanded">
        <input class="input is-small" type="text" placeholder="new stack">
      </p>
      <a class="button is-small">add</a>
    </div>

  </nav>
</template>

<script>
export default {
  name: "AvailableStacks",
  props: {
    stacks: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currIndex: -1,
      search: ""
    };
  },
  computed: {
    filteredStacks() {
      return this.stacks.filter(stack => {
        return stack.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }
  },
  methods: {
    selectStackEvent(stack, index) {
      this.$emit("select-stack", stack);
      this.currIndex = index;
    }
  }
};
</script>

<style scoped>
</style>
