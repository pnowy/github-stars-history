<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Github stars</strong> by <a href="https://github.com/pnowy" target="_blank">pnowy</a>
      </p>
      <p>Do you want add something to predefined stacks?
        <a target="_blank" href="https://github.com/pnowy/github-stars-history/blob/master/src/data/stacks.js">
          Just create pull request!
        </a>
      </p>
      <p>
        Do you have an idea how to improve project?
        <a target="_blank" href="https://github.com/pnowy/github-stars-history/issues">Create an issue!</a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class AppFooter extends Vue {
  }
</script>
