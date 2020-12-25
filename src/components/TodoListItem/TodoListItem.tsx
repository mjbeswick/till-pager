import React from "react";
import { Todo } from "../../types";
import "./TodoListItem.css";

interface IProps {
	todo: Todo;
	handleTodoDoneClick(id: string): void;
	handleTodoRemoveClick(id: string): void;
}

export function TodoListItem(props: IProps): JSX.Element {
	const labelStyle = props.todo.isDone
		? { textDecoration: "line-through" }
		: {};

	return (
		<li className="todo-list-item">
			<label style={labelStyle}>{props.todo.text}</label>

			<button
				onClick={() => {
					props.handleTodoRemoveClick(props.todo.id);
				}}
			>
				❌
			</button>

			{!props.todo.isDone ? (
				<button
					onClick={() => {
						props.handleTodoDoneClick(props.todo.id);
					}}
				>
					✅
				</button>
			) : (
				<></>
			)}
		</li>
	);
}
