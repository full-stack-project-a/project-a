import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Grid, Paper } from '@mui/material';
import ProductCard from './CardStyle';
const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}

const ProductPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <div>
            <Box style={{ margin: '0 auto', maxWidth: 800 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h4' align={isMobile? 'center': 'left'}>
                            Product Page
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h4' align={isMobile? 'center': 'left'}>
                            Product Page
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box style={{ margin: '0 auto', maxWidth: 1600 }}>
                <Paper elevation={24} style={{ margin: '0 auto', maxWidth: 1000 }}>
                <Grid container spacing={5}>
                    {range(1, 10).map((product) => (
                        <Grid item xs={12} md={isMobile ? 12 : 2.4} key={product}>
                            <ProductCard />
                        </Grid>
                    ))}
                </Grid>
                </Paper>
            </Box>
        </div>
    )
}
export default ProductPage;