import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
      }

    return (
    <form>
        <MyInput
          value = {post.title}  
          onChange = {e => setPost({...post, title: e.target.value})}
          placeholder='заголовок поста'
          type='text'
        />
        <MyInput
          value = {post.body}
          onChange={e => setPost({...post, body: e.target.value})}
          placeholder='описание поста'
          type='text'
          />
        <MyButton onClick={addNewPost}>Cоздать пост</MyButton>
    </form>
    );
};

export default PostForm;