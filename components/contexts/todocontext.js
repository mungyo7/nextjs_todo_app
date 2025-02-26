"use client";

import { createContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      console.log('Fetched tasks:', data); // 데이터 확인용 로그
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
  };

  const addTask = async (name, order) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, order }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      
      fetchTasks(); // 태스크 추가 후 목록 새로고침
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const changeState = async (id, status) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      
      fetchTasks(); // 상태 변경 후 목록 새로고침
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      fetchTasks(); // 삭제 후 목록 새로고침
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <TodoContext.Provider value={{ 
      tasks, 
      addTask, 
      changeState, 
      deleteTask 
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContext;