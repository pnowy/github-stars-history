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

    <a v-for="repo in stack.repos" :key="repo" class="panel-block">
      <span class="panel-icon">
        <i class="mdi mdi-file-chart" aria-hidden="true"/>
      </span>
      {{ repo }}
    </a>

    <div class="panel-block">
      <p class="control is-expanded">
        <input class="input is-small" type="text" placeholder="new repo">
      </p>
      <a class="button is-small">add</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SelectedStack",
  props: {
    stack: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
