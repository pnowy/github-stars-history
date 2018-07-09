<template>
  <nav class="panel">
    <p class="panel-heading">
      Selected stack repos
    </p>

    <div class="panel-block ">
      <p >
        <strong>{{ stack.name }}</strong>
      </p>
    </div>

    <a 
      v-for="repo in stack.repos" 
      :key="repo" 
      class="panel-block">
      <span class="panel-icon">
        <i 
          class="mdi mdi-file-chart" 
          aria-hidden="true"/>
      </span>
      {{ repo }}
    </a>

    <div 
      v-if="!stack.predefined" 
      class="panel-block">
      <p class="control is-expanded">
        <input 
          v-model="newRepoName" 
          class="input is-small" 
          type="text" 
          placeholder="new repo">
      </p>
      <a 
        class="button is-small" 
        @click="addRepo">add</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppStackReposPanel",
  props: {
    stack: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newRepoName: ""
    };
  },
  methods: {
    addRepo() {
      if (this.newRepoName) {
        this.stack.repos.push(this.newRepoName);
      }
    }
  }
};
</script>

<style scoped>
</style>
