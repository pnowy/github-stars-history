import { http } from "@/services/http.service";
import { DateTime } from "luxon";

const sampleNum = 30; // number of samples for chart

const buildChartObject = (repoName, repoData) => {
  return {
    name: repoName,
    data: repoData
  };
};

/**
 * Get star history
 * @param {string} repoName - eg: 'pnowy/NativeCriteria'
 * @return {object} history - eg: { "2015-03-01": 12 }
 */
async function getStarHistory(repoName) {
  let sampleUrls = []; // store sampleUrls to be requested
  let pageIndexes = []; // used to calculate total stars for this page

  const initUrl = `https://api.github.com/repos/${repoName}/stargazers`; // used to get star info
  const initRes = await http.get(initUrl).catch(res => {
    throw "No such repo or network error!";
  });

  /**
   * link Sample (no link when star < 30):
   * <https://api.github.com/repositories/40237624/stargazers?access_token=2e71ec1017dda2220ccba0f6922ecefd9ea44ac7&page=2>; rel="next",
   * <https://api.github.com/repositories/40237624/stargazers?access_token=2e71ec1017dda2220ccba0f6922ecefd9ea44ac7&page=4>; rel="last"
   */
  const link = initRes.headers.link;

  // less than 30
  if (!link) {
    const repoData = {};
    for (let i = 0; i < initRes.data.length; i++) {
      repoData[`${initRes.data[i].starred_at.slice(0, 10)}`] = i + 1;
    }
    return buildChartObject(repoName, repoData);
  }

  const totalPageNum = /next.*?page=(\d*).*?last/.exec(link)[1]; // total page number

  // const queryData = [];
  // generate { sampleUrls, pageIndexes } accordingly
  if (totalPageNum <= sampleNum) {
    // TODO count how many stars you could get for specific page
    for (let i = 2; i <= totalPageNum; i++) {
      pageIndexes.push(i);
      sampleUrls.push(initUrl + "?page=" + i);
      // queryData.push({
      //   pageIndex
      // });
    }
  } else {
    for (let i = 1; i <= sampleNum; i++) {
      let pageIndex = Math.round((i / sampleNum) * totalPageNum) - 1; // for bootstrap bug
      pageIndexes.push(pageIndex);
      sampleUrls.push(initUrl + "?page=" + pageIndex);
    }
  }

  // console.log("pageIndexes", pageIndexes);

  // promisese to request sampleUrls
  const getArray = sampleUrls.map(url => http.get(url));

  const resArray = await Promise.all(getArray).catch(res => {
    throw "Github api limit exceeded, Try in the new hour!";
  });

  const starHistory = pageIndexes.map((pageNumber, index) => {
    return {
      date: resArray[index].data[0].starred_at.slice(0, 10),
      starNum: 30 * (pageNumber - 1)
    };
  });

  // Stars number for today (better view for repos with too much stars (>40000))
  const resForStarNum = await http
    .get(`https://api.github.com/repos/${repoName}`)
    .catch(res => {
      throw "Github api limit exceeded, Try in the new hour!";
    });
  const starNumToday = resForStarNum.data.stargazers_count;
  starHistory.push({
    date: DateTime.utc().toISODate(),
    starNum: starNumToday
  });

  const repoData = {};
  starHistory.forEach(item => (repoData[item.date] = item.starNum));
  return buildChartObject(repoName, repoData);
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
