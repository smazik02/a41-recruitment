import Layout from '../Layout.tsx';
import { WeatherReport } from '../types.ts';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box } from '@mui/material';

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
    { field: 'edit', headerName: 'Edit' }
];

function ReportList() {
    return (
        <Layout>
            <Box>
                <DataGrid
                    rows={reports}
                    columns={columns}
                    columnVisibilityModel={{ id: false, unit: false }} />
            </Box>
        </Layout>
    );
}

export default ReportList;