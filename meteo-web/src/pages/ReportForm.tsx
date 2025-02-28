import { useNavigate, useParams } from 'react-router';
import Layout from '../Layout.tsx';
import { Alert, Button, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { ArrowBack, Check, Delete, Save } from '@mui/icons-material';
import { ChangeEvent, useEffect, useState } from 'react';
import { TemperatureUnit } from '../types.ts';
import { validateForm } from '../validators.ts';
import { DatePicker, PickerValidDate } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { EmptyFieldError, NotFoundError } from '../errors.ts';
import { addReport, deleteReport, fetchReport, saveReport } from '../apiclient.ts';

export interface IReportForm {
    temperature: number;
    unit: TemperatureUnit;
    date: string;
    city: string;
}

function ReportForm() {
    const [formData, setFormData] = useState<IReportForm>({ temperature: 0, unit: 'K', date: '', city: '' });
    const [error, setError] = useState<string | null>(null);
    const [emptyFields, setEmptyFields] = useState<Set<string>>(new Set([]));

    const params = useParams<{ reportId?: string }>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReportLocal = async () => {
            if (params.reportId === undefined) return;

            try {
                const report = await fetchReport(params.reportId);
                setFormData({
                    temperature: report.temperature,
                    unit: report.unit,
                    date: report.date,
                    city: report.city
                });
            } catch (err) {
                if (err instanceof NotFoundError) {
                    navigate('/notfound');
                } else if (err instanceof Error) {
                    setError(`Something went wrong! ${err.message}`);
                }
            }
        };

        fetchReportLocal();
    }, [params.reportId, navigate]);

    const resetForm = () => {
        setFormData({ temperature: 0, unit: 'K', date: '', city: '' });
        setError(null);
        setEmptyFields(new Set([]));
    };

    const handleTemperatureChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, temperature: +e.target.value });
    };

    const handleUnitChange = (e: SelectChangeEvent) => {
        setFormData({ ...formData, unit: e.target.value as TemperatureUnit });
    };

    const handleDateChange = (date: PickerValidDate | null) => {
        const formatDate = (date: Date) => {
            return [
                `${date.getFullYear()}`,
                `${date.getMonth() + 1}`.padStart(2, '0'),
                `${date.getDate()}`.padStart(2, '0')
            ].join('-');
        };

        const dateToJs = date?.toDate();
        if (dateToJs === undefined) return;

        setFormData({ ...formData, date: formatDate(dateToJs) });
    };

    const handleCityChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, city: e.target.value });
    };

    const handleAddReport = () => {
        const addReportLocal = async () => {
            setError(null);
            setEmptyFields(new Set([]));

            try {
                validateForm(formData);
                await addReport(formData);
                navigate('/reports');
            } catch (err) {
                if (err instanceof EmptyFieldError) {
                    setError(err.message);
                    setEmptyFields(err.fields);
                } else if (err instanceof Error) {
                    setError(`Something went wrong! ${err.message}`);
                }
            }
        };

        addReportLocal();
    };

    const handleSaveReport = () => {
        const saveReportLocal = async () => {
            if (params.reportId === undefined) return;

            setError(null);
            setEmptyFields(new Set([]));

            try {
                validateForm(formData);
                await saveReport(params.reportId, formData);
                navigate('/reports');
            } catch (err) {
                if (err instanceof EmptyFieldError) {
                    setError(err.message);
                    setEmptyFields(err.fields);
                } else if (err instanceof Error) {
                    setError(`Something went wrong! ${err.message}`);
                }
            }
        };

        saveReportLocal();
    };

    const handleDeleteReport = () => {
        const deleteReportLocal = async () => {
            if (params.reportId === undefined) return;

            try {
                setError(null);
                await deleteReport(params.reportId);
                navigate('/reports');
            } catch (err) {
                if (err instanceof Error) {
                    setError(`Something went wrong! ${err.message}`);
                }
            }
        };

        deleteReportLocal();
    };

    const units = [{ value: 'C', label: '°C' }, { value: 'F', label: '°F' }, { value: 'K', label: 'K' }];

    return (
        <Layout>
            <form>
                <Stack direction="column" spacing={1}>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
                        <Button
                            variant="text"
                            startIcon={<ArrowBack />}
                            onClick={() => navigate('/reports')}
                        >Go Back</Button>
                        {params.reportId === undefined && <Button variant="text" onClick={resetForm}>Reset</Button>}
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            required
                            fullWidth
                            type="number" label="Temperature"
                            value={formData.temperature}
                            onChange={(e) => handleTemperatureChange(e)}
                            error={emptyFields.has('temperature')}
                            helperText={emptyFields.has('temperature') ? 'Input temperature!' : ''} />
                        <Select value={formData.unit} onChange={(e) => handleUnitChange(e)}>
                            {units.map(unit => (
                                <MenuItem key={unit.value} value={unit.value}>
                                    {unit.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <DatePicker
                        label="Date"
                        value={dayjs(formData.date)}
                        format="YYYY-MM-DD"
                        onChange={(val) => {
                            handleDateChange(val);
                        }}
                        slotProps={{
                            textField: {
                                helperText: emptyFields.has('date') ? 'Input date!' : ''
                            }
                        }}
                    />
                    <TextField
                        required
                        label="City"
                        value={formData.city}
                        onChange={(e) => handleCityChange(e)}
                        error={emptyFields.has('city')}
                        helperText={emptyFields.has('city') ? 'Input city!' : ''} />
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
                        {params.reportId
                            ? <>
                                <Button variant="contained" endIcon={<Save />} onClick={handleSaveReport}>Save</Button>
                                <Button variant="outlined" endIcon={<Delete />}
                                        onClick={handleDeleteReport}>Delete</Button>
                            </>
                            : <Button variant="contained" endIcon={<Check />} onClick={handleAddReport}>Add</Button>}
                    </Stack>
                    {error !== null && <Alert severity="error">{error}</Alert>}
                </Stack>
            </form>
        </Layout>
    );
}

export default ReportForm;