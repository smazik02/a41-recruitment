import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { Cloud } from '@mui/icons-material';

function GlobalToolbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large" edge="start" color="inherit"
                    aria-label="Home" component={RouterLink} to="/reports">
                    <Cloud />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, margin: 1 }}>
                    Weather Reports
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default GlobalToolbar;