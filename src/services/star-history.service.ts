/* tslint:disable:max-line-length */
import {http} from '@/services/http.service';
import {DateTime} from 'luxon';
import _ from 'lodash';

const NUMBER_OF_SAMPLES: number = 30; // number of samples for chart
const CHECK_NEW_STARS_AFTER_DAYS = 7;

/**
 * Creates single chart item
 *
 * @param repoName {string} repository name
 * @param repoData {Object} repository data
 * @param lastPage {number} last page with data
 */
const buildChartItem = (repoName: string, repoData: any, lastPage: any) => {
  const refreshAfter = DateTime.utc()
    .plus({days: CHECK_NEW_STARS_AFTER_DAYS})
    .toISO();
  return {
    name: repoName,
    data: repoData,
    refreshAfter,
    lastPage,
    refreshed: true,
  };
};

/**
 * Converts error to internal structure.
 */
const convertError = (repoName: string, res: any) => {
  const {data, status, statusText} = res.response;
  throw {
    data,
    status,
    statusText: `Repository '${repoName}' ${statusText}`,
  };
};

/**
 * Get star history
 * @param {string} repoName - eg: 'pnowy/NativeCriteria'
 * @param {number} lastPage - load results from given page
 * @param {Object} currentData - repo data
 *
 * @return {object} history - eg: { "2015-03-01": 12 }
 */
async function getStarHistory(repoName: string, lastPage = 0, currentData: any) {
  const querySpecification = [];

  const initUrl = `https://api.github.com/repos/${repoName}/stargazers`; // used to get star info
  const initRes = await http.get(initUrl).catch((res) => {
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
    // tslint:disable-next-line:no-shadowed-variable
    const repoData: any = {};
    const initRequestData = initRes.data;
    for (let i = 0; i < initRequestData.length; i++) {
      // star date : star numbers
      repoData[`${initRequestData[i].starred_at.slice(0, 10)}`] = i + 1;
    }
    return buildChartItem(repoName, repoData, lastPage);
  }

  // @ts-ignore
  const totalPageNum: any = /next.*?page=(\d*).*?last/.exec(link)[1]; // total page number
  const pagesToLoad: number = totalPageNum - lastPage;
  // just in case if there is no pages to load return current data
  if (pagesToLoad === 0 && currentData) {
    return buildChartItem(repoName, currentData, totalPageNum);
  }

  if (pagesToLoad <= NUMBER_OF_SAMPLES) {
    // for repos which have less than 30 pages we have to get more than one sample per page
    // @ts-ignore
    const samplesForPage: number = parseInt(NUMBER_OF_SAMPLES / pagesToLoad, 10);
    // count step (to get indexes)
    const step = NUMBER_OF_SAMPLES / samplesForPage;
    // generate array with indexes by counted step
    const dataIndexes = _.range(0, NUMBER_OF_SAMPLES, step).map((v) =>
      Math.floor(v),
    );
    // limit array if more that expected number of samples per page
    dataIndexes.length = samplesForPage;
    for (let i = lastPage; i <= totalPageNum; i++) {
      querySpecification.push({
        url: initUrl + '?page=' + i,
        pageIndex: i,
        dataIndexes,
      });
    }
  } else {
    // for repos with more than 30 pages get only single item from page (to keep 30 samples for chart)
    for (let i = lastPage; i <= NUMBER_OF_SAMPLES; i++) {
      const pageIndex = Math.round((i / NUMBER_OF_SAMPLES) * pagesToLoad) - 1;
      querySpecification.push({
        url: initUrl + '?page=' + pageIndex,
        pageIndex,
        dataIndexes: [0],
      });
    }
  }

  const queryPromises = querySpecification.map((r) => http.get(r.url));
  const responses = await Promise.all(queryPromises).catch((res) => {
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

  // Stars number for today (better view for repos with too much stars (>40000))
  const currentStarsNumberResponse = await http
    .get(`https://api.github.com/repos/${repoName}`)
    .catch((res) => {
      return convertError(repoName, res);
    });
  const starNumToday = currentStarsNumberResponse.data.stargazers_count;
  starHistory.push({
    date: DateTime.utc().toISODate(),
    starNum: starNumToday,
  });

  const repoData: any = {};
  starHistory.forEach((item) => (repoData[item.date] = item.starNum));
  const concatenatedData = Object.assign(currentData || {}, repoData);
  return buildChartItem(repoName, concatenatedData, totalPageNum);
}

export default {getStarHistory};

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
