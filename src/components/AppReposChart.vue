<template>
  <div v-if="reposData && reposData.length" class="chart__container vld-parent">
    <loading :active.sync="isLoading" :is-full-page="false"></loading>

    <line-chart
      :library="config"
      :data="reposData"
      height="800px"
      width="100%"
      ytitle="Stars"
      legend="top"
    />
  </div>
</template>

<script>
import { DateTime } from "luxon";
import starHistoryService from "@/services/starHistory.service";
import notificationService from "@/services/notification.service";
import firebase from "firebase/app";
import "firebase/database";
import { encode } from "firebase-encode";
import Loading from "vue-loading-overlay";

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
const firebaseReposRef = db.ref("repos_v2");

export default {
  name: "AppReposChart",
  components: {
    Loading
  },
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
      reposData: [],
      isLoading: false
    };
  },
  watch: {
    repos: function() {
      this.reloadRepos();
    }
  },
  created() {
    this.reloadRepos();
  },
  methods: {
    async reloadRepos() {
      this.isLoading = true;

      const dataPromises = this.repos.map(repoName =>
        this.getRepoData(repoName)
      );

      this.reposData = await Promise.all(dataPromises)
        .catch(res => {
          this.reposData = [];
          notificationService.error("Problem with stack repos data!", res);
        })
        .finally(() => {
          this.isLoading = false;
        });

      this.reposData
        .filter(repo => repo.refreshed)
        .forEach(repo => {
          this.saveRepoToStore(repo);
        });
    },
    shouldRefreshRepo(repo) {
      const now = DateTime.utc();
      return (
        repo &&
        repo.refreshAfter &&
        now > DateTime.fromISO(repo.refreshAfter, { zone: "utc" })
      );
    },
    getRepoData(repoName) {
      return new Promise((resolve, _reject) => {
        firebaseReposRef.child(encode(repoName)).on("value", snapshot => {
          let repo = snapshot.val();
          if (!repo || this.shouldRefreshRepo(repo)) {
            const repoVar = repo || {};
            resolve(
              starHistoryService.getStarHistory(
                repoName,
                repoVar.lastPage,
                repoVar.data
              )
            );
          } else {
            resolve(repo);
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
      delete repo["refreshed"]; // delete before save to firebase
      firebaseReposRef.child(encode(repo.name)).set(repo);
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
