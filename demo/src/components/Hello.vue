<template>
  <div>
  <h2>{{msg}}</h2>
  <br>
<input id="search" type="text" placeholder="Find a post" v-model="search" @keyup="rechercher">

<div>
<button class="btn btn-default" type="button" @click="visible">See Important posts</button>
<button class="btn btn-default" type="button" @click="all">See All Posts</button><br><br>
</div>


<div class="container">
<div class="col-xs-8">
<div v-for="post in posts">
<div class="well well-sm col-xs-12">
<h4>{{post.title}}</h4>
<p class="badge">Note: {{post.note}}</p>
<p class="badge">{{post.tag|maj}}</p><br>
<a class="btn btn-warning btn-xs" @click="remove(post.id)">Delete</a>
</div>
</div>
</div>
   

<div class="col-xs-4 thumbnail">
<h5>Ajouter:</h5>
  Titre: <input placeholder="Titre" type="text" v-model="newPost.title"></input><br><br>
  Tag: <input placeholder="Titre" type="text" v-model="newPost.tag"></input><br><br>
  <!--  Note: <input type="range" v-model="newPost.note" min="0" max="10"></input>{{newPost.note}}-->
  Note:<input type="number" v-model="newPost.note" min="0" max="10"><br><br>
  Important: <input type="checkbox" v-model="newPost.visible"></input><br><br>
  <button type="button" @click="send">Send</button>

</div>
</div>
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
      msg: 'How to filter search results with Vue + Node',
      search : "",
      posts: [], 
      newPost:{
        titre: '',
        visibile: true,
        note: 3,
        tag: ""
      }
    }
  },

 methods : {
send(){
  this.$http.post(`http://localhost:3000/send`, this.newPost).then((res) => {
    this.posts = res.body;
  });

    this.newPost = {
        title: '',
        visibile: true,
        note: 3,
        tag: ""
      }
},

remove(id){
  this.$http.get(`http://localhost:3000/post/remove/${id}`).then((res) => {
      this.posts = res.body;
     });
   },

   rechercher(){
     this.$http.get(`http://localhost:3000/search/${this.search}`).then((res) => {
      this.posts = res.body;
     });
   },

   visible(){
     this.$http.get(`http://localhost:3000/visible`).then((res) => {
      this.posts = res.body;
     });
   },

    all(){
     this.$http.get(`http://localhost:3000/`).then((res) => {
      this.posts = res.body;
     });
   }
 }, //closes methods

 filters :{
maj: function(item){
  return item[0].toUpperCase() + item.substring(1, item.length);
}
 }
}
</script>

<style scoped>
li{
  list-style-type:none;
}

.well{
  margin-left: 2px;
  margin-right: 2px;
}

#search{
margin-bottom: 2em;
}

</style>