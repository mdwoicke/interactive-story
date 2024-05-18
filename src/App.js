import React, { useState } from "react";
import TextDisplay from "./components/TextDisplay";
import { handleInputSubmit } from "./handleInput";
import "./App.css";

function App() {
	const [userInput, setUserInput] = useState("");
	const [aiResponse, setAiResponse] = useState("");

	return (
		<div className="App">
			<TextDisplay
				userInput={userInput}
				aiResponse={aiResponse}
				onSubmit={(input) =>
					handleInputSubmit(
						input,
						setUserInput,
						setAiResponse,
						userInput,
						aiResponse
					)
				}
			/>
		</div>
	);
}

export default App;
