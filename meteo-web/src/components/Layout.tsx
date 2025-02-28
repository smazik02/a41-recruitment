import { Box, Container, CssBaseline } from '@mui/material';
import GlobalToolbar from './GlobalToolbar.tsx';
import Providers from './Providers.tsx';
import { LayoutProps } from '../types.ts';


function Layout({ children }: LayoutProps) {
    return (
        <Providers>
            <CssBaseline />
            <Box>
                <GlobalToolbar />
                <Container sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
                    {children}
                </Container>
            </Box>
        </Providers>
    );
}

export default Layout;