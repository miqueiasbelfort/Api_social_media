const router = require("express").Router()
const Post = require("../models/Post")

//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)

    try {

        const savePost = await newPost.save()
        res.status(200).json(savePost)

    } catch(error){
        res.status(500).json(error)
    }

})

//update a post
router.put("/:id", async (req, res) => {
    
    try {
        
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){

            await post.updateOne({$set: req.body})
            res.status(200).json("the post has bee updated")

        } else {
            res.status(403).json("you can update only your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }

})


//delete a post
router.delete("/:id", async (req, res) => {
    
    try {
        
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){

            await post.deleteOne()
            res.status(200).json("the post has bee deleted")

        } else {
            res.status(403).json("you can delete only your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }

})

//like and dislike a post
router.put("/:id/like", async (req, res) => {
    
    try {
        
        const post = await Post.findById(req.params.id)

        if(!post.likes.includes(req.body.userId)){ //PT - Se não tiver o userId no array de likes 
        
            await post.updateOne({ $push: {likes: req.body.userId} }) //PT - então adiocionamos com um push
            res.status(200).json("The post has been liked")
        
        } else {
            
            await post.updateOne({$pull: {likes: req.body.userId }}) //PT - caso tenha o tiramos com o pull
            res.status(200).json("The post has been disliked")
            
        }

    } catch (error) {
        res.status(500).json(error)
    }

})


//get a post
router.get("/:id", async (req, res) => {
    
    try {
        
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json("")
    }

})


//get timeline posts
router.get("/timeline/all", async (req, res) => {
    
    try {
        
        const currentUser = await User.findById(req.body.userId)
        const userPosts = await Post.find({userId: currentUser._id}) //todas as postagem do usuário
        // vamos pegar o usuário atual e depois no array de seguidores 
        // fazemos um map com os id dos seguidores e fizemos ele retornar todos esse usuário seguidos
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
               return Post.find({userId: friendId})
            })  
        )
        // concatenar o userPost que são todas as postagens do usuário mais as dos que ele está seguindo
        res.status(200).json(userPosts.concat(...friendPosts))

    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router