import express from 'express';
import { getPosts , createPost, updatePost, deletePost, likePost,getPostsByCreator,getPostsBySearch,getPost} from '../controllers/posts.js';

const router = express.Router();

import auth from "../middleware/auth.js";

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.get('/', getPosts);
router.post('/',auth, createPost);
router.patch('/:id',auth ,updatePost);
router.delete('/:id',auth ,deletePost);
router.patch('/:id/likepost',auth ,likePost);

export default router;