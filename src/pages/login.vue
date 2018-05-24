<script src="./login.js" type="application/javascript"></script>
<template>
  <div class="flex justify-center full-height">
    <div class="card text-white text-center width-3of4 bg-width-2of5 gt-bg-width-1of4 sm-auto " id="login">
      <div class="card-content bg-white ">
        <div class="stacked-label">
          <input required class="full-width" type="email" v-model="username">
          <label>Username</label>
        </div>
        <div class="stacked-label">
          <input required class="full-width" type="password" v-model="password">
          <label>Password</label>
        </div>
      </div>
      <div class="card-actions inline-block vertical-middle">
        <button class="teal fit " v-on:click="login()">Login</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card {
    margin-bottom: 0px;
  }

  .card-content {
    min-height: 160px;
  }

  button {
    margin-bottom: 4%;
  }

  h4 {
    font-weight: 300;
  }
</style>
