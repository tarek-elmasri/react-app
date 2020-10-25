import React from 'react'
import Header from '../../components/home/Header'
import Login from '../../components/sessions/Login'
import Posts from '../../components/posts/Posts'
import Register from '../../components/sessions/Register'
import NewPost from '../../components/posts/NewPost'
import ReadPost from '../../components/posts/ReadPost'

export default [
  {
    path: '/login',
    exact: false,
    key:'login',
    protected: "guest",
    component: ()=> <Login />
  },
  {
    path: '/posts/new',
    exact: true,
    key: 'newpost',
    protected: "auth",
    component: ()=> <NewPost />
  },
  {
    path: '/posts/:id',
    exact: true,
    key: 'read',
    protected: 'free',
    component: ()=> <ReadPost />
  },
  {
    path:'/posts',
    exact: true,
    key: 'posts',
    protected: "free",
    component: ()=> <Posts />
  },
  {
    path: '/register',
    exact: false,
    key: 'register',
    protected: 'guest',
    component: ()=> <Register />
  },
  {
    path: '/',
    exact: true,
    key:'home',
    protected: "free",
    component: () => <Header />
  }
]