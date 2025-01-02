import React, { useState } from "react";
import "./Key.css"; // Import Key-specific styles


function SubmitKey() {
    const [keyinput, setInput] = useState(""); // State to store user input
  
    const handleSubmit = () => {
      // Send the input string to the backend
      console.log("Sending to backend:", keyinput);
      fetch("https://your-backend-api.com/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: keyinput }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Response from backend:", data))
        .catch((error) => console.error("Error:", error));
  
      // Optionally clear the input after submitting
      setInput("");
    };
  
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };
  
    return (
      <>
        <div className="sub-key">
          <input
            type="text"
            value={keyinput}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress} // Submit on pressing Enter
            placeholder="Paste the key..."
          />
          <button onClick={handleSubmit}>Enter</button>
        </div>
      </>
    );
  }




function GenerateKey() {
  // State variables to manage key and loading state
  const [key, setKey] = useState(""); // quando hai backend forse devi mettere null
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    // Copy the text to the clipboard
    navigator.clipboard.writeText(key).then(() => {
      alert("Text copied to clipboard!"); // Optional: Show a confirmation
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy text.");
    });
  };

  const handleGenerateKey = async () => {
    setIsLoading(true); // Set loading state to true
  
    try {
      // Simulated delay to mimic an actual backend call
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Mock response to simulate backend
      const mockResponse = { key: "abcd-efgh-ilmn-pqrs" };
      setKey(mockResponse.key); // Use the mock key
  
      // Uncomment the following lines when your backend is ready:
      /*
      const response = await fetch('/api/generate-key');
      const data = await response.json();
  
      if (response.ok) {
        setKey(data.key); // Assuming the backend returns the key in the 'key' field
      } else {
        alert('Error generating key');
      }
      */
    } catch (error) {
      console.error('Error fetching key:', error);
      alert('Failed to generate key');
    } finally {
      setIsLoading(false); // Set loading state to false after request completes
    }
  };
  

  return (
    <>
    <div className="gen-key">
      <p>Don't have a key?</p>
      <button onClick={handleGenerateKey} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate one'}
      </button>
    </div>
    {key && (<>
              <div className="copy-to-clipboard">
              <p>{key}</p>
              <button onClick={handleCopy}>❑ copy</button>
            </div>
        <p className="gen-key-message">
            Now you can paste the key and share it with your colleagues or friends.<br/>
            Anyone possessing the key can access and modify the board - no registration needed.
        </p>
        </>
    )}
    </>
  );
};


export { SubmitKey, GenerateKey }