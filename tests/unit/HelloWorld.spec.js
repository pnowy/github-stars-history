// import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";
import starHistoryService from "@/services/starHistory.service";

describe("SimpleUnitTest", () => {
  it("renders props.msg when passed", async () => {
    // expect(wrapper.text()).toMatch(msg);
    console.log("unit test example");
    // const links = await startHistoryService.generateUrls("pnowy/NativeCriteria");
    // const links = await startHistoryService.generateUrls("vuejs/vue");
    // console.log(links);
    // const data = await starHistoryService.getStarHistory("vuejs/vue");
    const data = await starHistoryService.getStarHistory("facebook/react");
    console.log(data);
  });
});
