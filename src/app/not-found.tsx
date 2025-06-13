import { Box, Container, Typography } from '@mui/material';
import React from 'react';

export default function NotFound() {
    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" textAlign="center">
                <Typography variant="h1" component="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" component="h2" color="textSecondary">
                    Page not found
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    The page you are looking for does not exist or has been moved.
                </Typography>
                {/* <Button component={Link} href="/" variant="contained" color="primary">
                        Go back to Home
                    </Button> */}
            </Box>
        </Container>
    );
}
