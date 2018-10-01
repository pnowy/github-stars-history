import { http } from "@/services/http.service";
import { DateTime } from "luxon";
import _ from "lodash";

const NUMBER_OF_SAMPLES = 30; // number of samples for chart
const CACHE_RETENTION_DAYS = 7;

const range = (from, to, step) =>
  Array(Math.floor((to - from) / step) + 1)
    .fill(0)
    .map((_v, i) => from + i * step);

/**
 * Creates single chart item
 * @param repoName {String} repository name
 * @param repoData {Object} repository data
 */
const buildChartItem = (repoName, repoData) => {
  const validUntil = DateTime.utc()
    .plus({ days: CACHE_RETENTION_DAYS })
    .toISO();
  return {
    name: repoName,
    data: repoData,
    fromGithubApi: true,
    validUntil
  };
};

/**
 * Converts error to internal structure.
 */
const convertError = (repoName, res) => {
  const { data, status, statusText } = res.response;
  throw {
    data,
    status,
    statusText: `Repository '${repoName}' ${statusText}`
  };
};

/**
 * Get star history
 * @param {string} repoName - eg: 'pnowy/NativeCriteria'
 * @return {object} history - eg: { "2015-03-01": 12 }
 */
async function getStarHistory(repoName) {
  const querySpecification = [];

  const initUrl = `https://api.github.com/repos/${repoName}/stargazers`; // used to get star info
  const initRes = await http.get(initUrl).catch(res => {
    return convertError(repoName, res);
  });

  /**
   * link Sample (no link when star < 30):
   * <https://api.github.com/repositories/40237624/stargazers?access_token=2e71ec1017dda2220ccba0f6922ecefd9ea44ac7&page=2>; rel="next",
   * <https://api.github.com/repositories/40237624/stargazers?access_token=2e71ec1017dda2220ccba0f6922ecefd9ea44ac7&page=4>; rel="last"
   */
  const link = initRes.headers.link;

  // repos with less than 30 stars
  if (!link) {
    const repoData = {};
    let initRequestData = initRes.data;
    for (let i = 0; i < initRequestData.length; i++) {
      // star date : star numbers
      repoData[`${initRequestData[i].starred_at.slice(0, 10)}`] = i + 1;
    }
    return buildChartItem(repoName, repoData);
  }

  const totalPageNum = /next.*?page=(\d*).*?last/.exec(link)[1]; // total page number

  if (totalPageNum <= NUMBER_OF_SAMPLES) {
    // for repos which have less than 30 pages we have to get more than one sample per page
    const samplesForPage = parseInt(NUMBER_OF_SAMPLES / totalPageNum, 10);
    // count step (to get indexes)
    const step = NUMBER_OF_SAMPLES / samplesForPage;
    // generate array with indexes by counted step
    const dataIndexes = range(0, NUMBER_OF_SAMPLES, step);
    // limit array if more that expected number of samples per page
    dataIndexes.length = samplesForPage;
    for (let i = 1; i <= totalPageNum; i++) {
      querySpecification.push({
        url: initUrl + "?page=" + i,
        pageIndex: i,
        dataIndexes
      });
    }
  } else {
    // for repos with more than 30 pages get only single item from page (to keep 30 samples for chart)
    for (let i = 1; i <= NUMBER_OF_SAMPLES; i++) {
      const pageIndex = Math.round((i / NUMBER_OF_SAMPLES) * totalPageNum) - 1;
      querySpecification.push({
        url: initUrl + "?page=" + pageIndex,
        pageIndex,
        dataIndexes: [0]
      });
    }
  }

  const queryPromises = querySpecification.map(r => http.get(r.url));
  const responses = await Promise.all(queryPromises).catch(res => {
    return convertError(repoName, res);
  });

  const starHistory = _.flatMap(querySpecification, (spec, index) => {
    const { data } = responses[index];
    // retrieve data under specified indexes on given page
    return spec.dataIndexes
      .filter(dataIndex => dataIndex < data.length) // skip latest not full pages
      .map(dataIndex => {
        return {
          date: data[dataIndex].starred_at.slice(0, 10),
          starNum: 30 * (spec.pageIndex - 1) + dataIndex
        };
      });
  });

  // Stars number for today (better view for repos with too much stars (>40000))
  const currentStarsNumberResponse = await http
    .get(`https://api.github.com/repos/${repoName}`)
    .catch(res => {
      return convertError(repoName, res);
    });
  const starNumToday = currentStarsNumberResponse.data.stargazers_count;
  starHistory.push({
    date: DateTime.utc().toISODate(),
    starNum: starNumToday
  });

  const repoData = {};
  starHistory.forEach(item => (repoData[item.date] = item.starNum));
  return buildChartItem(repoName, repoData);
}

export default { getStarHistory };

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
