const express = require("express")

const routes = express.Router()

const Posts = require("../models/postModel")



// get all post

// routes.get("/" , (req , res) => {
// })

// create post 


routes.get("/create" , (req, res) => {
    res.render("create_post.ejs")
})

routes.post("/create",  async (req, res) => {
    const title = req.body.title
    const content = req.body.content;

    if (!title || !content) {
        // Handle empty title or content error if needed
        res.redirect("/posts/create?error=missingFields");
        return; // Stop further execution
    }

    try {
        const newPost = new Posts({
            title: title,
            content: content,
        });

        await newPost.save();
        res.redirect("/"); // Redirect to home page after successful post creation
    } catch (err) {
        console.error(err);
        // Handle error if needed
        res.redirect("/posts/create?error=true");
    }
});




// update post

routes.get("/update/:id" ,  async (req , res) => {
    const posts = await Posts.findById(req.params.id)
    res.render("update.ejs" , {posts :posts })
})

routes.post("/update/:id" ,  async (req , res) => {
    const title = req.body.title
    const content = req.body.content;

    try {
        await Posts.findByIdAndUpdate(req.params.id , {
            title :  title,
            content : content,
        })
        res.redirect("/")

    } catch (err) {
        console.error("Error:", error);
        res.status(500).send("server problem")
    }
})

// delete post
routes.delete("/delete/:id" , async (req , res) => {
    await Posts.findByIdAndDelete(req.params.id)
    res.redirect("/")
})


routes.get("/view_content/:id" ,  async  (req , res) => {
    const posts = await Posts.findById(req.params.id)
    res.render("view_content.ejs" , {posts :posts})
})




module.exports = routes