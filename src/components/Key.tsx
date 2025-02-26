
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Key.css"; // Import Key-specific styles


function SubmitKey() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    //const [keyinput, setInput] = useState(""); // old
    const [keyinput, setInput] = useState(localStorage.getItem("secretKey") || ""); // Load key from localStorage
  
    useEffect(() => {
        localStorage.setItem("secretKey", keyinput); // Store key when it changes
    }, [keyinput]);
  
    const handleSubmit = async() => {
      setLoading(true);

      try {
        const response = await fetch(`https://qmqubx4qde4n6owgohrvpgjygm0teogs.lambda-url.eu-west-1.on.aws/?secret_key=${encodeURIComponent(keyinput)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) { // HTTP status 200-299
          const data = await response.json();
          navigate("/board", { state: { data, secretKey: keyinput } }); // Navigate to new page with data
        } else {
          alert("Error fetching data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Network error");
      } finally {
        setLoading(false);
      }
    
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
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Enter"}
          </button>
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
      /* -------------------old-----------------------
      // Simulated delay to mimic an actual backend call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock response to simulate backend
      const mockResponse = { key: "abcd-efgh-ilmn-pqrs" };
      setKey(mockResponse.key); // Use the mock key
      ------------------------------------------------ */

      const payload = { action: 'generate_secret_key' };

      const response = await fetch('https://qmqubx4qde4n6owgohrvpgjygm0teogs.lambda-url.eu-west-1.on.aws', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setKey(data.secret_key); // Assuming the backend returns the key in the 'secret_key' field
      } else {
        alert('Error generating key');
      }
      

      
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