import React,{useState} from 'react';
import{ TodoForm } from './TodoForm';
import{ Todo } from './Todo';
import sortBy from 'react-lodash';
import filter from 'react-lodash';


export function TodoList(){
    const[todos,setTodos] = useState([
        {id: 1, text: 'Do 100 JavaScript Projects',isStar:false,isComplete:false},
        {id: 2, text: 'Learn NodeJS',isStar:false,isComplete:false},
        {id: 3, text: 'Learn ReactJS',isStar:false,isComplete:false},
        {id: 4, text: 'Learn GraphQJ',isStar:false,isComplete:false},
    ]);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)
    }



    const updateTodo =(todoId,newValue)=>{
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos(prev=>prev.map(item=>(item.id===todoId ? newValue:item)))

    }

    const removeTodo = id =>{
        const removeArr=[...todos].filter(todo=>todo.id !==id)

        setTodos(removeArr)
    }


    const handleSubmit = e =>{
        e.preventDefault();

    }
    const clearTodo = id =>{
        const removeArr=[].filter(todo=>todo.id !==id)

        setTodos(removeArr)
    }

    const completeTodo = id=>{
        let updatedTodos = todos.map(todo=>{
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    const starTodo =id=>{
        let updatedTodos = todos.map(todo=>{
            if(todo.id === id){
                todo.isStar = !todo.isStar;
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    const onChangeTodo= (id, mode, value) => {
        let newArray;
        if (mode === 'delete') {
            newArray = filter(todos, todo => todo.id !== id);
        } else {
            newArray = todos.map(todo => {
                if (todo.id === id) {
                   todo[mode] = value || !todo[mode];
                }
                return todo;
            })
        }
        setTodos(newArray)
    }

    return(
        <div>
        <h1>To Do List</h1>
            <input className="search-input" placeholder="Search..."/>
            <TodoForm onSubmit={addTodo}/>
            <Todo todos={sortBy(sortBy(todos, todo => todo.isComplete === true), todo => todo.isStar === false)}  completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} starTodo={starTodo} onChangeTodo={onChangeTodo} />
            <form onSubmit={handleSubmit}><button className="clear-button" onClick={clearTodo}  >Clear items</button></form>
        </div>
    )

}