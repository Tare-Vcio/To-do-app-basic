import { ChangeEvent, FormEvent, useState } from "react"
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Row } from "./Row"
import { data } from "../todos"
import { AddTodo } from "./AddTodo"

type Todo = {
    id: string
    task: string
    isCompleted: boolean
}
export const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>(data)
    const [task, setTask] = useState("")
    const todosLength = todos.length
    const hasTodos = todos.length > 0
    const remainingTodos = todos.filter((todo) => !todo.isCompleted).length

    const handleAddTodo = (todo: Todo) => {
        const updateTodos = [...todos, todo]
        setTodos(updateTodos)
        setTask("")
    }

    const handleSubmitTodo = (e: FormEvent) => {
        e.preventDefault()

        const todo = {
            id: uuidv4(),
            task: task,
            isCompleted: false,
        }

        task && handleAddTodo(todo)
    }

    const handleChange = (e: ChangeEvent) => {
        const {value} = e.target as HTMLInputElement
        setTask(value)
    }

    const handleDeleteTodo = (id: string) => {
        const updateTodos = todos.filter((todo) => todo.id !== id )
        setTodos(updateTodos)
        setTask("")
    }

    const handleCheckTodo = (id: string) => {
        const updateTodos = todos.map((todo) => {
            if(todo.id === id) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted,
                }
            }
            return todo
        })
        setTodos(updateTodos)
    }
  return (
    <section>
        <AddTodo task={task} handleChange={handleChange} handleSubmitTodo={handleSubmitTodo}/>

        {todos.map((todo) => (
            <Row key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleCheckTodo={handleCheckTodo}/>
        ))}
        {!hasTodos && <p>Please add a todo!</p>}
        {hasTodos && (
            <p>{`[${remainingTodos} of ${todosLength}] todos remaining`}</p>
        )}
    </section>
  )
}
