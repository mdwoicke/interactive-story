import React from "react";
import "./Toolbar.css";

function Toolbar({ onFormat }) {
	return (
		<div className="toolbar">
			<button onClick={() => onFormat("bold")}>Bold</button>
			<button onClick={() => onFormat("italic")}>Italic</button>
			<button onClick={() => onFormat("underline")}>Underline</button>
			<button onClick={() => onFormat("format")}>Format</button>
		</div>
	);
}

export default Toolbar;
