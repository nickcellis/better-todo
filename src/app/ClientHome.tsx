"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import AddTodoPage from "./pages/AddTodoPage";
import { format } from "path";

interface ClientHomeProps {
    formattedDate: string;
}

// Utility functions
function isSameDate(inputDate: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    return today.getTime() === inputDate.getTime();
}

function isUpcomingDate(inputDate: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    return inputDate > today;
}

function isTomorrowDate(inputDate: Date): boolean {
    const today = new Date();
    const tomorrow = new Date(today);
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);
    inputDate.setHours(0, 0, 0, 0);
    return inputDate.getTime() === tomorrow.getTime();
}

function formatDate(inputDate: Date): string {
    const yyyy = inputDate.getFullYear();
    const mm = inputDate.getMonth() + 1; // Months start at 0!
    const dd = inputDate.getDate();

    const formattedDate = `${dd}/${mm}/${yyyy}`;
    return formattedDate
}

interface BoxProps {
    todos: TodoProps[]
    filter: (date: Date) => boolean
    remove?: (indexToRemove: number) => void
}

const TodoList = (props: BoxProps) => (
    <ul className="px-6 flex flex-col items-start justify-start text-left w-full gap-2 text-white">
        {props.todos && props.todos.map((todo, i) => {
            const date = new Date(todo.startDate);
            if (props.filter(date)) {
                return (
                    <li key={i} className=" relative bg-black px-2.5 py-2.5 border-slate-200 border rounded-lg w-full text-base">
                        {todo.title}
                        <br />
                        <p className="text-xs">{formatDate(new Date(todo.startDate))} - {formatDate(new Date(todo.endDate))}</p>

                        <button className="absolute -top-1.5 -right-2 h-5 w-5 bg-black rounded-xl text-white text-xs flex items-center justify-center hover:bg-white hover:text-black"
                            onClick={() => {
                                if (props.remove) {
                                    props.remove(i)
                                }
                            }
                            }>
                            x
                        </button>
                        {/* 
                        <div className="flex w-full bg-green">
                            <Checkbox label="" val={false} setValue={() => {}} ></Checkbox>
                        </div> */}
                    </li>
                );
            }
            return null;
        })}
    </ul>
);

interface CheckboxProps {
    val: boolean;
    setValue(val: boolean): void;
    label: string;
}

const Checkbox = (props: CheckboxProps) => {
    return (<label>
        <input type="checkbox" checked={props.val} onChange={() => { props.setValue(!props.val) }} />
        {props.label}
    </label>)
}

export default function ClientHome({ formattedDate }: ClientHomeProps) {
    const [showModal, setShowModal] = useState(false);
    const [todoList, setTodoList] = useState<TodoProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isRemoveTodo, setRemoveTodo] = useState(false);

    useEffect(() => {
        const fetchTodoList = async () => {
            try {
                const response = await fetch('/api/todos'); // Replace with your actual API endpoint
                const result = await response.json();
                if (result.success) {
                    setTodoList(result.data);
                    console.log('Todo loaded successfully!');
                } else {
                    setError(result.error || 'Unknown error');
                }
            } catch (err) {
                setError('Failed to fetch todos');
            }
        };

        fetchTodoList();
    }, [showModal, isRemoveTodo]);

    useEffect(() => {
        const updateTodoJSON = async () => {
            const response = await fetch('/api/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'todos': todoList,
                }),
            });
            const result = await response.json();
            if (result.success) {
                setTodoList(result.data);
                console.log('Todo removed successfully!');
            } else {
                setError(result.error || 'Unknown error');
            }
        }

        if (isRemoveTodo) {
            updateTodoJSON();
            setRemoveTodo(false)
        }
    }, [todoList])

    const handleRemoveTodo = (indexToRemove: number) => {
        const updatedTodos = todoList.filter((_, index) => index !== indexToRemove);
        setRemoveTodo(true);
        setTodoList(updatedTodos);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCreateTodo = (todo: TodoProps) => {
        handleTodoSave(todo);
        setTimeout(() => {
            setShowModal(false);
        }, 50)
    };

    const handleTodoSave = async (todoProps: TodoProps) => {
        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'todo': todoProps,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save todo');
            }

            const result = await response.json();
            if (result.success) {
                console.log('Todo saved successfully!');
            } else {
                setError(result.error || 'Unknown error');
            }
        } catch (err) {
            setError('Failed to save todo');
        }
    };

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }
    //bg-[#15121c]
    return (
        <main className="flex flex-col text-white">
            <div className="flex justify-center z-8 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex ">
                <div
                    className="fixed bottom-5 flex h-12 w-12/12 items-center justify-center hover:bg-white hover:border hover:border-2 hover:border-black hover:text-black hover:cursor-pointer bg-black rounded-lg"
                    onClick={() => setShowModal(!showModal)}
                >
                    <a className="flex place-items-center p-5 lg:pointer-events-auto lg:p-0">+</a>
                </div>
            </div>

            <div className="text-black">
                <div className="flex flex-col w-full items-start min-h-10 z-[10]">
                    <p className="px-5 py-2.5 text-m font-medium">Today - {formattedDate}</p>
                    <TodoList todos={todoList} filter={isSameDate} remove={handleRemoveTodo} />
                </div>
                <div className="flex flex-col w-full items-start min-h-10 z-[10]">
                    <p className="px-5 py-2.5 text-m font-medium">Tomorrow</p>
                    <TodoList todos={todoList} filter={isTomorrowDate} />
                </div>
                <div className="flex flex-col w-full items-start min-h-10 z-[10]">
                    <p className="px-5 py-2.5 text-m font-medium">Upcoming</p>
                    <TodoList todos={todoList} filter={isUpcomingDate} />
                </div>
            </div>

            <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>

            {showModal && <AddTodoPage handleCloseModal={handleCloseModal} handleCreateTodo={handleCreateTodo} />}
        </main>
    );
}