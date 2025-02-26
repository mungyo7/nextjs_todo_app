import React from 'react'
import TodoList from './todolist';
import { TodoProvider } from '../contexts/todocontext';
import TodoAdder from './todoadder';

function PersonalView() {
  return (
    <div className='min-h-screen'>
      <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <TodoProvider>
          <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-4 w-full max-w-[95%] md:max-w-none'>
            <div class="flex flex-col items-center justify-center w-full md:w-auto">
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 sm:p-6 space-y-4 md:space-y-6 flex flex-col items-center text-center w-full">
                  <TodoList />
                </div>
              </div>
            </div>

            <div class="flex flex-col items-center justify-center w-full md:w-auto md:self-center">
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 sm:p-6 space-y-4 md:space-y-6">
                  <TodoAdder />
                </div>
              </div>
            </div>
          </div>
        </TodoProvider>
      </section>
    </div>
  )
}

export default PersonalView