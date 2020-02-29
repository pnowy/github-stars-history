/* tslint:disable:max-line-length */

import {http} from '@/services/http.service';
import {DateTime} from 'luxon';
import _ from 'lodash';
import {ChartItems, FetchStarsError, Repository} from '@/models';

const NUMBER_OF_SAMPLES: number = 30; // number of samples for chart
const PAGE_SIZE = 100

interface QuerySpecItem {
  url: string;
  pageIndex: number;
  dataIndexes: number[];
}

/**
 * Creates single chart item
 *
 * @param repoName {string} repository name
 * @param chartItems {ChartItems} repository data
 */
function createRepository(repoName: string, chartItems: ChartItems): Repository {
  return {
    name: repoName,
    data: chartItems || {},
    lastRefreshDate: DateTime.utc().toISO(),
    requiredCacheUpdate: true,
  };
}

/**
 * Converts error to internal structure.
 */
function convertError(repoName: string, res: any): FetchStarsError {
  const { status, statusText } = res.response;
  const forbidden = status === 403;
  throw {
    status,
    statusText: forbidden ? 'Unfortunately the limit of request to GitHub has been exceeded :(' : `Repository '${repoName}' ${statusText}`,
  };
}

async function fetchCurrentStars(repository: Repository): Promise<Repository> {
  const currentStarsNumberResponse: any = await http
    .get(`https://api.github.com/repos/${repository.name}`)
    .catch((res) => {
      return convertError(repository.name, res);
    });
  if (!repository.data) {
    repository.data = {};
  }
  repository.data[DateTime.utc().toISODate()] = currentStarsNumberResponse.data.stargazers_count;
  repository.requiredCacheUpdate = true;
  repository.lastRefreshDate = DateTime.utc().toISO();
  return repository;
}

/**
 * Get star history
 * @param {string} repoName - eg: 'pnowy/NativeCriteria'
 *
 * @return {object} history - eg: { "2015-03-01": 12 }
 */
async function getStarHistory(repoName: string): Promise<Repository> {
  const querySpecification: QuerySpecItem[] = [];

  const initUrl = `https://api.github.com/repos/${repoName}/stargazers?per_page=${PAGE_SIZE}`; // used to get star info
  const initRes: any = await http.get(initUrl).catch((res) => {
    return convertError(repoName, res);
  });

  /**
   * link Sample (no link when star < 30):
   * <https://api.github.com/repositories/40237624/stargazers?access_token=2e71ec1017dda2220ccba0f6922ecefd9ea44ac7&page=2>; rel="next",
   * <https://api.github.com/repositories/40237624/stargazers?access_token=2e71ec1017dda2220ccba0f6922ecefd9ea44ac7&page=4>; rel="last"
   */
  const link = initRes.headers.link;

  // repos with less than 30 stars (single page)
  if (!link) {
    const singlePageData: ChartItems = {};
    const initRequestData = initRes.data;
    for (let i = 0; i < initRequestData.length; i++) {
      // star date : star numbers
      singlePageData[`${initRequestData[i].starred_at.slice(0, 10)}`] = i + 1;
    }
    return createRepository(repoName, singlePageData);
  }

  // @ts-ignore
  const totalPageNum: any = /next.*?page=(\d*).*?last/.exec(link)[1]; // total page number
  if (totalPageNum <= NUMBER_OF_SAMPLES) {
    // for repos which have less than 30 pages we have to get more than one sample per page
    // @ts-ignore
    const samplesForPage: number = parseInt(NUMBER_OF_SAMPLES / totalPageNum, 10);
    // count step (to get indexes)
    const step = PAGE_SIZE / samplesForPage;
    // generate array with indexes by counted step
    const dataIndexes = _.range(0, PAGE_SIZE, step).map((v) =>
      Math.floor(v),
    );
    // limit array if more that expected number of samples per page
    dataIndexes.length = samplesForPage;
    for (let i = 1; i <= totalPageNum; i++) {
      querySpecification.push({
        url: initUrl + '&page=' + i,
        pageIndex: i,
        dataIndexes,
      });
    }
  } else {
    // for repos with more than 30 pages get only single item from page (to keep 30 samples for chart)
    for (let i = 1; i <= NUMBER_OF_SAMPLES; i++) {
      const pageIndex = Math.round((i / NUMBER_OF_SAMPLES) * totalPageNum) - 1;
      querySpecification.push({
        url: initUrl + '&page=' + pageIndex,
        pageIndex,
        dataIndexes: [0],
      });
    }
  }

  const queryPromises: Array<Promise<any>> = querySpecification.map(
    (querySpecItem) => http.get(querySpecItem.url),
  );
  const responses: any = await Promise.all(queryPromises).catch((res) => {
    return convertError(repoName, res);
  });

  const starHistory = _.flatMap(querySpecification, (spec, index) => {
    const {data} = responses[index];
    // retrieve data under specified indexes on given page
    return spec.dataIndexes
      .filter((dataIndex) => dataIndex < data.length) // skip latest not full pages
      .map((dataIndex) => {
        return {
          date: data[dataIndex].starred_at.slice(0, 10),
          starNum: 30 * (spec.pageIndex - 1) + dataIndex,
        };
      });
  });

  // stars number for today (better view for repos with too much stars (>40000))
  const currentStarsNumberResponse: any = await http
    .get(`https://api.github.com/repos/${repoName}`)
    .catch((res) => {
      return convertError(repoName, res);
    });
  const starNumToday = currentStarsNumberResponse.data.stargazers_count;
  starHistory.push({
    date: DateTime.utc().toISODate(),
    starNum: starNumToday,
  });

  const chartItems: ChartItems = {};
  starHistory.forEach((item) => (chartItems[item.date] = item.starNum));
  return createRepository(repoName, chartItems);
}

export default {getStarHistory, fetchCurrentStars};

// graphql query for version API 4

// {
//   repository(name: "vue", owner:"vuejs") {
//   name
//   stargazers(first:100, after: "Y3Vyc29yOnYyOpIAzgEfWJo=") {
//     totalCount
//     edges {
//       cursor
//       starredAt
//     }
//   }
// }
// }
