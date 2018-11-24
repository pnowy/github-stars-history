<template>
  <div
    v-if="reposData && reposData.length"
    ref="chartContainer"
    class="chart__container"
  >
    <line-chart
      :library="config"
      :data="reposData"
      height="800px"
      width="100%"
      ytitle="Stars"
      legend="top" />

  </div>
</template>

<script>
import { DateTime } from "luxon";
import starHistoryService from "@/services/starHistory.service";
import notificationService from "@/services/notification.service";
import firebase from "firebase/app";
import "firebase/database";
import { encode } from "firebase-encode";

const config = {
  apiKey: "AIzaSyBPuZu6gbYL_IxW6UCYusHHrbzxHpsWNSE",
  authDomain: "github-stars-history.firebaseapp.com",
  databaseURL: "https://github-stars-history.firebaseio.com",
  projectId: "github-stars-history",
  storageBucket: "github-stars-history.appspot.com",
  messagingSenderId: "860963673180"
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database();
const firebaseReposRef = db.ref("repos");

export default {
  name: "AppReposChart",
  props: {
    repos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      config: {
        tooltip: {
          xDateFormat: "%Y-%m-%d"
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        }
      },
      reposData: []
    };
  },
  watch: {
    repos: function(_old, _new) {
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
      }).catch(e => {
        notificationService.error(e.statusText);
        return {
          name: repoName,
          data: []
        };
      });
    },
    saveRepoToStore(repo) {
      delete repo["fromGithubApi"]; // delete before save to firebase
      firebaseReposRef.child(encode(repo.name)).set(repo);
    },
    async reloadRepos() {
      let loader = this.$loading.show({
        container: this.$refs.chartContainer
      });

      const dataPromises = this.repos.map(repoName =>
        this.getRepoData(repoName)
      );

      this.reposData = await Promise.all(dataPromises)
        .catch(res => {
          this.reposData = [];
          notificationService.error("Problem with stack repos data!", res);
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
.chart__container {
  width: 100%;
  height: 100%;
}
</style>
