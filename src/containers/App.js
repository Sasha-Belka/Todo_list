import React from 'react';
//Parts
import{ TodoList } from '../components/TodoList';
import './App.css';

export function App(){

    return (
        <div className="todo-app">
        <TodoList />
        </div>
    )
}