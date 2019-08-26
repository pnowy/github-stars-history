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
<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
// @ts-ignore
import Loading from 'vue-loading-overlay';
import {DateTime} from 'luxon';
import starHistoryService from '@/services/star-history.service';
import notificationService from '@/services/notification.service';
import firebase from 'firebase/app';
import 'firebase/database';
// @ts-ignore
import {encode} from 'firebase-encode';

const config = {
  apiKey: 'AIzaSyBPuZu6gbYL_IxW6UCYusHHrbzxHpsWNSE',
  authDomain: 'github-stars-history.firebaseapp.com',
  databaseURL: 'https://github-stars-history.firebaseio.com',
  projectId: 'github-stars-history',
  storageBucket: 'github-stars-history.appspot.com',
  messagingSenderId: '860963673180',
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database();
const firebaseReposRef = db.ref('repos_v2');

@Component({
  components: {
    Loading,
  },
})
export default class AppReposChart extends Vue {
  @Prop() public repos!: string[];

  private reposData: any[] | null = [];
  private config: any = {
    tooltip: {
      xDateFormat: '%Y-%m-%d',
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
  };
  private isLoading = false;

  @Watch('repos')
  public onReposChanged(val: string, oldVal: string) {
    this.reloadRepos();
  }

  private created() {
    this.reloadRepos();
  }

  private async reloadRepos() {
    this.isLoading = true;

    const dataPromises = this.repos.map((repoName) =>
      this.getRepoData(repoName),
    );

    // @ts-ignore
    this.reposData = await Promise.all(dataPromises)
      .catch((res) => {
        this.reposData = [];
        notificationService.error('Problem with stack repos data!');
      })
      .finally(() => {
        this.isLoading = false;
      });

    // @ts-ignore
    this.reposData
      .filter((repo) => repo.refreshed)
      .forEach((repo) => {
        this.saveRepoToStore(repo);
      });
  }

  private shouldRefreshRepo(repo: any) {
    const now = DateTime.utc();
    return (
      repo &&
      repo.refreshAfter &&
      now > DateTime.fromISO(repo.refreshAfter, {zone: 'utc'})
    );
  }

  private getRepoData(repoName: string) {
    return new Promise((resolve) => {
      firebaseReposRef.child(encode(repoName)).on('value', (snapshot) => {
        const repo = snapshot.val();
        if (!repo || this.shouldRefreshRepo(repo)) {
          const repoVar = repo || {};
          resolve(
            starHistoryService.getStarHistory(
              repoName,
              repoVar.lastPage,
              repoVar.data,
            ),
          );
        } else {
          resolve(repo);
        }
      });
    }).catch((e) => {
      notificationService.error(e.statusText);
      return {
        name: repoName,
        data: [],
      };
    });
  }

  private saveRepoToStore(repo: any) {
    delete repo.refreshed; // delete before save to firebase
    firebaseReposRef.child(encode(repo.name)).set(repo);
  }
}
</script>

<style scoped>
  .chart__container {
    width: 100%;
    height: 100%;
  }
</style>
