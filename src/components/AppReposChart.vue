<template>
  <div class="chart__container vld-parent">

    <div class="columns" v-for="loader in loaders">
      <div class="column is-half is-offset-one-quarter has-text-centered">
        <b-progress type="is-success" show-value>
          Loading repo &nbsp;<span class="is-bold">'{{ loader.repoName }}'</span> &nbsp; ...
        </b-progress>
      </div>
    </div>

    <div v-if="reposData && reposData.length">
      <line-chart
              :library="config"
              :data="reposData"
              height="800px"
              width="100%"
              ytitle="Stars"
              legend="top"
      />
    </div>

  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {DateTime} from 'luxon';
import starHistoryService from '@/services/star-history.service';
import notificationService from '@/services/notification.service';
import firebase from 'firebase/app';
import 'firebase/database';
// @ts-ignore
import {encode} from 'firebase-encode';
import {FetchStarsError, Repository} from '@/models';
import _ from 'lodash';

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
const firebaseReposRef = db.ref('repos_v3');

export interface LoadingItem {
  repoName: string;
  loading: boolean;
}

@Component({
  components: {},
})
export default class AppReposChart extends Vue {
  @Prop() public repos!: string[];

  private reposData: Repository[] = [];
  private loaders: LoadingItem[] = [];
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

  @Watch('repos')
  public onReposChanged() {
    this.reloadRepos();
  }

  private created() {
    this.reloadRepos();
  }

  private async reloadRepos() {
    this.reposData = [];
    this.loaders = [];

    this.repos.forEach((repoName) => {
      this.loaders.push({
        repoName,
        loading: true,
      });
      this.getRepoData(repoName)
        .then((repository: Repository) => {
          this.reposData.push(repository);
          if (repository.requiredCacheUpdate) {
            this.saveRepoToStore(repository);
          }
        })
        .catch((e: FetchStarsError) => {
          notificationService.error(e.statusText);
        })
        .finally(() => {
          _.remove(this.loaders, (li) => li.repoName === repoName);
          this.$forceUpdate();
        });
    });
  }

  private getRepoData(repoName: string): Promise<Repository> {
    return new Promise<Repository>((resolve) => {
      firebaseReposRef.child(encode(repoName)).on('value', (snapshot) => {
        const repository: any = snapshot.val();
        if (!repository) {
          resolve(starHistoryService.getStarHistory(repoName));
        } else if (this.shouldRefreshRepo(repository)) {
          resolve(starHistoryService.fetchCurrentStars(repository));
        } else {
          resolve(repository);
        }
      });
    }).catch((e: FetchStarsError) => {
      return Promise.reject(e);
    });
  }

  private saveRepoToStore(repo: Repository) {
    repo.requiredCacheUpdate = false; // set to false before save to firebase
    firebaseReposRef.child(encode(repo.name)).set(repo);
  }

  private shouldRefreshRepo(repository: Repository) {
    const now = DateTime.utc();
    const lastRefreshDatePlusWeek = DateTime.fromISO(repository.lastRefreshDate).plus({days: 7});
    return now > lastRefreshDatePlusWeek;
  }
}
</script>

<style scoped>
  .chart__container {
    width: 100%;
    height: 100%;
  }
</style>
