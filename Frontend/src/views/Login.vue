<template>
  <div class="custom-wrapper">
    <b-container>
      <b-row>
        <b-col sm="3">
          <label for="input-none" class="mt-3 ml-3">No State</label>
        </b-col>
        <b-col sm="8">
          <b-form-input id="input-none" :state="null" placeholder="No validation" class="mt-3 ml-3"></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3">
          <label for="input-valid" class="mt-3 ml-3">Valid State:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input
            id="input-valid"
            :state="true"
            placeholder="Valid input"
            class="mt-3 ml-3 mr-3"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-invalid">Invalid State:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-invalid" :state="false" placeholder="Invalid input"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
.custom-wrapper {
  width: 600px;
  border-radius: 10px;
  background-color: rosybrown;
}
</style>
