import { AppBar, Box, Container, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { Cloud } from '@mui/icons-material';
import * as React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="Home" component={RouterLink}
                                    to="/reports">
                            <Cloud />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1, margin: 1 }}>
                            Weather Reports
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container sx={{ padding: 2 }}>
                    {children}
                </Container>
            </Box>
        </React.Fragment>
    );
}

export default Layout;