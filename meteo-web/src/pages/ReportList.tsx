import Layout from '../Layout.tsx';
import { WeatherReport } from '../types.ts';
import { DataGrid, GridActionsCellItem, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

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
    const [reports, setReports] = useState<WeatherReport[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:8000/api/reports');
            const reports: WeatherReport[] = await response.json();
            setReports(reports);
            setIsLoading(false);
        };
        fetchReports();
    }, []);

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
                    loading={isLoading}
                    rows={reports}
                    columns={columns}
                    columnVisibilityModel={{ id: false, unit: false }}
                    slots={{ toolbar: EditToolbar }}
                    slotProps={{
                        loadingOverlay: {
                            variant: 'skeleton',
                            noRowsVariant: 'skeleton'
                        }
                    }}
                />
            </Box>
        </Layout>
    );
}

export default ReportList;