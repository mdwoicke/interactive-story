const API_KEY = "YOUR API HERE";

export const fetchStreamingResponse = async (input) => {
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
		body: JSON.stringify({
			model: "gpt-4",
			messages: [{ role: "user", content: input }],
			max_tokens: 100,
			stream: true,
		}),
	});

	return response.body;
};
