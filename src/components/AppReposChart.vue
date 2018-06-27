<template>
  <div v-if="reposData && reposData.length">
    <line-chart :library="config" height="800px" :data="reposData" ytitle="Stars" legend="top" ></line-chart>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { mapGetters, mapMutations } from "vuex";
import starHistoryService from "@/services/starHistory.service";
import EventBus from "@/services/event-bus.service";

export default {
  name: "AppReposChart",
  props: {
    stack: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      config: {
        tooltip: {
          xDateFormat: "%Y-%m-%d"
        }
      },
      reposData: []
    };
  },
  created() {
    this.reloadRepos();
  },
  watch: {
    stack: function() {
      this.reloadRepos();
    }
  },
  computed: {
    ...mapGetters(["findRepoInStore"])
  },
  methods: {
    ...mapMutations(["saveRepoToStore"]),
    getRepoData(repoName, requestDate) {
      const repo = this.findRepoInStore(repoName, requestDate);
      if (repo) {
        return Promise.resolve(repo);
      } else {
        return starHistoryService.getStarHistory(repoName);
      }
    },
    async reloadRepos() {
      let loader = this.$loading.show();

      const requestDate = DateTime.utc().toISODate();
      const dataPromises = this.stack.repos.map(repoName =>
        this.getRepoData(repoName, requestDate)
      );

      this.reposData = await Promise.all(dataPromises)
        .catch(res => {
          this.reposData = [];
          EventBus.errorNotification("Problem with repo data load!");
        })
        .finally(() => {
          loader.hide();
        });

      this.reposData.filter(repo => !repo.date).forEach(repo => {
        repo.date = requestDate;
        this.saveRepoToStore({ repo });
      });
    }
  }
};
</script>

<style scoped>
</style>
