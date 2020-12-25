import React from "react";
import { Todo } from "../../types";
import { TodoListItem } from "../TodoListItem/TodoListItem";

export function TodoList(props: any): JSX.Element {
	const todos = props.todos as Array<Todo>;
	const style = { padding: 0 };

	return (
		<div>
			<ul style={style}>
				{todos.map((todo) => {
					if (props.hideCompleted && todo.isDone) return;
					return (
						<TodoListItem
							key={todo.id}
							todo={todo}
							handleTodoDoneClick={props.handleTodoDoneClick}
							handleTodoRemoveClick={props.handleTodoRemoveClick}
						/>
					);
				})}
			</ul>
		</div>
	);
}
