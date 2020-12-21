<template>
    <div class="menu">
        <div class="menu-items">
               <router-link to="/"><span>logout</span></router-link>
                <a><span>{{user}}</span></a>
        </div>
    </div>
</template>
<script>

export default {
    name:"MenuBar",
   props:['user']
};
</script>
<style scoped>
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
    .menu-items a{
        padding: 12px;
        margin-right: 50px;
        /* border: 2px solid red; */
        font-size: 20px;
        float:right;
        color: white;
        text-decoration: none;
        
    }
</style>