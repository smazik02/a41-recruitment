import Layout from '../Layout.tsx';
import { WeatherReport } from '../types.ts';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowsProp, GridToolbarContainer } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const reports: GridRowsProp<WeatherReport> = [
    {
        id: '29242699-5914-4a00-b1ac-1e0113a7a802',
        temperature: 270,
        unit: 'K',
        date: '2022-01-01',
        city: 'London'
    },
    {
        id: 'b58798e7-eca4-4bb0-8e93-d595067092c7',
        temperature: 100,
        unit: 'F',
        date: '2021-02-11',
        city: 'Los Angeles'
    }
];

function EditToolbar() {
    const navigate = useNavigate();

    return <GridToolbarContainer>
        <Button
            color="primary"
            startIcon={<Add />}
            onClick={() => navigate('/report/new')}>
            Add report
        </Button>
    </GridToolbarContainer>;
}

function ReportList() {
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: 'id' },
        {
            field: 'temperature',
            headerName: 'Temperature',
            type: 'number',
            valueGetter: (temp: number, row: WeatherReport) => {
                switch (row.unit) {
                    case 'C': {
                        return `${temp + 273} K`;
                    }
                    case 'F': {
                        return `${Math.round((temp + 459.67) * 5 / 9)} K`;
                    }
                    case 'K': {
                        return `${temp} K`;
                    }
                }
            }
        },
        { field: 'unit' },
        { field: 'date', headerName: 'Date' },
        { field: 'city', headerName: 'City' },
        {
            field: 'edit', type: 'actions', headerName: 'Edit', getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        sx={{ color: 'primary.main' }}
                        onClick={() => navigate(`/report/${id}`)} />
                ];
            }
        }
    ];

    return (
        <Layout>
            <Box>
                <DataGrid
                    rows={reports}
                    columns={columns}
                    columnVisibilityModel={{ id: false, unit: false }}
                    slots={{ toolbar: EditToolbar }} />
            </Box>
        </Layout>
    );
}

export default ReportList;