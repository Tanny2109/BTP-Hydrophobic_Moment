import React from 'react'

import { useState } from "react";

function AlphabetValues() {
    const [inputString, setInputString] = useState("");
    const [alphabetValues, setAlphabetValues] = useState({});
    const [currentAlphabet, setCurrentAlphabet] = useState("");

    const handleChange = (event) => {
        setInputString(event.target.value);
    };

    const handleValueChange = (event) => {
        const value = parseFloat(event.target.value);
        setAlphabetValues({ ...alphabetValues, [currentAlphabet]: value });
        setCurrentAlphabet("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(alphabetValues);
    };

    const alphabets = "abcdefghijklmnopqrstuvwxyz";

    const renderValueInput = () => {
        if (currentAlphabet && !alphabetValues[currentAlphabet]) {
            return (
            <div>
                <label>
                Value for {currentAlphabet}:
                <input
                    type="float"
                    step="0.1"
                    onChange={handleValueChange}
                    required
                />
                </label>
            </div>
            );
        }
        return null;
    };

    const renderAlphabetInputs = () => {
        const remainingAlphabets = inputString
        .toLowerCase()
        .replace(new RegExp(`[^${alphabets}]`, "g"), "")
        .replace(new RegExp(`[${Object.keys(alphabetValues).join("")}]`, "g"), "");
        return remainingAlphabets.split("").map((alphabet) => (
        <button key={alphabet} onClick={() => setCurrentAlphabet(alphabet)}>
            {alphabet}
        </button>
        ));
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label>
            Input string:
            <input type="text" value={inputString} onChange={handleChange} />
            </label>
        </div>
        {renderValueInput()}
        <div>
            {renderAlphabetInputs()}
        </div>
        <button type="submit">Submit</button>
        </form>
    );
}

export default AlphabetValues;
