import { Button, Card, CardActions, CardContent, CardMedia, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import React from 'react';
const theme = createTheme({
    palette: {
        primary: {
            main: '#5048E5',
        },
    },
});
const ProductCard = () => {
    return (
        <ThemeProvider theme={theme}>
        <Card >
            <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://source.unsplash.com/random"
            />
            <CardContent>
            <Typography variant="body2" color="text.secondary">
            iPhone 13 Pro Max
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
            $1000
            </Typography>
            <CardActions>
                {/* <Button variant="contained" color="primary" size="large" style={{
                    backgroundColor: '#5048E5',
                }}>
                    Add
                </Button>
                <Button variant="outlined" color="primary" size="large" style={{
                }}>
                    Edit
                </Button> */}
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" size="large" style={{
                            backgroundColor: '#5048E5',
                        }} fullWidth>
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" size="large" style={{
                        }} fullWidth>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
            </CardContent>            
        </Card>
        </ThemeProvider>
    )
}
export default ProductCard;