<template>
<router-link to="/"
>
<img class='logo-img' src="./assets/logo.png" alt="logo"/>

<div class="logo-title">
  Cluster - ToDoApp
  </div>
</router-link>
<home/>
</template>
<script>
import Home from "../src/components/logical/Home";
export default {
  components: {
    home: Home,
  },
  created(){
    console.log('created ',this);
  }
};
</script>
<style>
    #app {
      height: 100%;
      /* background-color:gray; */
    }
    .logo{
     float: left;
    }
   .logo-img{
    width:100px;
    height: 60px;
    transition: transform .5s ease-out;
  }

  .logo-img:hover{
    transform: rotate(-90deg);
  }
  .logo-title{
    color: orange;
    position: absolute;
    width: 11%;
    top: 15px;
    left: 80px;
    /* border: 1px solid blue; */
  }
</style>
