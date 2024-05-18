import { fetchStreamingResponse } from "./api";

export const handleInputSubmit = async (
	input,
	setUserInput,
	setAiResponse,
	userInput,
	aiResponse
) => {
	const updatedUserInput = `${userInput}${input} `;
	setUserInput(updatedUserInput);

	const prompt = `You are a creative and imaginative storyteller. Your task is to continue and expand upon the following text to create a compelling and interesting story. The story should have engaging characters, vivid descriptions, and a coherent plot. You can introduce new elements, settings, and twists as necessary to make the story captivating.

Please continue the story based on the text provided below. 

<IMPORTANT> DO NOT REPEAT THE USER INPUT!

Story so far: ${userInput}${aiResponse}

The last input from the user was: "${input}"

Continue the story from where the USER'S last sentence OR WORD ends.`;

	const stream = await fetchStreamingResponse(prompt);
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	let aiText = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		const decodedValue = decoder.decode(value);
		const lines = decodedValue.split("\n");

		for (const line of lines) {
			if (line.trim().startsWith("data: ")) {
				const jsonString = line.trim().substring(6);
				if (jsonString !== "[DONE]") {
					try {
						const json = JSON.parse(jsonString);
						if (json.choices && json.choices.length > 0) {
							const content = json.choices[0].delta?.content || "";
							aiText += content;
						}
					} catch (error) {
						console.error("Failed to parse JSON:", error);
					}
				}
			}
		}
	}

	// Only append the new AI response if it doesn't repeat the user's input
	if (!aiText.startsWith(input)) {
		setAiResponse((prev) => prev + aiText);
	}
};
