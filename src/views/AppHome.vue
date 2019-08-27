<template>
  <div class="columns is-centered">
    <div class="column is-one-third ">

      <app-stacks-panel
              :stacks="stacks"
              @select-stack="selectStack"
              @add-stack="addStack"
              @delete-stack="deleteStack"
      />

      <app-repos-panel v-if="selectedStack" :stack="selectedStack" @edit-stack="editStack"/>
    </div>

    <div class="column">
      <div class="columns is-centered is-vcentered">
        <app-repos-chart v-if="selectedStack" :repos="selectedStack.repos"/>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AppStacksPanel from '@/components/AppStacksPanel.vue';
  import AppReposPanel from '@/components/AppReposPanel.vue';
  import AppReposChart from '@/components/AppReposChart.vue';
  import utilService from '@/services/util.service';
  import {Stack} from '@/models';

  @Component({
    components: {
      AppStacksPanel,
      AppReposPanel,
      AppReposChart,
    },
  })
  export default class AppHome extends Vue {
    private selectedStack: Stack | null = null;

    get stacks() {
      return this.$store.state.stacks;
    }

    private async selectStack(stack: Stack) {
      this.selectedStack = stack;
    }

    private addStack(stackName: string) {
      const stack: Stack = {
        id: utilService.guid(),
        name: stackName,
        repos: [],
      };
      this.$store.commit('addStack', {stack});
      this.selectedStack = stack;
    }

    private deleteStack(stack: Stack) {
      this.$store.commit('deleteStack', {stack});
      this.selectedStack = null;
    }

    private editStack(stack: Stack) {
      this.selectedStack = stack;
      this.$store.commit('editStack', {stack});
    }

    private mounted() {
      // @ts-ignore
      this.$ga.page({
        page: '/',
        title: 'Home page',
        location: window.location.href,
      });
    }
  }
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
