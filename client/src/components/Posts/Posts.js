import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";

import useStyles from './styles';
import Post from "./Post/Post";

const Posts = ({setCurrentId}) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    //console.log(isLoading);
    console.log(posts);

    if (!posts.length && !isLoading) return 'No posts';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3} elevation={6}>
              {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                  <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>
              ))}
            </Grid>
        )
    )
}

export default Posts;