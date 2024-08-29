import React, { useRef, useState } from "react"
import { DateRangePicker } from "@nextui-org/date-picker";

interface AddTodoProps {
    handleCloseModal: () => void;
    handleCreateTodo: (todoProps: TodoProps) => void;
}

export default function AddTodoPage({ handleCloseModal, handleCreateTodo }: AddTodoProps) {
    const modalRef = useRef(null)
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const createTodo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        // Convert date strings to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && title) {
            const todo: TodoProps = {
                startDate: start,
                endDate: end,
                title: title,
                archive: false,
            }

            handleCreateTodo(todo);
        } else {
            console.error("Invalid dates");
        }
    }

    return (
        <div ref={modalRef} className="fixed inset-0 bg-white flex justify-center items-center z-50">
            <div className="relative w-full h-full max-w-md mx-auto shadow-lg text-black">

                <form method="POST" action="https://www.formbackend.com/f/664decaabbf1c319" className=" pt-10 pb-10 px-8 space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-4">

                        <button className="absolute top-5 left-5" onClick={() => handleCloseModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <div>
                            <label className="block mb-2 text-sm font-medium">Title</label>
                            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}
                                className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black" />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"

                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"

                            />
                        </div>

                        {/* <div>
                            <label className="block mb-2 text-sm font-medium">Message</label>
                            <textarea name="message" className="block w-full p-2 border border-gray-300 rounded-lg"></textarea>
                        </div> */}
                    </div>

                    <div className="w-full h-10">
                        <button type="submit" className="w-full py-4 bg-black text-white rounded-lg" onClick={(event) => createTodo(event)}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
