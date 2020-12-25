import React from "react";
import "./TodoBar.css";

interface IProps {
	handleAddToListClick(): void;
	handleHideCompletedChange(value: boolean): void;
	handleInputTextChange(text: string): void;
	hideCompleted: boolean;
	inputText: string;
}

export function TodoBar(props: IProps): JSX.Element {
	const {
		handleInputTextChange,
		inputText,
		handleAddToListClick,
		handleHideCompletedChange,
		hideCompleted,
	} = props;

	return (
		<div className="todo-bar">
			<input
				type="text"
				placeholder="Enter something..."
				onChange={(e) => {
					handleInputTextChange(e.target.value);
				}}
				value={inputText}
			/>

			<div className="todo-bar-filter">
				<input
					type="checkbox"
					style={{ display: "inline" }}
					onChange={(e) => {
						handleHideCompletedChange(e.target.checked);
					}}
					checked={hideCompleted}
				/>{" "}
				Hide Completed Tasks
			</div>

			<button
				onClick={() => {
					handleAddToListClick();
				}}
			>
				Add To List
			</button>
		</div>
	);
}
