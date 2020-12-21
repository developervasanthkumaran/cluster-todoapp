<template>
  <menu-bar user="vasanth" />
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
            <router-link :to="setRouteWithParams + m.name" >
               <span :style="m.isCompleted?addLineThrough:''">  {{ m.name }} </span>
            </router-link>
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
  created() {
    this.$router.afterEach((to) => {this.currentChildRoute = to.name})
  },
  components: {
    "menu-bar": MenuBar,
    "input-box": InputBox,
  },
   computed: {
    getmaintaskList() {
      let s = this.$taskList.map((obj) => {
        return obj.maintask;
      });
      return s;
    },
    setRouteWithParams(){
      return '/todoSub/'
    },
    isSubtaskFound(){
     return this.currentChildRoute === 'todoSub'?'':'hidden';
    },
    addLineThrough(){
        return "text-decoration:line-through;text-decoration-color:darkblue;text-decoration-thickness: 3px;";
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
    addMainTaskToList(val) {
      if(val.length === 0){alert('empty string found');return;}
      this.$taskList.push({
        maintask:{
        name:val,
        noOfSubtasks : 0
      },
      subtask:[]
      });
    },
    onMainTaskFinished(maintask){
        maintask.isCompleted = !maintask.isCompleted;
        if(maintask){
           this.$taskList.forEach(obj => {
            if(obj.maintask.name === maintask.name){
                obj.subtask.forEach((e)=>{e.hasFinished = maintask.isCompleted?true:false});
                return;
            }
        });
        }
    }
  }
};
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
  height:550px;
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
  padding: 15px;
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

</style>