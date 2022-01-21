import React, {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
    title: string;
    error: string | null;
    setTitle: (title: string) => void;
    setError: (error: string | null) => void;
    addTask: () => void;
}

export const Input = (props: InputPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       props.setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null);
        if (e.charCode === 13) {
            props.addTask();
        }
    }

    return (
        <input value={props.title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={props.error ? "error" : ""}
        />
    )
}