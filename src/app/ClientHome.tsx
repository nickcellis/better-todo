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

const TodoList = ({ todos, filter }: { todos: TodoProps[]; filter: (date: Date) => boolean }) => (
    <ul className="px-5 flex flex-col items-start justify-start text-left w-full gap-2 text-white">
        {todos.map((todo, i) => {
            const date = new Date(todo.startDate);
            if (filter(date)) {
                return (
                    <li key={i} className="bg-black py-1.5 px-1.5 py-2 border-slate-200 border rounded-lg w-full text-base">
                        {todo.title}
                        <br />
                        <p className="text-xs">{formatDate(new Date(todo.startDate))} - {formatDate(new Date(todo.endDate))}</p>

                        <div className="flex w-full bg-green">
                            <Checkbox label="" val={false} setValue={() => {}} ></Checkbox>
                        </div>
                    </li>
                );
            }
            return null;
        })}
    </ul>
);

interface CheckboxProps {
    val: boolean;
    setValue(val:boolean): void;
    label: string;
}

const Checkbox = (props: CheckboxProps) => {
	return (<label>
		<input type="checkbox" checked={props.val} onChange={() => {props.setValue(!props.val)}}/>
		{props.label}
	</label>)
}

export default function ClientHome({ formattedDate }: ClientHomeProps) {
    const [showModal, setShowModal] = useState(false);
    const [todoList, setTodoList] = useState<TodoProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    

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
    }, [showModal]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCreateTodo = (todo: TodoProps) => {
        setShowModal(false);
        handleTodoSave(todo);
    };

    const handleTodoSave = async (todoProps: TodoProps) => {
        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoProps),
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
                    className="fixed bottom-5 flex h-12 w-12/12 items-center justify-center hover:bg-indigo-500 hover:cursor-pointer bg-black rounded-lg"
                    onClick={() => setShowModal(!showModal)}
                >
                    <a className="flex place-items-center p-5 lg:pointer-events-auto lg:p-0">+</a>
                </div>
            </div>

            <div className="text-black">
                <div className="flex flex-col w-full items-start min-h-10 z-[10]">
                    <p className="px-5 py-2.5 text-m font-medium">Today - {formattedDate}</p>
                    <TodoList todos={todoList} filter={isSameDate} />
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