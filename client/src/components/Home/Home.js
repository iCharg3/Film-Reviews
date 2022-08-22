import React , { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts,getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const Home = () => {
    const [currentId,setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13  || e.keyCode === 188) {
          searchPost();
        }
    };

    const searchPost = () => {
        console.log(tags);
        if (search.trim() || tags) {
          dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
          history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
          history.push('/');
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return (
        <Grow in>
            <Container maxwidth="xl" elevation={6}>
                <Grid container justifyContent="space-between" alignItems='stretch' spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId = {setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Films" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId = {setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
   )
}
