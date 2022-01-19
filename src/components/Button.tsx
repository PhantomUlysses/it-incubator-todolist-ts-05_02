import React from "react";
import {FilterValuesType} from "../App";

type ButtonPropsType = {
    callback: () => void;
    name: string;
    filter: FilterValuesType
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callback();
    }

    return (
        <button onClick={onClickHandler} className={props.filter === props.name ? "active-filter" : ""}>{props.name}</button>
    )
}

