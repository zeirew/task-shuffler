import './CreationOverlay.css';

function CreationOverlay({onClose}) {
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
                <input type="text" id="title" name="title" required/> 
            
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" className="description-text-area"></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    )
}

export default CreationOverlay;