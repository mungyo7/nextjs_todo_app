import React from 'react'
import TodoList from './todolist';
import { TodoProvider } from '../contexts/todocontext';
import TodoAdder from './todoadder';

function PersonalView() {
  return (
    <div className=''>
      <section class="bg-gray-50 dark:bg-gray-900">
        <TodoProvider>
        <br/>
          <div className='flex justify-center'>
            <div class="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center text-center w-full">
                  <TodoList />
                </div>
              </div>
            </div>

            <div class="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
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