import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import CreationOverlay from './CreationOverlay';

type TableRow = {
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

const columns = [
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
        selector: (row: TableRow ) => (row.createdAt ? new Intl.DateTimeFormat('en-US', DateOptions).format(new Date(row.createdAt)) : "-"),
        sortable: true,
    },
];

function Table(){
    const [data, setData] = useState([]);
    const [openOverlay, setOpenOverlay] = useState(false);

    const handleOpenOverlay = () => {
        setOpenOverlay(true);
    };

    const handleCloseOverlay = () => {
        setOpenOverlay(false);
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/tasks')
        .then(response => response.json())
        .then(data => setData(data["data"]))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <button onClick={handleOpenOverlay}>+</button>
            {openOverlay && (
                <CreationOverlay onClose={handleCloseOverlay} />
            )}
            <div className="container my-5">
                <DataTable columns={columns} data={data} fixedHeader title="Task Dashboard" pagination selectableRows/>
            </div>
        </div>
    )
}

export default Table;