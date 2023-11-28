import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Grid } from '@mui/material';
import ProductCard from './CardStyle';


const ProductPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <div>
            <Box style={{ margin: '0 auto', maxWidth: 800 }}>
                <Typography variant='h4' align={isMobile? 'center': 'left'}>
                    Product Page
                </Typography>
            </Box>
            <Box style={{ margin: '0 auto', maxWidth: 1600 }}>
                <Grid container spacing={5}>
                    {[1, 2, 3, 4, 5, 6, 7].map((product) => (
                        <Grid item xs={12} md={isMobile ? 12 : 2.4} key={product}>
                            <ProductCard />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}
export default ProductPage;