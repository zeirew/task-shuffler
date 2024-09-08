import './CreateOverlay.css';
import { useState } from 'react';

function CreateOverlay({onClose}: { onClose: () => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async () => {
        const formData = {
            title,
            description,
        };

        try {

            if (formData.title.trim().length == 0){
                throw Error("Empty title. ")
            }

            const response = await fetch('http://localhost:3000/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Data added successfully:', result);
                onClose();
            } else {
                throw Error('Error adding data:' + response.statusText)
            }
        } catch (error: any) {
            setErrorMessage(error.message)
            console.error('Network error:', error);
        }
   };

    return (
       <div className="overlay">
        <div className="overlay-content">
            <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            <form id="createForm" className="form-container">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)}/> 
            
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" className="description-text-area" onChange={(e) => setDescription(e.target.value)}></textarea>

                <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
            </form>
            {errorMessage != "" && (<h4 className="error">Error: {errorMessage}</h4>)}
        </div>
    </div>
    )
}

export default CreateOverlay;