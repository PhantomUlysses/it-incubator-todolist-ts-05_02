import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TodolistsType} from './App';
import {Button} from "./components/Button";
import {InputWithButton} from "./components/InputWithButton";
import {Input} from "./components/Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID:string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID:string,taskId: string) => void
    changeFilter: (todolistID: string,value: FilterValuesType) => void
    addTask: (todolistID: string,title: string) => void
    changeTaskStatus: (todolistID: string,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    todolists: Array<TodolistsType>
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistID,title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    // const onAllClickHandler = () => props.changeFilter(props.todolistID, 'all');
    // const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    // const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");

    const onFilterButtonClickHandler = (value: FilterValuesType) => props.changeFilter(props.todolistID, value);

    const onClickHandlerForRemoveTodolist = () => props.removeTodolist(props.todolistID);

    const onClickHandlerForRemoveTask = (id: string) => props.removeTask(props.todolistID, id);

    let todolist = props.todolists.find(f => f.id === props.todolistID);

    return <div>
        <h3>{todolist?.title || props.title}<Button callback={onClickHandlerForRemoveTodolist} name={'x'}/></h3>

        {/*<InputWithButton addTask={props.addTask} todolistID={props.todolistID} />*/}
        <Input title={title}
               error={error}
               setTitle={setTitle}
               setError={setError}
               addTask={addTask}
        />
        <Button callback={addTask} name={'+'} />

        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    // const onClickHandler = () => props.removeTask(props.todolistID, t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID,t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <Button callback={() => onClickHandlerForRemoveTask(t.id)} name={'x'}/>
                    </li>
                })
            }
        </ul>
        <div>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed</button>*/}

            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={() => onFilterButtonClickHandler('all')}>All</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*    onClick={() => onFilterButtonClickHandler('active')}>Active</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*    onClick={() => onFilterButtonClickHandler('completed')}>Completed</button>*/}
            <Button callback={() => onFilterButtonClickHandler('all')} name={'all'} filter={props.filter}/>
            <Button callback={() => onFilterButtonClickHandler('active')} name={'active'} filter={props.filter}/>
            <Button callback={() => onFilterButtonClickHandler('completed')} name={'completed'} filter={props.filter}/>
        </div>
    </div>
}
