"use client";
import { useContext, useState } from "react";
import TodoContext from "../contexts/todocontext";

function TodoAdder() {
    const { addTask } = useContext(TodoContext);
    const [name, setName] = useState("");

    return (
        <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white text-center">Add Task</h2>
            <form class="flex items-center">   
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                        type="search" 
                        id="search" 
                        class="mt-2 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required 
                    />
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            if (name.trim()) {
                                addTask(name);
                                setName("");
                            }
                        }} 
                        type="button" 
                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TodoAdder;