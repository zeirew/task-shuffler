import { TableRow } from "./Table";
import './ViewOverlay.css';
import { FaSquareXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

function ViewOverlay({ task }: { task: TableRow }) {

     return (
       <div className="overlay">
        <div className="overlay-content">
            <div className="content-wrapper">
            
                <label htmlFor="title"><b>Title:</b> {`${task.title}`}</label>
                <label htmlFor="description"><b>Description:</b> {task.description ? `${task.description}` : '-'}</label>
                <label htmlFor="completed"><b>Completed:</b> {task.completed ? <FaCheckCircle /> : <FaSquareXmark />}</label>
                <label htmlFor="completedAt"><b>Completed At:</b> {task.completedAt ? `${task.completedAt}` : '-'}</label>
                <label htmlFor="createdAt"><b>Created At:</b> {`${task.createdAt}`}</label>
            </div>
        </div>
    </div>
    )
}

export default ViewOverlay;