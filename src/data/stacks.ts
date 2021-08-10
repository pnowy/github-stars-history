import {Stack} from '@/models';

const stacks: Stack[] = [
  {
    id: 'kubernetes-configuration-management',
    name: 'kubernetes configuration',
    repos: [
      'kubernetes-sigs/kustomize',
      'helm/helm',
      'ksonnet/ksonnet',
      'google/jsonnet',
    ],
    predefined: true,
  },
  {
    id: 'javascript-frameworks',
    name: 'javascript frameworks',
    repos: [
      'angular/angular',
      'angular/angular.js',
      'vuejs/vue',
      'facebook/react',
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
      'getzola/zola',
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
      'syl20bnr/spacemacs',
      'hlissner/doom-emacs',
      'neovim/neovim',
    ],
    predefined: true,
  },
  {
    id: 'screenshot-tools',
    name: 'screenshot-tools',
    repos: [
      'flameshot-org/flameshot',
      'ShareX/ShareX',
      'ksnip/ksnip',
      'olav-st/screencloud',
      'jomo/imgur-screenshot',
      'naelstrof/maim',
      'emersion/grim',
      'resurrecting-open-source-projects/scrot',
    ],
    predefined: true,
  },

];

export default stacks;
