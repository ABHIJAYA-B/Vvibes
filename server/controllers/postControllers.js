const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')



//================= CREATE A POST
//POST: api/posts
//PROTECTED
const createPost = async (req, res, next) => {
    try{
        let {title, category, description } = req.body;
        if(!title || !category || !description || !req.files){
            return next(new HttpError("Fill in all fields and choose thumbnail.", 422))
        }  
        const {thumbnail} = req.files;

        //check the file size
        if(thumbnail.size > 2000000){
            return next(new HttpError("Thumbnail too big, File should be less than 2mb", 422))
        }

        let fileName = thumbnail.name;
        let splittedFilename  = fileName.split('.');
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1]
        thumbnail.mv(path.join(__dirname, "..", '/uploads', newFilename), async (err) => {
            if(err) {
                return next(new HttpError(err))
            } else {
                const newPost = await Post.create({title, category, description, thumbnail: newFilename, creator: req.user.id})
                if(!newPost) {
                    return next(new HttpError("Post couldnn't  be created", 422))

                }

                //find user and increase post count by 1

                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

                res.status(201).json(newPost)
            }
        })

    }catch(error) {
        return next(new HttpError(error))
    }
}






//================= GET ALL POSTS
//GET: api/posts
//UNPROTECTED
const getPosts = async (req, res, next) => {
    try{
        const posts = await Post.find().sort({updatedAt: -1})
        res.status(200).json(posts)
    } catch(error) {
        return next(new HttpError(error))
    }
}






//================= GET SINGLE POST
//GET: api/posts/:id
//UNPROTECTED
const getPost = async (req, res, next) => {
    try{
        const postId = req.params.id
        const post = await Post.findById(postId)

        if(!post){
            return next(new HttpError('Post not found.', 404))
        }
        res.status(200).json(post)

    } catch(error){
        return next(new HttpError(error))
    }
}






//================= GET POSTS BY CATEGORY
//GET: api/posts/categories/:category
//UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try{
        const {category} = req.params
        const catPosts = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)

    } catch(error){
        return next(new HttpError(error))
    }
}







//================= GET USER/AUTHOR POST
//GET: api/posts/users/:id
//UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
        res.status(200).json(posts) 
       
    } catch (error) {
        return next(new  HttpError(error))

    }
} 





//================= EDIT POST
//PATCH: api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    try {
        let updatedPost;
        const postId = req.params.id;
        const { title, category, description } = req.body;

        // Validate input fields
        if (!title || !category || description.length < 12) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        // Check if there is a new file being uploaded
        if (!req.files || !req.files.thumbnail) {
            // If no file, just update text fields
            updatedPost = await Post.findByIdAndUpdate(
                postId, 
                { title, category, description }, 
                { new: true }
            );
        } else {
            // Get the old post from the database
            const oldPost = await Post.findById(postId);
            if (!oldPost) {
                return next(new HttpError("Post not found.", 404));
            }
            if (req.user.id !== String(oldPost.creator)) { // Convert both to string for comparison
                return next(new HttpError("Unauthorized. You cannot edit this post.", 403));
            }

            // Delete old thumbnail from uploads
            const oldThumbnailPath = path.join(__dirname, '..', 'uploads', oldPost.thumbnail);
            fs.unlink(oldThumbnailPath, (err) => {
                if (err) {
                    console.error("Error deleting old thumbnail:", err);
                }
            });

            // Upload new thumbnail
            const { thumbnail } = req.files;
            // Check if the uploaded file is an image
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(thumbnail.mimetype)) {
                return next(new HttpError("Uploaded file is not an image.", 422));
            }

            // Check file size (limit to 2MB)
            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big. Should be less than 2MB", 422));
            }

            // Retain the original filename and append a UUID to ensure uniqueness
            const originalFileName = thumbnail.name;
            const fileExtension = path.extname(originalFileName); // Get file extension
            const baseFileName = path.basename(originalFileName, fileExtension); // Get base filename without extension
            const newFilename = `${baseFileName}-${uuid()}${fileExtension}`; // Create new filename

            // Move the uploaded file to the uploads directory
            await thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename));

            // Update post with new data
            updatedPost = await Post.findByIdAndUpdate(
                postId, 
                { title, category, description, thumbnail: newFilename }, 
                { new: true }
            );
        }

        if (!updatedPost) {
            return next(new HttpError("Couldn't update post.", 400));
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        return next(new HttpError(error));
    }
};









//================= DELETE A POST
//DELETE: api/posts
//PROTECTED
const deletePost = async (req, res, next) => {
    try{
        const postId = req.params.id;
        if(!postId){
            return  next(new HttpError("Post unavailable", 400));
        }
        const post = await Post.findById(postId);
        const fileName = post?.thumbnail;
        if(req.user.id == post.creator) {
        //delete thumbnail from uploads folder
        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if(err){
                return next(new  HttpError(err))
            } else {
                await Post.findByIdAndDelete(postId);
                //find user and reduce post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser?.posts - 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
                res.json(`Post ${postId} deleted successfully`)
            }
        })
        } else {
            return next(new HttpError("Post couldn't be deleted", 403))
        }

       
    } catch(error){
        return next(new  HttpError(error))

    }
}





module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost}