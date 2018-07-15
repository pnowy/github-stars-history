<template>
  <nav
    class="navbar is-light has-shadow is-spaced"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">

        <a class="navbar-item has-background-primary" href="/#">
          <!--GITHUB&nbsp;<b-icon pack="mdi" icon="star" />&nbsp;STARS-->
          GITHUB STARS
          <!--<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">-->
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
            <p class="control">
              <span class="title is-4" >GitHub stars history and charts</span>
            </p>
            <p class="control">
              <a class="bd-tw-button button" target="_blank" href="#">
              <span class="icon">
                <b-icon pack="mdi" icon="github-circle" />
              </span>
              </a>
            </p>
            <p class="control">
              <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.7.1/bulma-0.7.1.zip">
              <span class="icon">
                <i class="fas fa-download"></i>
              </span>
                <span>Download</span>
              </a>
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
</style>
