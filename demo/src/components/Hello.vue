<template>
  <div class="hello">
    <input type="text" :model="search" @keyup="rechercher">
    <ul>
    <li v-for="post in posts"> {{post.title}}</li>
    </ul>
    
  </div>
</template>

<script>
export default {
  name: 'hello',
created(){
  console.log("Je suis la");
  this.$http.get('http://localhost:3000').then((res) =>{
  this.posts = res.body;
  });
},
  data () {
    return {
      msg: 'How to filter search results with Vue',
      search : "",
      posts: []
    }
  },

 methods : {
   rechercher(){
     this.$http.get(`http://localhost:3000/search/${this.search}`).then((res) => {
      this.posts = res.body;
     });
   }
 }
}
</script>