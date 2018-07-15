# Github star history

The missing github star history!

![Demo](demo.gif)

## Inspiration

The project was inspired by the [star-history](https://github.com/timqian/star-history) project.
I've extended the idea about option to add stacks in order to easier project comparision.

## Technology

The frontend part is written in Vue.js framework.

Under the hood the stars are cached in the Firebase database (because the Github API has limits chart data is saved in Firebase
for some limited time).

The user added stacks are saved in browser local storage (by the `vuex` and the `vuex-persistedstate` plugin).

## Issues & features

If you see the possibilities to improve the project create pull request or report the issue.
