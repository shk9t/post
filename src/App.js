import React, { useEffect, useMemo, useState } from 'react';
import PostItem from './components/PostItem';
import './styles/App.css'
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import {getPageCount} from './utils/pages'

const App = () => {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearch = usePosts(posts, filter.sort, filter.query)

  let pagesArray = []

  const [fetchPosts, isPostsLoading, postError] = useFetching(async ()=>{
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [])


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }



  return (
    <div className='App'>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {isPostsLoading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
      : <PostList remove={removePost}  posts = {sortedAndSearch} title="Список постов 1"/>
      }
      
    </div>
  );
};

export default App;