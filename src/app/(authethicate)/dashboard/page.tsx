"use client"
import { PlayfulTodolist } from '@/components/animate-ui/components/community/playful-todolist';
import React, { useEffect, useState } from 'react'

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface FETodos {
  id: string,
  label: string,
  defaultChecked?: boolean
}

const page = () => {
  const [todos, settodos] = useState<Todo[]>([])
  const [feTodos, setfeTodos] = useState<FETodos[]>([])


  //convert todos to feTodos
  const convertToFETodos = (todos: Todo[]) => {
    if (!todos) return;
    console.log("Converting todos to feTodos:", todos);
    const feTodos = (todos?.map(todo => ({
      id: todo.id,
      label: todo.title,
      defaultChecked: todo.completed
    }))) ?? [];
    console.log("Converted feTodos:", feTodos);
    setfeTodos(feTodos);
  }

  //get todos
  async function getTodos() {
    const res = await fetch('/api/todos', {
      method: 'GET',
    });
    const data = await res.json();
    const {todos, page, totalPages, total} = data;
    settodos(todos);
    convertToFETodos(todos);
  }

  //create todo
  async function createTodo(title: string) {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    await getTodos();
  }

  //delete todo
  async function deleteTodo(id: string) {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    await getTodos();
  }

  //update todo
  async function updateTodo(id: string, isCompleted: boolean) {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isCompleted }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await getTodos();
  }

  useEffect(()=>{
    getTodos();
  }, [])

  return (
    <div>
      <PlayfulTodolist 
      onUpdate={updateTodo}
      onAdd={createTodo}
      onDelete={deleteTodo}
      checkboxItems={feTodos} />
    </div>
  )
}

export default page