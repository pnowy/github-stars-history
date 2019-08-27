<template>
  <nav class="panel">
    <p class="panel-heading">
      Stacks
    </p>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input v-model="search" class="input is-small" type="text" placeholder="search"></input>
        <span class="icon is-small is-left">
          <i class="mdi mdi-magnify is-medium" aria-hidden="true"></i>
        </span>
      </p>
    </div>

    <label class="panel-block">
      <input v-model="showPredefined" type="checkbox"/>
      show predefined stacks
    </label>

    <a v-for="(stack, index) in filteredStacks"
       :class="{ 'is-active': currIndex === index, 'panel-with-remove-button': !stack.predefined }"
       :key="stack.name"
       class="panel-block"
       @click="selectStackEvent(stack, index)"
    >
      <div>
        <span class="panel-icon">
          <i class="mdi mdi-checkbox-blank-circle" aria-hidden="true"></i>
        </span>
        <span>{{ stack.name }}</span>
      </div>

      <span v-if="!stack.predefined">
        <button class="button is-small" @click.stop="deleteStack(stack)">remove</button>
      </span>
    </a>

    <div class="panel-block">
      <p class="control is-expanded">
        <input v-model="newStackName" class="input is-small" type="text" placeholder="new stack"
               @keyup.enter="newStackEvent"/>
      </p>
      <a class="button is-small" @click="newStackEvent">add</a>
    </div>
  </nav>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Sync} from 'vuex-pathify';
  import predefinedStacks from '@/data/stacks';
  import {Stack} from '@/models';

  @Component
  export default class AppStacksPanel extends Vue {
    @Prop() public readonly stacks!: Stack[];
    @Sync('showPredefined') private showPredefined!: boolean;

    private currIndex = -1;
    private search = '';
    private newStackName = null;

    private get filteredStacks() {
      const userStacks = this.stacks.filter((stack: Stack) => {
        return stack.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
      const predefined = predefinedStacks.filter((stack: Stack) => {
        return (stack.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 && this.showPredefined);
      });
      return predefined.concat(userStacks);
    }

    private selectStackEvent(stack: Stack, index: number) {
      this.$emit('select-stack', stack);
      this.currIndex = index;
    }

    private deleteStack(stack: Stack) {
      this.$emit('delete-stack', stack);
    }

    private newStackEvent() {
      this.$emit('add-stack', this.newStackName);
      this.newStackName = null;
    }
  }
</script>

<style scoped>
  .panel-with-remove-button {
    justify-content: space-between;
  }
</style>
