import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                }}
            >
                <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 1, color: '#5048E5' }} />
                <Typography component="h1" variant="h5" gutterBottom>
                    Oops, something went wrong!
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        bgcolor: '#5048E5',
                        '&:hover': {
                            bgcolor: '#5048E5',
                        },
                    }}
                    onClick={() => navigate('/products')}
                >
                    Go Home
                </Button>
            </Box>
        </Container>
    );
};

export default ErrorPage;
