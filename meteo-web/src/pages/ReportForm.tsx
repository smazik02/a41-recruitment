import { useNavigate, useParams } from 'react-router';
import Layout from '../Layout.tsx';
import { Alert, Button, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { Check, Delete, Save } from '@mui/icons-material';
import { ChangeEvent, useEffect, useState } from 'react';
import { TemperatureUnit, WeatherReport } from '../types.ts';

interface ReportForm {
    temperature?: number;
    unit: TemperatureUnit;
    date?: string;
    city?: string;
}

function ReportForm() {
    const [formData, setFormData] = useState<ReportForm>({ unit: 'K' });
    const [error, setError] = useState<string | null>(null);

    const params = useParams<{ reportId?: string }>();

    const navigate = useNavigate();

    useEffect(() => {
        if (params.reportId !== undefined) {
            const fetchReport = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/reports/${params.reportId}`);
                    const report: WeatherReport = await response.json();
                    setFormData({
                        temperature: report.temperature,
                        unit: report.unit,
                        date: report.date,
                        city: report.city
                    });
                } catch (e) {
                    setError(`${e}`);
                }
            };

            fetchReport();
        }
    }, [params.reportId]);

    const handleTemperatureChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, temperature: +e.target.value });
    };

    const handleUnitChange = (e: SelectChangeEvent) => {
        setFormData({ ...formData, unit: e.target.value as TemperatureUnit });
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, date: e.target.value });
    };

    const handleCityChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, city: e.target.value });
    };

    const handleAddReport = () => {
        const addReport = async () => {
            setError(null);
            const response = await fetch('http://localhost:8000/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.status !== 200) {
                setError('Something went wrong!');
            } else {
                navigate('/reports');
            }
        };

        addReport();
    };

    const handleSaveReport = () => {
        const saveReport = async () => {
            setError(null);
            const response = await fetch(`http://localhost:8000/api/reports/${params.reportId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.status !== 200) {
                setError('Something went wrong!');
            } else {
                navigate('/reports');
            }
        };

        saveReport();
    };

    const handleDeleteReport = () => {
        const deleteReport = async () => {
            setError(null);
            const response = await fetch(`http://localhost:8000/api/reports/${params.reportId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status !== 200) {
                setError('Something went wrong!');
            } else {
                navigate('/reports');
            }
        };

        deleteReport();
    };

    const units = [{ value: 'C', label: '°C' }, { value: 'F', label: '°F' }, { value: 'K', label: 'K' }];

    return (
        <Layout>
            <form>
                <Stack direction="column" spacing={1} sx={{ maxWidth: '300px' }}>
                    <Stack direction="row" spacing={1}>
                        <TextField required fullWidth type="number" label="Temperature"
                                   value={formData.temperature || 273}
                                   onChange={(e) => handleTemperatureChange(e)} />
                        <Select value={formData.unit} onChange={(e) => handleUnitChange(e)}>
                            {units.map(unit => (
                                <MenuItem key={unit.value} value={unit.value}>
                                    {unit.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <TextField required label="Date" value={formData.date || ''}
                               onChange={(e) => handleDateChange(e)} />
                    <TextField required fullWidth label="City" value={formData.city || ''}
                               onChange={(e) => handleCityChange(e)} />
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
                        {params.reportId
                            ? <>
                                <Button variant="contained" endIcon={<Save />} onClick={handleSaveReport}>Save</Button>
                                <Button variant="outlined" endIcon={<Delete />}
                                        onClick={handleDeleteReport}>Delete</Button>
                            </>
                            : <Button variant="contained" endIcon={<Check />} onClick={handleAddReport}>Add</Button>}
                    </Stack>
                    {error !== null && <Alert severity="error">Something went wrong!</Alert>}
                </Stack>
            </form>
        </Layout>
    );
}

export default ReportForm;