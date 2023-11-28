import { Box, Typography, useMediaQuery, useTheme, Grid, Paper, Button, Alert } from '@mui/material';
import React from 'react';
import AddtoCart from './AddtoCartButton';

const DetailPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Paper elevation={3} style={{ padding: '16px' }}>

        <>{isMobile}</>
        <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <img src="https://scontent.fhio2-1.fna.fbcdn.net/v/t39.8562-6/363398184_1543133792884060_2364116561807035751_n.jpg?stp=dst-webp&_nc_cat=105&ccb=1-7&_nc_sid=430b19&_nc_ohc=pSvkULyJzccAX_flB8s&_nc_oc=AQksM24bk8oFOfT2pu1oeaKhs3ZE76iIWuYeQVzHYE0y_lXkc0Qd9jjeeqtE9UgY87w&_nc_ht=scontent.fhio2-1.fna&oh=00_AfAe3itNYUC3lJJB71vOBXAdTTiCEp3vqv28OsmOm7FTkQ&oe=656C05E8" alt="Product" style={{ width: '100%', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
            Category1
            </Typography>
            <Typography variant="h5" component="h2" style={{
                textAlign: 'left',
            }} >
                Meta Quest2 VR headset
            </Typography>
            <Box display="flex" algignItems="left">
                <Typography variant="h6" style={{ marginTop: '16px' }}>
                    $299
                </Typography>
                <Alert severity="error" icon={false}> Out of Stock </Alert>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
            Hundreds of hit games, one-of-a-kid experiences, live events, new ways to stay fit and  a growing community
            </Typography>
            <AddtoCart />
            <Button
                variant="contained"
                style={{ margin: '16px 8px 0 0' }}
            >
                Edit
            </Button>
        </Grid>
        </Grid>
        </Paper>
    )
}   
export default DetailPage;