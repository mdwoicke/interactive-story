import React, { useState, useEffect, useRef, useCallback } from "react";
import { handleInputSubmit } from "../handleInput";
import BlinkingCursor from "./BlinkingCursor";
import "./TextDisplay.css";

function TextDisplay({ userInput, aiResponse, onSubmit }) {
	const [input, setInput] = useState("");
	const [userInputState, setUserInput] = useState(userInput);
	const [aiResponseState, setAiResponse] = useState(aiResponse);
	const [isEditing, setIsEditing] = useState(false);
	const [editableAiResponse, setEditableAiResponse] = useState(aiResponse);

	const displayRef = useRef(null);

	const handleKeyPress = useCallback(
		async (e) => {
			if (e.key === "Enter" && input.trim() !== "") {
				e.preventDefault();
				await handleInputSubmit(
					input,
					setUserInput,
					setAiResponse,
					userInputState,
					aiResponseState
				);
				setInput("");

				// Call onSubmit here
				if (onSubmit) {
					onSubmit(input);
				}
			} else if (e.key !== "Enter") {
				setInput((prev) => prev + e.key);
			}
		},
		[
			input,
			onSubmit,
			setUserInput,
			setAiResponse,
			userInputState,
			aiResponseState,
		]
	);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Backspace" || e.key === " ") {
				e.preventDefault();
				if (e.key === "Backspace") {
					setInput((prev) => prev.slice(0, -1));
				} else if (e.key === " ") {
					setInput((prev) => prev + " ");
				}
			}
		};

		window.addEventListener("keypress", handleKeyPress);
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keypress", handleKeyPress);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyPress]);

	const handleEditToggle = () => {
		if (isEditing) {
			setAiResponse(editableAiResponse);
		}
		setIsEditing(!isEditing);
	};

	const handleEditableChange = (e) => {
		setEditableAiResponse(e.target.value);
	};

	return (
		<div className="text-display-container" ref={displayRef}>
			<div className="text-content">
				<p className="gradient-text">
					{userInputState}
					{isEditing ? (
						<textarea
							value={editableAiResponse}
							onChange={handleEditableChange}
							className="editable-textarea"
						/>
					) : (
						aiResponseState
					)}
					<span>{input}</span>
					<BlinkingCursor />
				</p>
				<button onClick={handleEditToggle}>
					{isEditing ? "Save" : "Edit"}
				</button>
			</div>
		</div>
	);
}

export default TextDisplay;
