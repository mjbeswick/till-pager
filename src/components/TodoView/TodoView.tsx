import React from "react";
import { Todo } from "../../types";
import { TodoBar } from "../TodoBar/TodoBar";
import { TodoList } from "../TodoList/TodoList";

interface IProps {}

interface IState {
	todos: Array<Todo>;
	hideCompleted: boolean;
	inputText: string;
}

export class TodoView extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			todos: [],
			hideCompleted: false,
			inputText: "",
		};

		this.handleInputTextChange = this.handleInputTextChange.bind(this);
		this.handleAddToListClick = this.handleAddToListClick.bind(this);
		this.handleTodoDoneClick = this.handleTodoDoneClick.bind(this);
		this.handleTodoRemoveClick = this.handleTodoRemoveClick.bind(this);
		this.handleHideCompletedChange = this.handleHideCompletedChange.bind(this);
	}

	handleInputTextChange(text: string): void {
		this.setState({ inputText: text });
	}

	handleAddToListClick(): void {
		const { inputText } = this.state;

		if (inputText.trim() === "") {
			return alert("Please enter something first!.");
		}

		this.setState({
			todos: [
				...this.state.todos,
				{ id: new Date().valueOf().toString(), text: inputText, isDone: false },
			],
			inputText: "",
		});
	}

	handleTodoDoneClick(id: string): void {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) todo.isDone = true;
				return todo;
			}),
		});
	}

	handleTodoRemoveClick(id: string): void {
		this.setState({ todos: this.state.todos.filter((todo) => todo.id !== id) });
	}

	handleHideCompletedChange(value: boolean): void {
		this.setState({ hideCompleted: value });
	}

	render(): JSX.Element {
		return (
			<div>
				<TodoBar
					handleAddToListClick={this.handleAddToListClick}
					handleHideCompletedChange={this.handleHideCompletedChange}
					hideCompleted={this.state.hideCompleted}
					handleInputTextChange={this.handleInputTextChange}
					inputText={this.state.inputText}
				/>
				<TodoList
					todos={this.state.todos}
					handleTodoDoneClick={this.handleTodoDoneClick}
					handleTodoRemoveClick={this.handleTodoRemoveClick}
					hideCompleted={this.state.hideCompleted}
				/>
			</div>
		);
	}
}
