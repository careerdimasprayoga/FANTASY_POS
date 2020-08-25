<template>
  <!-- Navbar -->
  <div class="d-flex">
    <section>
      <b-container fluid>
        <b-row>
          <b-col cols="8">
            <div class="navbarOne">
              tes
            </div>
          </b-col>
          <b-col cols="4">
            <div class="navbarTwo">
              tes
            </div>
          </b-col>
        </b-row>
      </b-container>
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/axios">Axios</router-link> |
        <router-link to="lifecycle">Lifecycle</router-link>
      </div>
    </section>
  </div>
  <!-- End Navbar -->
</template>

<style scoped>
.navbarOne {
  height: 70px;
  background-color: #ffffff;
  box-shadow: 1px 1px 10px grey;
  z-index: 1;
  border-left: #cecece 1px solid;
  border-right: #cecece 1px solid;
}
.navbarTwo {
  height: 70px;
  background-color: #ffffff;
  box-shadow: 1px 1px 10px grey;
  z-index: 1;
  border-left: #cecece 1px solid;
  border-right: #cecece 1px solid;
}
</style>
