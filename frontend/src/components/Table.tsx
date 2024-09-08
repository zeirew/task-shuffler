import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import CreateOverlay from './CreateOverlay';
import TaskMenu from './TaskMenu';
import './Table.css';
import ViewOverlay from './ViewOverlay';

export type TableRow = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
};

const DateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'America/New_York', 
  timeZoneName: 'short'
};

const columns = (handleView: (row: TableRow) => void, handleEdit: (row: TableRow) => void, handleDelete: (row: TableRow) => void) => [
    {
        name: 'ID',
        selector: (row: TableRow) => row.id,
        width: '0px',
        style: {
            display: 'none', 
        },
        omit: true, 
    },
    {
        name: "Title",
        selector: (row: TableRow ) => row.title,
        sortable: true,
    },
    {
        name: "Description",
        selector: (row: TableRow ) => row.description,
    },
    {
        name: "Completed",
        selector: (row: TableRow ) => (row.completed ? "Yes" : "No"),
    },
    {
        name: "Completed At",
        selector: (row: TableRow) => (row.completedAt ? new Intl.DateTimeFormat('en-US', DateOptions).format(new Date(row.completedAt)) : "-"),
        sortable: true,
    },
    {
        name: "Created At",
        selector: (row: TableRow ) => new Intl.DateTimeFormat('en-US', DateOptions).format(new Date(row.createdAt)),
        sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: TableRow) => (
        <TaskMenu
          onView={() => handleView(row)}
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row)}
        />
      )
    },
];

function Table(){
    const [data, setData] = useState([]);
    const [openCreateOverlay, setOpenCreateOverlay] = useState(false);
    const [viewRow, setViewRow] = useState<TableRow | null>(null);
    const [editRow, setEditRow] = useState<TableRow | null>(null);
    const [deleteRow, setDeleteRow] = useState<TableRow | null>(null);

    const handleOpenCreateOverlay = () => {
        setOpenCreateOverlay(true);
    };

    const handleCloseCreateOverlay = () => {
        setOpenCreateOverlay(false);
    };

    const handleView = (task: TableRow) => {
        setViewRow(task);
    };

    const handleEdit = (task: TableRow) => {
        setEditRow(task);
    };

    const handleDelete = (task: TableRow) => {
        setDeleteRow(task);
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/tasks')
        .then(response => response.json())
        .then(data => setData(data["data"]))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <button onClick={handleOpenCreateOverlay}>+</button>
            {openCreateOverlay && (
                <CreateOverlay onClose={handleCloseCreateOverlay} />
            )}
            {viewRow != null && (
                <ViewOverlay task={viewRow}/>
            )}
            <div className="container my-5">
                <DataTable className="react-data-table" columns={columns(handleView, handleEdit, handleDelete)} data={data} fixedHeader title="Task Dashboard" pagination/>
            </div>
        </div>
    )
}

export default Table;