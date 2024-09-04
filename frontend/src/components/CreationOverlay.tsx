import './CreationOverlay.css';

function CreationOverlay({ onClose }) {
    return (
       <div className="overlay">
        <div className="overlay-content">
            <button className="button-container" type="submit">X</button>
            <form id="createForm" className="form-container">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required/> 
            
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description"></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    )
}

export default CreationOverlay;