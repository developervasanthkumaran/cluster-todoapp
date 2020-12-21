import {createApp}  from 'vue'
import App from './App.vue'
import router from './router/index'
import {createStore} from 'vuex'
import 'es6-promise/auto'


const user = [
    {
      maintask:{
        name:'new task 1',
        noOfSubtasks : 2,
        isCompleted:true
      },
      subtask:[
        {name:'sub task 1 hey ',hasFinished:false},
        {name:'sub task 2 heloo',hasFinished:false}
      ]
    },
    {
      maintask:{
        name:'new task 2',
        noOfSubtasks : 2,
        isCompleted:true
      },
      subtask:[
        {name:'sub task 1 new atask',hasFinished:false},
        {name:'sub task 2 ballalale',hasFinished:false}
      ]
    }
]

console.log(user)

export const store = createStore({
    state () {
      return {
        TaskList:[],
        currentMainTask:null
      }
    }
  })

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
app.config.globalProperties.$taskList = store.state.TaskList
// const Users = {username:'vasanth',password:'vk'}
//  const Task = ['collect details','make a project design'];

