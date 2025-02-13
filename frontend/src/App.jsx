import React, { useState } from "react";
import "./App.css";
import axios from 'axios'

function App() {
  const [firstname, setFirstname] = useState("");
  const [secondname, setSecondname] = useState("");
  const [flamesResult, setFlamesResult] = useState("");
  const [error, setError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [secondNameError, setSecondNameError] = useState("");

  // Mapping the FLAMES results to image URLs (replace with your actual image paths)
  const flamesImages = {
    F: "hello.webp", // replace with actual image path
    L: "hello.webp", // replace with actual image path
    A: "hello.webp", // replace with actual image path
    M: "hello.webp", // replace with actual image path
    E: "hello.webp", // replace with actual image path
    S: "hello.webp", // replace with actual image path
  };

  // Handle the input change for first name with alphabet validation
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value)) {
      setFirstname(value);
      setFirstNameError(""); // Clear error if input is valid
    } else {
      setFirstNameError("Please enter alphabets only");
    }
  };

  // Handle the input change for second name with alphabet validation
  const handleSecondNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value)) {
      setSecondname(value);
      setSecondNameError(""); // Clear error if input is valid
    } else {
      setSecondNameError("Please enter alphabets only");
    }
  };

  // Function to remove common letters
  const removeCommonLetters = (name1, name2) => {
    let arr1 = name1.toLowerCase().split("");
    let arr2 = name2.toLowerCase().split("");
    arr1.forEach((letter, index) => {
      if (arr2.includes(letter)) {
        arr2.splice(arr2.indexOf(letter), 1);
        arr1.splice(index, 1);
      }
    });
    return arr1.length + arr2.length;
  };

  // Function to calculate the result and fetch the appropriate image
  const calculateFlames = () => {
    if (firstname && secondname && !firstNameError && !secondNameError) {
      axios.post('https://day5-rps5.onrender.com/flames',{firstname,secondname}).then((res)=>{
        console.log(res.data)
      })
      const remainingLetters = removeCommonLetters(firstname, secondname);
      const flames = ["F", "L", "A", "M", "E", "S"];
      let resultIndex = remainingLetters % flames.length;
      const result = flames[resultIndex];
      setFlamesResult(result);

      setError("");
    } else {
      setError("Please enter valid names without errors.");
      setFlamesResult(""); // Reset the result if there are errors
    }
  };

  // Display message based on result
  const getResultMessage = () => {
    switch (flamesResult) {
      case "F":
        return "Friends";
      case "L":
        return "Lovers";
      case "A":
        return "Affection";
      case "M":
        return "Marriage";
      case "E":
        return "Enemies";
      case "S":
        return "Siblings";
      default:
        return "";
    }
  };

  const getShareText = () => {
    const websiteURL = window.location.href // Replace this with your actual website URL
    return `Check out my FLAMES result!\nNames: ${firstname} and ${secondname}\nResult: ${getResultMessage()}\n\nTry it out yourself at: ${websiteURL}`;
  };

  return (
    <div className="app-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateFlames();
        }}
        className="form-container"
      >
        <h2 className="form-title">FIND FLAMES</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Firstname"
            value={firstname}
            onChange={handleFirstNameChange}
            className="input-field"
          />
          {firstNameError && <span className="error-message">{firstNameError}</span>}
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Secondname"
            value={secondname}
            onChange={handleSecondNameChange}
            className="input-field"
          />
          {secondNameError && <span className="error-message">{secondNameError}</span>}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button" disabled={firstNameError || secondNameError}>
          Find Flames
        </button>
      </form>

      {flamesResult && (
        <div className="result-container">
          <h3>Result: {getResultMessage()}</h3>
          {flamesResult && <img src={"https://img.jagranjosh.com/images/2025/February/1322025/valentine-wishes.webp"} alt={getResultMessage()} className="result-image" />}
        </div>
      )}

      {flamesResult && (
        <div className="share-container">
          <button
            className="whatsapp-button"
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(getShareText())}`, "_blank")}
          >
            Share on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}


export default App;
