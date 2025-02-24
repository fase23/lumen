import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./Board.css";



function Notes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState(location.state?.data || []);
  const [newContent, setNewContent] = useState("");
  const [newColor, setNewColor] = useState("#C80909");
  const [loading, setLoading] = useState(false);
  //const secretKey = notes.length > 0 ? notes[0].secret_key : location.state?.secretKey;
  const secretKey = location.state?.secretKey;


  const refresh = async() =>{
    setLoading(true);
    try {
        const response = await fetch(`https://qmqubx4qde4n6owgohrvpgjygm0teogs.lambda-url.eu-west-1.on.aws/?secret_key=${encodeURIComponent(secretKey)}`);
        if (response.ok) {
        const data = await response.json();
        setNotes(data);
        } else {
        alert("Error fetching notes");
        }
    } catch (error) {
        console.error("Error fetching notes:", error);
    } finally {
        setLoading(false);
    }
    };


  const handleDelete = async (secretKey: string, noteId: string) => {
    try {
      const response = await fetch("https://qmqubx4qde4n6owgohrvpgjygm0teogs.lambda-url.eu-west-1.on.aws", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete_note",
          secret_key: secretKey,
          note_id: noteId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      const updatedNotes = await response.json(); // Assume API returns the new list of notes
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };


    // Create a new note
    const handleCreateNote = async () => {
        if (!newContent.trim()) return; // Avoid empty notes

        try {
        const response = await fetch("https://qmqubx4qde4n6owgohrvpgjygm0teogs.lambda-url.eu-west-1.on.aws", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            action: "create_note",
            secret_key: secretKey,
            content: newContent,
            color: newColor,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create note");
        }

        const updatedNotes = await response.json(); // Get updated list
        setNotes(updatedNotes);
        setNewContent(""); // Clear input after submission
        // setNewColor("#ffffff"); // Reset color
        } catch (error) {
        console.error("Error creating note:", error);
        }
    };

    useEffect(() => {
            refresh();
        }, []);


    return (
        
        <div className="container">
            <h1 className="welcome-title">Welcome to the Board!</h1>
            
            {/* Form to Add a New Note */}
            <div className="new-note-form">
            <input
                className="input-text"
                type="text"
                placeholder="Enter note content..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
            />
            <label className="color-picker">
            🎨 pick a color
                <input
                    className="input-color"
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)} 
                />
            </label>
            <button className="add-button" onClick={handleCreateNote}>
                ✚ add note
            </button>
            </div>

            <button className="refresh-button" onClick={refresh} disabled={loading}>
                ⟳
            </button>   

            <div className="corp-container">
                <div className="main-wrapper">
                {loading ? <h2 className="h2-loading">Loading...</h2> : <div>
                    {notes.length === 0 ?  <h2 className="h2-loading">No notes yet, create a new one!</h2> : null}
                
                    {/* Notes Grid */}
                    {notes.length > 0 && (
                    <div className="grid-container">
                        {notes.map((note: any) => (
                        <div key={note.note_id} className="note-card" style={{ backgroundColor: note.color }}>
                            <button className="delete-button" onClick={() => handleDelete(note.secret_key, note.note_id)}>
                            ✖
                            </button>
                            {note.content}
                        </div>
                        ))}
                    </div>
                    )}
                    </div>}
                </div>
            
                <div className="bottom-box">
                    {/* Bottom */}
                    <p className="key-reminder">REMINDER: Save your key <strong>{secretKey}</strong> before leaving the page! Without it, you won't be able to access this board again. <br/>
                        You can share this key to let others contribute, but be cautious - anyone possessing the key can view, modify, or delete the cards.
                    </p>
                    <button className="back-button" onClick={() => navigate("/")}>
                    Go Back
                    </button>
                </div>
            </div>
        </div>
        );
        }

export default Notes;
