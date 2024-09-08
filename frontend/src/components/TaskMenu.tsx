import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';
import './TaskMenu.css';

interface TaskMenuProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskMenu: React.FC<TaskMenuProps> = ({ onView, onEdit, onDelete }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <FaCog color="grey"/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onView}>View</Dropdown.Item>
        <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TaskMenu;