<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
    <HelloWorld />
    <ul>
      <li v-for="(item,index) in articles" :key="index">
          {{item.content}}
      </li>
    </ul>
    <ul>
      <li v-for="(item,index) in listcategorys" :key="index">
          {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from '@/components/base.vue'
import articleApi from "../server/base"
export default {
  name: 'app',
  components: {
      HelloWorld,
  },
  data(){
    return{
      articles:[],
      listcategorys:[]
    }
  },
  mounted(){
    var that = this;
    let current,pageSize,keyword;
    let data = {
        current,pageSize,keyword
    }
    articleApi.articlelist(data).then(res=>{
    that.articles = res.data.items;
     console.log(res.data);
    })
    articleApi.fenlei().then(res=>{
    that.listcategorys = res;
      console.log(res.data);
    })
  }
}
</script>

<style lang="stylus" scope>
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
  ul
    li
      font-size 20px
      color red
</style>
