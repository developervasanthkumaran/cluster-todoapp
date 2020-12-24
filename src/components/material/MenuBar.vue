<template>
    <div class="menu">
        <div class="menu-items">
               <span class="item" @click="goToLogin">logout</span>
                <span class="item">{{user}}</span>
        </div>
    </div>
</template>
<script>

export default {
    name:"MenuBar",
   props:['user'],
   methods:{
       goToLogin(){
           this.$store.commit('toggleUserSession')
           this.$router.push('/');
       }
   }
};
</script>
<style>
    .menu{
        height: 10%;
        padding: 10px;
        top: 0;
        right: 0;
        float:right;
        position: absolute;
        /* border: 1px solid red; */
        /* background-color: #141530; */
    }
    .menu-items{
        padding: 12px;
        margin-right: 40px;
        /* border: 2px solid red; */
        font-size: 20px;
        float:right;
        color: white;
        text-decoration: none;
        
    }

    .item{
        padding-right: 20px;
    }
</style>