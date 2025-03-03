"use client";
import React, { useContext, useState, useEffect } from 'react'
import TodoContext from '../contexts/todocontext';

function TodoList() {

  const { tasks, changeState, deleteTask } = useContext(TodoContext);

  const [selection, setSelection] = useState("");
  const [filteredText, setFilteredText] = useState("");

  useEffect(() => {
    console.log("TodoList tasks:", tasks);
  }, [tasks]);

  const filterTasks = (selection, tasks, filteredText) => {
    if (!Array.isArray(tasks)) return [];
    
    return tasks.filter((task) => {
      const matchesSelection = 
        selection === "" ? true : 
        selection === "continues" ? !task.finished :
        selection === "finish" ? task.finished : true;

      const matchesSearch = 
        task.name.toLowerCase().includes(filteredText.toLowerCase());

      return matchesSelection && matchesSearch;
    });
  };

  return (
    <div>
      <h3 class="text-2xl sm:text-4xl text-center m-2 font-bold">All Tasks</h3>

      <div class="flex justify-center w-full mt-3">
        <div class="inline-flex rounded-md shadow-sm scale-90 sm:scale-100" role="group">
          <button onClick={(e) => {
            setSelection("")
          }} type="button" class={"px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 " + (selection == "" ? ("dark:text-sky-400") : ("dark:text-white")) + " dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"}>
            All
          </button>
          <button onClick={(e) => {
            setSelection("continues")
          }} type="button" class={"px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 " + (selection == "continues" ? ("dark:text-sky-400") : ("dark:text-white")) + " dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"}>
            In Progress
          </button>
          <button onClick={(e) => {
            setSelection("finish")
          }} type="button" class={"px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 " + (selection == "finish" ? ("dark:text-sky-400") : ("dark:text-white")) + " dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"}>
            Finished
          </button>
        </div>
      </div>

      <form class="mt-4 mb-4">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input onChange={(e) => setFilteredText(e.target.value)} type="search" id="default-search" class="block w-full p-2 sm:p-4 pl-8 sm:pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Task" required></input>
        </div>
      </form>

      <div class="relative overflow-x-auto sm:overflow-x-hidden">
        <table class="w-full text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-1 sm:px-6 py-2 sm:py-3">Task Name</th>
              <th scope="col" class="px-1 sm:px-6 py-2 sm:py-3">Due Date</th>
              <th scope="col" class="px-1 sm:px-6 py-2 sm:py-3">Status</th>
              <th scope="col" class="px-1 sm:px-6 py-2 sm:py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.length > 0 ? (
              filterTasks(selection, tasks, filteredText).map((task) => (
                <tr key={task._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px] sm:max-w-none">{task.name}</td>
                  <td className="px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    {task.dueDate ? new Date(task.dueDate).toLocaleString() : '-'}
                  </td>
                  <td className="px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={task.finished}
                        onChange={() => changeState(task._id, !task.finished)}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 hidden sm:inline">
                        {task.finished ? "Completed" : "In Progress"}
                      </span>
                    </label>
                  </td>
                  <td className="px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <button 
                      onClick={() => deleteTask(task._id)}
                      className="text-xs sm:text-sm font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-1 sm:px-6 py-2 sm:py-4 text-center">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TodoList