<template>
    <div class="menu">
        <div class="menu-items">
            <span class="item uname">welcome {{user}}</span>
               <span class="item" @click="goToLogin">logout</span>
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
        right: 10px;
       
        font-size: 20px;
        float:right;
        color: white;
        text-decoration: none;
        
    }

    .item{
        padding: 10px;
        cursor: pointer;
        transition: 0.5s;
        margin: 5px;
    }

    .item:hover:not(.uname){
        background-color: #f33e414b;
    }
</style>