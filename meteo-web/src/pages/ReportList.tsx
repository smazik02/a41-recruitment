import Layout from '../Layout.tsx';
import { WeatherReport } from '../types.ts';
import { DataGrid, GridActionsCellItem, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import { Alert, Button, Stack } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { temperatureToKelvin } from '../validators.ts';

type ReportListState = 'LOADING' | 'VIEW' | 'ERROR';

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
    const [reportState, setReportState] = useState<ReportListState>('VIEW');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            setReportState('LOADING');
            try {
                const response = await fetch('http://localhost:8000/api/reports');
                const reports: WeatherReport[] = await response.json();
                setReports(reports);
                setReportState('VIEW');
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                setReportState('ERROR');
            }
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
                return `${temperatureToKelvin(temp, row.unit)} K`;
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
            <Stack direction="column" spacing={1}>
                <DataGrid
                    loading={reportState === 'LOADING'}
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
                {reportState === 'ERROR' && <Alert severity="error">Failed to fetch reports!</Alert>}
            </Stack>
        </Layout>
    );
}

export default ReportList;