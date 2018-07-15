<template>
  <nav
    class="navbar is-light has-shadow is-spaced"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">

        <a class="navbar-item has-background-primary has-text-white has-text-weight-bold" href="/#">
          GITHUB STARS
          <!--<img src="../assets/logo.png">-->
        </a>

        <!--<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">-->
        <!--<span aria-hidden="true"></span>-->
        <!--<span aria-hidden="true"></span>-->
        <!--<span aria-hidden="true"></span>-->
        <!--</a>-->
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="field is-grouped">
            <p class="control paragraph--padding-top">
              <span class="title is-4" >GitHub stars history and charts</span>
            </p>
            <p class="control">
              <a class="bd-tw-button button" target="_blank" href="https://github.com/pnowy/github-stars-history">
              <span class="icon">
                <b-icon pack="mdi" icon="github-circle" />
              </span>
              </a>
            </p>
            <p class="control paragraph--padding-top">
              <a class="github-button" href="https://github.com/pnowy/github-stars-history" data-size="large" data-show-count="true" aria-label="Star pnowy/github-stars-history on GitHub">Star</a>
            </p>
          </div>
        </div>
      </div>

    </div>
  </nav>

</template>

<script>
export default {
  name: "AppHeader"
};
</script>

<style scoped>
  .paragraph--padding-top {
    padding-top: 5px;
  }
</style>
