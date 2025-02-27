import { useParams } from 'react-router';
import Layout from '../Layout.tsx';
import { Alert, Button, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { Check, Delete, Save } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import { TemperatureUnit } from '../types.ts';

interface ReportForm {
    temperature?: number;
    unit: TemperatureUnit;
    date?: string;
    city?: string;
}

function ReportForm() {
    const [formData, setFormData] = useState<ReportForm>({ unit: 'K' });
    const [error] = useState<string | null>(null);

    const params = useParams<{ reportId?: string }>();

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

    const units = [{ value: 'C', label: '°C' }, { value: 'F', label: '°F' }, { value: 'K', label: 'K' }];

    return (
        <Layout>
            <form>
                <Stack direction="column" spacing={1} sx={{ maxWidth: '300px' }}>
                    <Stack direction="row" spacing={1}>
                        <TextField required fullWidth type="number" label="Temperature" value={formData.temperature}
                                   onChange={(e) => handleTemperatureChange(e)} />
                        <Select value={formData.unit} onChange={(e) => handleUnitChange(e)}>
                            {units.map(unit => (
                                <MenuItem key={unit.value} value={unit.value}>
                                    {unit.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <TextField required label="Date" value={formData.date} onChange={(e) => handleDateChange(e)} />
                    <TextField required fullWidth label="City" value={formData.city}
                               onChange={(e) => handleCityChange(e)} />
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
                        {params.reportId === undefined && <Button variant="contained" endIcon={<Check />}>Add</Button>}
                        {params.reportId !== undefined && <Button variant="contained" endIcon={<Save />}>Save</Button>}
                        {params.reportId !== undefined &&
                            <Button variant="outlined" endIcon={<Delete />}>Delete</Button>}
                    </Stack>
                    {error && <Alert severity="error">Something went wrong!</Alert>}
                </Stack>
            </form>

        </Layout>
    );
}

export default ReportForm;