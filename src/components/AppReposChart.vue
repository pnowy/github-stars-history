<template>
  <div v-if="reposData && reposData.length">
    <line-chart
      :library="config"
      :data="reposData"
      height="800px"
      ytitle="Stars"
      legend="top" />
  </div>
</template>

<script>
import { DateTime } from "luxon";
import starHistoryService from "@/services/starHistory.service";
import notificationService from "@/services/notification.service";
import Firebase from "firebase";
import { encode } from "firebase-encode";

const config = {
  apiKey: "AIzaSyBPuZu6gbYL_IxW6UCYusHHrbzxHpsWNSE",
  authDomain: "github-stars-history.firebaseapp.com",
  databaseURL: "https://github-stars-history.firebaseio.com",
  projectId: "github-stars-history",
  storageBucket: "github-stars-history.appspot.com",
  messagingSenderId: "860963673180"
};
const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();
const firebaseReposRef = db.ref("repos");

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
  watch: {
    stack: function() {
      this.reloadRepos();
    }
  },
  created() {
    this.reloadRepos();
  },
  methods: {
    getRepoData(repoName) {
      return new Promise((resolve, _reject) => {
        const now = DateTime.utc();
        firebaseReposRef.child(encode(repoName)).on("value", snapshot => {
          let val = snapshot.val();
          if (val && val.validUntil && now < DateTime.fromISO(val.validUntil)) {
            resolve(val);
          } else {
            resolve(starHistoryService.getStarHistory(repoName));
          }
        });
      });
    },
    saveRepoToStore(repo) {
      delete repo["fromGithubApi"]; // delete before save to firebase
      firebaseReposRef.child(encode(repo.name)).set(repo);
    },
    async reloadRepos() {
      let loader = this.$loading.show();

      const dataPromises = this.stack.repos.map(repoName =>
        this.getRepoData(repoName)
      );

      this.reposData = await Promise.all(dataPromises)
        .catch(res => {
          this.reposData = [];
          notificationService.error("Problem with repo data load!", res);
        })
        .finally(() => {
          loader.hide();
        });

      this.reposData.filter(repo => repo.fromGithubApi).forEach(repo => {
        this.saveRepoToStore(repo);
      });
    }
  }
};
</script>

<style scoped>
</style>
