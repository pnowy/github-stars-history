// import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";
import starHistoryService from "@/services/starHistory.service";
import { DateTime } from "luxon";

describe("SimpleUnitTest", () => {
  it("renders props.msg when passed", async () => {
    // expect(wrapper.text()).toMatch(msg);
    console.log("unit test example");
    // const links = await startHistoryService.generateUrls("pnowy/NativeCriteria");
    // const links = await startHistoryService.generateUrls("vuejs/vue");
    // console.log(links);
    // const vue = await starHistoryService.getStarHistory("vuejs/vue");
    // console.log(vue);
    // const react = await starHistoryService.getStarHistory("facebook/react");
    // console.log(react);

    const spring = await starHistoryService.getStarHistory(
      "spring-projects/spring-boot"
    );
    console.log(spring);
    // console.log(DateTime.utc().toISODate());
  });
});
