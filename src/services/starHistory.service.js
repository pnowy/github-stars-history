import { http } from "@/services/http.service";

const sampleNum = 30; // number of sample requests to do

/**
 * generate Urls and pageNums
 * @param {string} repoName - eg: 'timqian/jsCodeStructure'
 * @return {object} {sampleUrls, pageIndexes} - urls to be fatched(length <=10) and page indexes
 */
async function generateUrls(repoName) {
  let sampleUrls = []; // store sampleUrls to be rquested
  let pageIndexes = []; // used to calculate total stars for this page

  const initUrl = `https://api.github.com/repos/${repoName}/stargazers`; // used to get star infors
  const initRes = await http.get(initUrl).catch(res => {
    throw "No such repo or network error!";
  });

  /**
   * link Sample (no link when star < 30):
   * <https://api.github.com/repositories/40237624/stargazers?access_token=2e71ec1017dda2220ccba0f6922ecefd9ea44ac7&page=2>; rel="next",
   * <https://api.github.com/repositories/40237624/stargazers?access_token=2e71ec1017dda2220ccba0f6922ecefd9ea44ac7&page=4>; rel="last"
   */
  const link = initRes.headers.link;

  if (!link) {
    // TODO get all starts from page
    throw "Too few stars (less than 30)!";
  }

  const totalPageNum = /next.*?page=(\d*).*?last/.exec(link)[1]; // total page number

  // generate { sampleUrls, pageIndexes } accordingly
  if (totalPageNum <= sampleNum) {
    // TODO count how many stars you could get for specific page
    for (let i = 2; i <= totalPageNum; i++) {
      pageIndexes.push(i);
      sampleUrls.push(initUrl + "?page=" + i);
    }
  } else {
    for (let i = 1; i <= sampleNum; i++) {
      let pageIndex = Math.round((i / sampleNum) * totalPageNum) - 1; // for bootstrap bug
      pageIndexes.push(pageIndex);
      sampleUrls.push(initUrl + "?page=" + pageIndex);
    }
  }

  console.log("pageIndexes", pageIndexes);
  return { sampleUrls, pageIndexes };
}

/**
 * Get star history
 * @param {string} repoName - eg: 'pnowy/NativeCriteria'
 * @return {object} history - eg: {"2015-3-1": 12}
 */
async function getStarHistory(repoName) {
  const { sampleUrls, pageIndexes } = await generateUrls(repoName).catch(e => {
    throw e;
  });

  // promisese to request sampleUrls
  const getArray = sampleUrls.map(url => http.get(url));

  const resArray = await Promise.all(getArray).catch(res => {
    throw "Github api limit exceeded, Try in the new hour!";
  });

  const starHistory = pageIndexes.map((p, i) => {
    return {
      date: resArray[i].data[0].starred_at.slice(0, 10),
      starNum: 30 * (p - 1)
    };
  });

  // Better view for less star repos (#28) and for repos with too much stars (>40000)
  const resForStarNum = await http
    .get(`https://api.github.com/repos/${repoName}`)
    .catch(res => {
      throw "Github api limit exceeded, Try in the new hour!";
    });
  const starNumToday = resForStarNum.data.stargazers_count;
  const today = new Date();
  const monthFormat =
    today.getMonth() + 1 > 10
      ? today.getMonth() + 1
      : `0${today.getMonth() + 1}`;
  const dateFormat =
    today.getDate() > 10 ? today.getDate() : `0${today.getDate()}`;

  starHistory.push({
    date: `${today.getFullYear()}-${monthFormat}-${dateFormat}`,
    starNum: starNumToday
  });

  const repoData = {};
  starHistory.forEach(item => (repoData[item.date] = item.starNum));
  return {
    name: repoName,
    data: repoData
  };
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
