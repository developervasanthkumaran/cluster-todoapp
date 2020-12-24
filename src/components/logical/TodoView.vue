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
            <input
              type="checkbox"
              :id="index"
              @click="onMainTaskFinished(m)"
              :checked="m.isCompleted"
            />
            <router-link :to="setRouteWithParams + m.name + '/' + m.m_id">
              <span :style="m.isCompleted ? addLineThrough : ''">
                {{ m.name }}
              </span>
            </router-link>
            <input
              class="del-btn"
              type="button"
              value="delete"
              @click="deleteMainTask(m)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div :class="'col-8 div-height ' + isSubtaskFound">
    <b class="inform" v-if="isSubtaskFound === 'hidden'"
      >&#128072; select primary todos to add more todos</b
    >
    <router-view />
  </div>
</template>
<script>
import MenuBar from "../material/MenuBar.vue";
import InputBox from "../material/InputBox";
export default {
  beforeRouteEnter(to, from, next) {
    console.log("route enter changed ", from.name, " ", to.name);
    next((vm) => {
      vm.currentChildRoute = to.name;
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log("route leave changed ", from.name, " ", to.name);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("route uodate changed ", from.name, " ", to.name);
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
    setRouteWithParams() {
      return "/todoSub/";
    },
    isSubtaskFound() {
      const k = this.currentChildRoute;
      console.log(k);
      return k === "todoSub" || k === "todoView" ? "" : "hidden";
    },
    addLineThrough() {
      return "text-decoration:line-through;text-decoration-color:darkblue;text-decoration-thickness: 3px;";
    },
    getUsername() {
      return this.$store.getters.getUserName;
    },
    isUserAutheticated() {
      return this.$store.getters.isUserAutheticated;
    },
  },
  data() {
    return {
      mainInput: "maintaskInput",
      MainTaskDescription: "add your primary todos",
      maxLength: 50,
      currentChildRoute: "",
    };
  },
  methods: {
    async addMainTaskToList(val) {
      if (val.length === 0) {
        alert("empty string found");
        return;
      }
      const payload = {
        name: val,
        isCompleted: false,
      };
      this.$store.dispatch("addMainTaskAsync", payload);
    },
    async deleteMainTask(m) {
      const payload = {
        m_id: m.m_id,
      };
      this.$store.dispatch("deleteMainTaskAsync", payload);
    },
    async onMainTaskFinished(maintask) {
      maintask.isCompleted = !maintask.isCompleted;
      if (maintask) {
        maintask.subtask.forEach((e) => {
          e.isCompleted = maintask.isCompleted ? true : false;
        });
        const payload = {
          m_id: maintask.m_id,
          maintask: maintask,
        };
        this.$store.dispatch("updateMainTaskAsync", payload);
        return;
      }
    },
  },
};
</script>
<style >
.todo {
  height: auto;
  width: auto;
  /* background-color: rgba(173, 216, 230, 0.24); */
  background-color: #fcf8ff;
  border-radius: 10px;
  /* border: 1px solid red; */
}
.todo-inner {
  height: 560px;
  overflow: auto;
  background: rgba(255, 255, 255, 0.884);
}

::-webkit-scrollbar {
  display: none;
}
.todo-items {
  text-align: left;
}
.todo-item {
  padding: 25px;
  font: 30px;
  /* background-color: rgba(10, 32, 95, 0.952); */
  background-color: #592d97;
  margin: 5px;
}
.div-height {
  position: relative;
  height: 650px;
}
a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.87);
}
.hidden {
  background-color: rgba(52, 50, 172, 0.281);
  border: 2px solid rgb(52, 50, 172);
}

input[type="checkbox"]:checked {
  background: red;
}

.inform {
  top: 20%;
  left: 25%;
  font-size: 25px;
  font: italic;
  font-weight: 50;
  color: rgba(255, 0, 0, 0.801);
  position: absolute;
}

.del-btn {
  right: -12px;
  width: 85px !important;
  float: right;
  background-color: rgba(226, 14, 14, 0.63) !important;
  position: relative;
  padding: 8px !important;
  margin: 1px !important;
}
</style>