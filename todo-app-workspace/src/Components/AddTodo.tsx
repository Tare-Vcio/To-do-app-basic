import { ChangeEvent, FormEvent } from "react"


export type AddTodoProps = {
    task: string
    handleSubmitTodo: (e: FormEvent) => void
    handleChange: (e: ChangeEvent) => void
}

export const AddTodo = ({
    task,
    handleSubmitTodo,
    handleChange
}: AddTodoProps) => (
    <form className={"flex justify-between w-full border-slate-200"} onSubmit={handleSubmitTodo}>
        <input className="w-full" type="text" name="task" value={task} onChange={handleChange} />
        <button type="submit" aria-label="Add todo">
            +
        </button>
    </form>
)
