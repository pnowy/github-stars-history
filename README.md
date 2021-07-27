# Github star history

The missing github star history!

![Demo](demo.gif)

## Inspiration

The project was inspired by the [star-history](https://github.com/timqian/star-history) project.
I've extended the idea about option to add stacks in order to easier project comparision.

With this project you could observe and monitor specific github repos and simply compare is with other repos. 

## I would like to add new predefined repo or stack

If you would like to extend current predefined stack or create new stack create pull request to the 
[stacks.ts](https://github.com/pnowy/github-stars-history/blob/master/src/data/stacks.ts) file.

For new stack just add new object within array (consistent with specification of other stacks) and for new repo just
add new repo name (must have owner and repo name, ie. `pnowy/github-stars-history`).

Please remember that predefined stack needs `predefined: true` property in order display for all users. 

## Technology

The frontend part is written in [Vue.js](https://vuejs.org/) framework with Typescript support. The visual part has been made with [Bulma CSS framework](https://bulma.io/).

Under the hood the stars are cached in the Firebase database (because the Github API has limits chart data is saved in Firebase
for some limited time).

The user added stacks are saved in browser local storage (by the `vuex` and the `vuex-persistedstate` plugin).

The project is deployed on fantastic platform [Netlify](https://www.netlify.com/).

## Issues & features

If you see the possibilities to improve the project create pull request or report the issue.
