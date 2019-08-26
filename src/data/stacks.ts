import {Stack} from '@/models';

const stacks: Stack[] = [
  {
    id: 'javascript-frameworks',
    name: 'javascript frameworks',
    repos: [
      'angular/angular',
      'angular/angular.js',
      'vuejs/vue',
      'facebook/react',
      'jashkenas/backbone',
      'emberjs/ember.js',
      'jquery/jquery',
    ],
    predefined: true,
  },
  {
    id: 'java-rest-frameworks',
    name: 'java rest frameworks',
    repos: [
      'spring-projects/spring-boot',
      'dropwizard/dropwizard',
      'spring-projects/spring-framework',
      'playframework/playframework',
      'resteasy/Resteasy',
      'restlet/restlet-framework-java',
      'perwendel/spark',
    ],
    predefined: true,
  },
  {
    id: 'js-utils-libs',
    name: 'javascript utilities',
    repos: [
      'lodash/lodash',
      'jashkenas/underscore',
      'dtao/lazy.js',
      'ramda/ramda',
      'josdejong/mathjs',
      'moment/moment',
      'date-fns/date-fns',
      'andrewplummer/Sugar',
    ],
    predefined: true,
  },
  {
    id: 'static-site-generators',
    name: 'static site generators',
    repos: [
      'jekyll/jekyll',
      'zeit/next.js',
      'gohugoio/hugo',
      'gatsbyjs/gatsby',
      'hexojs/hexo',
      'vuejs/vuepress',
      'nuxt/nuxt.js',
    ],
    predefined: true,
  },
  {
    id: 'pnowy',
    name: 'pnowy projects',
    repos: [
      'pnowy/github-stars-history',
      'pnowy/NativeCriteria',
      'pnowy/git-cheat-sheet',
      'pnowy/intellij-color-theme',
      'pnowy/django-cheat-sheet',
    ],
    predefined: true,
  },
  {
    id: 'text-editors',
    name: 'text editors',
    repos: [
      'adobe/brackets',
      'atom/atom',
      'atom/xray',
      'Microsoft/vscode',
      'notepad-plus-plus/notepad-plus-plus',
      'onivim/oni',
      'syl20bnr/spacemacs',
    ],
    predefined: true,
  },
];

export default stacks;
