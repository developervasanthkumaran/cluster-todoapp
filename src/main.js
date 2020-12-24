import {createApp}  from 'vue'
import App from './App.vue'
import router from './router/index'
import {createStore} from 'vuex'
import 'es6-promise/auto'
import axios from 'axios'
import  VueAxios  from 'vue-axios'
import createPersistedState from "vuex-persistedstate";

const user = [
    {
      maintask:{
        name:'new task 1',
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
  plugins:[createPersistedState()],
  state () {
    return {
      userTodoList:[],
      user_id:null,
      username:null,
      isAuthenticated:false
    }
  },
  actions:{
      async getTodoListAsync({commit,state}){
         await getRequest('users/todolist/'+state.user_id,{}).then((result) => {
          if(result.data.maintask.length > 0){
             commit('setUserTodoList', { maintask: result.data.maintask });
           }
           else{
             commit('setUserTodoList',[]);
           }
        });
     },
     async addMainTaskAsync({dispatch,state},payload){
      await postRequest('users/todolist/maintask/'+state.user_id,payload).then((result) => {
       if(result){
          dispatch('getTodoListAsync');
        }
     });
    },
    async addSubTaskAsync({dispatch,state},payload){
      await postRequest('users/todolist/subtask/'+state.user_id+'/'+payload.m_id,payload.sub).then((result) => {
       if(result){
          dispatch('getTodoListAsync');
        }
     });
    },
    async updateMainTaskAsync({dispatch,state},payload){
      const url = 'users/todolist/maintask/'+state.user_id+'/'+payload.m_id;
      await putRequest(url,payload.maintask).then((result) => {
       if(result){
          dispatch('getTodoListAsync');
        }
     });
    },
    async updateSubTaskAsync({dispatch,state},payload){
      const url = 'users/todolist/subtask/'+state.user_id+'/'+payload.m_id+'/'+payload.s_id;
      await putRequest(url,payload.subtask).then((result) => {
       if(result){
          dispatch('getTodoListAsync');
        }
     });
    },
    async deleteMainTaskAsync({dispatch,state},payload){
      const url = 'users/todolist/maintask/'+state.user_id+'/'+payload.m_id;
      await deleteRequest(url,{}).then((result) => {
       if(result){
          dispatch('getTodoListAsync');
        }
     });
    },
    async deleteSubTaskAsync({dispatch,state},payload){
      const url = 'users/todolist/subtask/'+state.user_id+'/'+payload.m_id+'/'+payload.s_id;
      await deleteRequest(url,{}).then((result) => {
       if(result){
          dispatch('getTodoListAsync');
        }
     });
    }
  },
  mutations:{
      setUserTodoList(state,payload){
        state.userTodoList  =  payload.maintask;
      },
      setUserDetails(state,payload){
        console.log('username and pass ',payload.username,payload.user_id);
          state.user_id = payload.user_id;
          state.username = payload.username;
      },
      toggleUserSession(state){
          state.isAuthenticated  = !state.isAuthenticated;
      }
  },
  getters:{
      getUserName:(state)=>{
        return state.username;
      },
      isUserAuthenticated:(state)=>{
        return state.isAuthenticated;
      },
      getUserTodoList(state){
          return state.userTodoList;
      },
      getUserId:(state)=>{
        return state.user_id;
      }
  }
  })

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAxios,axios)
app.mount('#app')



export const baseUrl = 'http://localhost:8000/'
export const instance = axios.create({
    headers: {
    'X-Custom-Header': 'foobar',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
  });

  export async function getRequest(url,payload){
    console.log(baseUrl+url, payload);
    return await instance.get(baseUrl+url,payload)
    .then( function(response) {
      console.log(response, response.data);
      return response;
     })
     .catch(function (error) {
         console.log(error);
     });
}

export async function postRequest(url,payload){
return await instance.post(baseUrl+url,payload)
   .then( function(response) {
    return response;
   })
   .catch(function (error) {
       console.log(error);
   });
}

export async function deleteRequest(url,payload){
  return await instance.delete(baseUrl+url,payload)
     .then( function(response) {
      return response;
     })
     .catch(function (error) {
         console.log(error);
     });
  }

  export async function putRequest(url,payload){
    return await instance.put(baseUrl+url,payload)
       .then( function(response) {
        return response;
       })
       .catch(function (error) {
           console.log(error);
       });
    }

app.config.globalProperties.$userTodoList = store.state.userTodoList

