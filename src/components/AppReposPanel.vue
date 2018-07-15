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
      :class="{ 'panel-with-remove-button': !stack.predefined }"
      class="panel-block">

      <div>
        <span class="panel-icon">
          <i
            class="mdi mdi-file-chart"
            aria-hidden="true"/>
        </span>
        <span>
          {{ repo }}
        </span>
      </div>

      <span v-if="!stack.predefined">
        <a
          class="button is-small"
          @click="removeRepo(repo)"
        >
          remove
        </a>
      </span>
    </a>

    <div
      v-if="!stack.predefined"
      class="panel-block">
      <p class="control is-expanded">
        <input
          v-model="newRepoName"
          class="input is-small"
          type="text"
          placeholder="new repo"
          @keyup.enter="addRepo"
        >
      </p>
      <a
        class="button is-small"
        @click="addRepo">add</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppReposPanel",
  props: {
    stack: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newRepoName: null
    };
  },
  methods: {
    addRepo() {
      if (this.newRepoName) {
        this.stack.repos.push(this.newRepoName);
        this.newRepoName = null;
        this.$emit("edit-stack", this.stack);
      }
    },
    removeRepo(repo) {
      const indexToDelete = this.stack.repos.findIndex(item => item === repo);
      this.stack.repos.splice(indexToDelete, 1);
      this.$emit("edit-stack", this.stack);
    }
  }
};
</script>

<style scoped>
.panel-with-remove-button {
  justify-content: space-between;
}
</style>
