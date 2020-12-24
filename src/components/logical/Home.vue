<template>
  <div class="section">
    <router-view v-slot="{ Component }">
      <keep-alive>
      <component :is="Component"/>
      </keep-alive>
  </router-view>
  </div>
</template>
<script>
export default {
    name:'home'
}
</script>
<style>
    .section{
    /* background-color:orange; */
    height: 100%;
    display: flex;
    justify-content: center;
    width: 100%;
    /* border: 1px solid blue; */
  }

</style>