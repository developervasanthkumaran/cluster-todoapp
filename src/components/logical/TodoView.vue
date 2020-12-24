<template>
  <menu-bar :user="getUsername" />
  <div class="col-4 div-height">
    <div class="todo">
         <div class="todo-input">
        <input-box
          :input="mainInput"
          :description="MainTaskDescription"
          :maxLen="maxLength"
          @getValue="addMainTaskToList"
        />
      </div>
       <div class="todo-inner">
         <div class="todo-items">
          <div
            class="todo-item"
            v-for="(m, index) in getmaintaskList"
            v-bind:key="m"
          >
            <input type="checkbox" :id="index" @click="onMainTaskFinished(m)" :checked="m.isCompleted">
            <router-link :to="setRouteWithParams + m.name+'/'+m.m_id" >
               <span :style="m.isCompleted?addLineThrough:''">  {{ m.name }} </span>
            </router-link>
               <input class="del-btn" type="button" value="delete">
          </div>
          </div>

      </div>
    </div>
  </div>
  <div :class="'col-8 div-height '+isSubtaskFound">
    <b class="inform" v-if="isSubtaskFound === 'hidden'">click on added main task to add new sub tasks</b>
    <router-view />
  </div>
 
</template>
<script>
import MenuBar from "../material/MenuBar.vue";
import InputBox from "../material/InputBox";
export default {
  beforeRouteUpdate(to,from,next){
    console.log('comp changed ', from.name, " ",to.name);
      this.currentChildRoute = to.name;
      next();
  },
  components: {
    "menu-bar": MenuBar,
    "input-box": InputBox,
  },
   computed: {
     getmaintaskList() {
        return this.$store.getters.getUserTodoList;
    },
    setRouteWithParams(){
      return '/todoSub/'
    },
    isSubtaskFound(){
      return this.currentChildRoute === 'todoSub'?'':'hidden';
    },
    addLineThrough(){
        return "text-decoration:line-through;text-decoration-color:darkblue;text-decoration-thickness: 3px;";
    },
    getUsername(){
      return this.$store.getters.getUserName;
    },
    isUserAutheticated(){
      return this.$store.getters.isUserAutheticated;
    }
  },
  data() {
    return {
      mainInput: "maintaskInput",
      MainTaskDescription: "maintask..",
      maxLength: 50,
      currentChildRoute:'',
    };
  },
  methods: {
   async addMainTaskToList(val) {
      if(val.length === 0){alert('empty string found');return;}
      const payload = {
        name:val,
        isCompleted:false
      };
       this.$store.dispatch("addMainTaskAsync",payload);
    },
    onMainTaskFinished(maintask){
        maintask.isCompleted = !maintask.isCompleted;
        if(maintask){
           this.$store.getters.getUserTodoList.forEach(obj => {
            if(obj.m_id === maintask.m_id){
                obj.subtask.forEach((e)=>{e.isCompleted = maintask.isCompleted?true:false});
                return;
            }
        });
        }
    }
  }
}
</script>
<style >

.todo {
  height: auto;
  width: auto;
  background-color:rgba(173, 216, 230, 0.24);
  border-radius: 10px;
  /* border: 1px solid red; */
}
.todo-inner {
  height:560px;
  overflow:auto;
    background:rgba(255, 255, 255, 0.884);
}

::-webkit-scrollbar {
  display: none;
}
.todo-items {
  text-align: left;
} 
.todo-item{
  padding: 25px;
  font: 30px;
  color: black;
  /* background-color:#1a1f3f; */
  background-color: rgb(143, 12, 88);
  margin: 5px;
}
.div-height{
    position: relative;
    height: 650px;
}
a{
  text-decoration: none;
  color: black;
}
.hidden{
  background-color: rgba(52, 50, 172, 0.281);
  border: 2px solid rgb(52, 50, 172);
}

input[type="checkbox"]:checked{
  background:red;
}

.inform{
  top: 20%;
  left: 20%;
  font-size: 30px;
  color: rgba(255, 0, 0, 0.801);
  position: absolute;
}

.del-btn{
  width: 10%;
  right: 5px;
  position: absolute;
  margin: 3px;
  border: 2px solid red;
}

</style>