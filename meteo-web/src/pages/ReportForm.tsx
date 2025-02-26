import { useParams } from 'react-router';
import Layout from '../Layout.tsx';
import { Box, Button, MenuItem, Select, Stack, TextField } from '@mui/material';

function ReportForm() {
    const params = useParams<{ reportId?: string }>();
    console.log(params.reportId);

    const units = [{ value: 'C', label: '°C' }, { value: 'F', label: '°F' }, { value: 'K', label: 'K' }];

    return (
        <Layout>
            <form>
                <Stack direction="column">
                    <Stack direction="row">
                        <TextField required label="Temperature" />
                        <Select label="Unit">
                            {units.map(unit => (
                                <MenuItem key={unit.value} value={unit.value}>
                                    {unit.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <Box>
                        <TextField required label="Date" />
                    </Box>
                    <Box>
                        <TextField required label="City" />
                    </Box>
                    <Box>
                        <Button variant="contained">Add</Button>
                    </Box>
                </Stack>
            </form>
        </Layout>
    );
}

export default ReportForm;