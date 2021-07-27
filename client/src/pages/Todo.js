import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import { useStateValue } from "./StateProvider";
import "./Todo.css";
import TodoItem from "../components/TodoItem";
import Loader from "../components/Loader";
import AddBox from "../components/AddBox";
import ErrorBox from "../components/ErrorBox";
import { change_wallpaper } from "./Utils";
import Avatar from "avataaars";

export default function CollapseSidebar() {
    var [todo, setTodo] = useState([]);
    var [user, , userLoading, PageError, setPageError] = useStateValue();
    var [loading, setLoading] = useState(true);
    var [filter, setFilter] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
            try {
                if (!isCancelled) {
                    if (
                        document.getElementById("todo_right").style.backgroundImage === ""
                    ) {
                        await change_wallpaper("todo","todo_right");
                    }
                    if (user) setTodo(user.items);
                    setLoading(userLoading);
                }
            } catch (e) {
                if (!isCancelled) {
                    console.log(e);
                }
            }
        };
        runAsync();
        return () => {
            isCancelled = true;
        };
    }, [userLoading]);
    useEffect(() => {
        const interval = setInterval(function () {
            change_wallpaper("todo","todo_right");
        }, 60*60*1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const toggleComplete = async (id, checked) => {
        axios
            .post(
                process.env.REACT_APP_API_DOMAIN + "/completeitem",
                {
                    id: id,
                    checked: checked,
                },
                { withCredentials: true }
            )
            .catch((err) => {
                // console.log(err);
                setPageError({
                    status: err.response.status,
                    message: err.response.data,
                });
            });

        //to rerender the list once a task is done we have to create a new list, if we do the same thing with prev parameter of setState callback then the change will not rerender as we are setting it to same object/array
        // user.items.find((todo) => todo._id === id).completed = checked ? 1 : 0;
        const newTodo = [...todo];
        const todoItem = newTodo.find((todo) => todo._id === id);
        todoItem.completed = checked ? 1 : 0;
        setTodo(newTodo);
    };

    function getTodo() {
        if (todo !== undefined)
            return todo.filter((todo) =>
                todo.completed === 0 ? true : filter
            );
        else return [];
    }

    function deleteItem(id) {
        axios
            .post(
                process.env.REACT_APP_API_DOMAIN + "/deleteitem",
                { id: id },
                { withCredentials: true }
            )
            // .then((data)=>{
            //     if(data.data==="successful"){
            //         // let index = user.items.findIndex((todo) => todo._id === id);
            //         // user.items.splice(index,1);
            //         const newTodo = [...todo];
            //         const todoItemIndex = newTodo.findIndex((todo) => todo._id === id);
            //         newTodo.splice(todoItemIndex,1);
            //         setTodo(newTodo);
            //     }})
            .catch((err) =>
                setPageError({
                    status: err.response.status,
                    message: err.response.data,
                })
            );

        const newTodo = [...todo];
        const todoItemIndex = newTodo.findIndex((todo) => todo._id === id);
        newTodo.splice(todoItemIndex, 1);
        setTodo(newTodo);
    }

    return (
        <div>
            <Loader loading={loading} />

            {/* Error Show Box */}
            <ErrorBox />
            
            <div id="page-header"><a id="hamburger" href="#sidebar-nav" target="_self"><span className="line"></span><span className="line"></span><span className="line"></span></a></div>

            <div className="todo">
                <div id="sidebar-nav" className="todo_left">

                    <div className="todo_left_user">
                        
                        <div className="Avatar">
                            <Avatar style={{width: '40px', height: '40px'}}
                                    avatarStyle='Circle'
                                    topType='ShortHairShortFlat'
                                    accessoriesType='Kurt'
                                    hairColor='BrownDark'
                                    facialHairType='Blank'
                                    clotheType='BlazerShirt'
                                    eyeType='Default'
                                    eyebrowType='DefaultNatural'
                                    mouthType='Default'
                                    skinColor='Brown'
                            />
                        </div>
                        
                        <div className="todo_username">
                            {user && user.firstName+" "+user.lastName}
                        </div>
                        
                        <button className="todo_hide_task_button" onClick={(e) => {setFilter((prev) => !prev)}}>
                            {filter?"Hide Completed Tasks":"Show Completed Tasks"}
                        </button>
                        
                        <Link className="todo_homepage" to="/">Home page</Link>
                        
                        <Logout class_name="todo_logout" />
                    </div>
                </div>
                <a id="nav-screen-overlay" href="#" target="_self"></a>
                
                <div id="todo_right">
                    <div className ="todo_top">
                            {getTodo().map((arr) => {
                                return (
                                    <TodoItem
                                        classPrefix="todo"
                                        key={arr._id}
                                        arr={arr}
                                        _onChange={toggleComplete}
                                        deleteItem={deleteItem}
                                    ></TodoItem>
                                );
                            })}
                    </div>
                    <AddBox setTodo={setTodo} todo={todo}/>
                </div>
            </div>
            <div className="todo_properties">
                
            </div>
        </div>
    );
}
