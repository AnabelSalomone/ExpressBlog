<template>
  <div>
  <h2>{{msg}}</h2>
  <br>
<input id="search" type="text" placeholder="Find a post" v-model="search" @keyup="rechercher">

<div>
<button class="btn btn-default" type="button" @click="visible">See Important posts</button>
<button class="btn btn-default" type="button" @click="all">See All Posts</button>
<button class="btn btn-default" type="button" @click="rated">Best rated</button><br><br>

</div>


<div class="container">
  <div class="col-xs-8">
    <div v-for="post in posts">
      <div class="well well-sm col-xs-12">
        <h4>{{post.title}}</h4>
          <p class="badge">Note: {{post.note}}</p>
          <p class="badge">{{post.tag|maj}}</p><br>
          <a class="btn btn-warning btn-xs" @click="remove(post.id)">Delete</a>
          <a class="btn btn-warning btn-xs" @click="editFx(post.id)">Edit</a>
        </div>
      </div>
    </div>
   

    <div class="col-xs-4">
      <div class="thumbnail">
        <h5>Ajouter:</h5>
          Titre: <input placeholder="Titre" type="text" v-model="newPost.title"></input><br><br>
          Tag: <input placeholder="Titre" type="text" v-model="newPost.tag"></input><br><br>
          <!--  Note: <input type="range" v-model="newPost.note" min="0" max="10"></input>{{newPost.note}}-->
          Note:<input type="number" v-model="newPost.note" min="0" max="10"><br><br>
          Important: <input type="checkbox" v-model="newPost.visibile"></input><br><br>
          <button type="button" @click="send">Send</button> 
      </div>

      <div class="thumbnail" v-if="editPost.title.length > 0">
        <h5>Modifier:</h5>

        Titre: <input placeholder="Titre" type="text" v-model="editPost.title"></input><br><br>
        Tag: <input placeholder="Titre" type="text" v-model="editPost.tag"></input><br><br>
        <!--  Note: <input type="range" v-model="newPost.note" min="0" max="10"></input>{{newPost.note}}-->
        Note:<input type="number" v-model="editPost.note" min="0" max="10"><br><br>
        Important: <input type="checkbox" v-model="editPost.visible"></input><br><br>
        <button type="button" @click="sendEdit()">Edit</button>
      </div>
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
        title: '',
        visibile: true,
        note: 3,
        tag: ""
      },
       editPost:{title: ''}
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

sendEdit(){
  this.remove(this.editPost.id);
  this.$http.post(`http://localhost:3000/edited`, this.editPost).then((res) => {
    this.posts = res.body;
  });

    this.editPost = {title: ''}
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

    rated(){
     this.$http.get(`http://localhost:3000/star`).then((res) => {
      this.posts = res.body;
     });
   },

   all(){
     this.$http.get(`http://localhost:3000/`).then((res) => {
      this.posts = res.body;
     });
   },

   editFx(id){
      this.$http.get(`http://localhost:3000/post/${id}`).then((res) => {
      this.editPost = res.body[0] ;
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