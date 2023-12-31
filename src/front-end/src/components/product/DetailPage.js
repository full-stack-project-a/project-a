import { Box, Typography, useMediaQuery, Grid, Paper, Button, Alert, createTheme, ThemeProvider, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddtoCart from './AddtoCartButton';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

const newTheme = createTheme({
    palette: {
        primary: {
            main: '#5048E5',
        },
    },
});


const DetailPage = () => {
    // const theme = useTheme();
    const { id } = useParams();
    const isMobile = useMediaQuery(newTheme.breakpoints.down('sm'));
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const { auth } = useAppContext();
    const isVendor = auth.user && auth.user.role === 'vendor';
    const [isLoading, setIsLoading] = useState(true);
    const PaperStyle = isMobile? 
    { padding: '16px', maxWidth: '100%', maxHeight: 'auto'}: 
    { padding: '16px', width: '90%', height: '60vh'};
    useEffect(() => {
        setTimeout(() => {setIsLoading(false)}, 500);
        axios.get(`/api/v1/products/${id}`)
        .then((res) => {
            console.log(res.data);
            setProduct(res.data);
        })
        .catch((err) => {
            navigate('/error');
        })
    }, [id]);
    if(isLoading){
        return(
            <Box display="flex" justifyContent="center" alignItems="center" height="100%"
                style={{ marginTop: '20vh' }}
            >
                <CircularProgress />
            </Box>
        );
    }
    return (
        <div>
            <ThemeProvider theme={newTheme}>
                <Box style={{ margin: '0 auto', maxWidth: '80%', marginTop:'20px', marginBottom: '20px' }}>
                    <Typography variant='h4' align={isMobile? 'center': 'left'}>
                        Product Detail
                    </Typography>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                    <Paper elevation={3} style={PaperStyle}>
                        <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    maxWidth: '100%', 
                                    height: '80%',
                                    overflow: 'hidden'
                                }}
                            >
                                <img src={product.imageUrl} alt="Product" style={{ width: '80%', height: '80%' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" color="text.secondary" align="left">
                            {/* Category1 */}
                            {product?.category}
                            </Typography>
                            <Typography variant="h4" component="h2" style={{
                                textAlign: 'left',
                            }} >
                                {/* Meta Quest2 VR headset */}
                                {product?.name}
                            </Typography>
                            <Box display="flex" algignItems="left">
                                <Typography variant="h4">
                                    {/* $299 */}
                                    ${product?.price}
                                </Typography>
                                {/* <Alert severity="error" icon={false} style={{marginLeft:'20px'}}> Out of Stock </Alert> */}
                                {product && product.inStockQuantity === 0 && (
                                    <Alert severity="error" style={{ marginLeft: '20px' }}>
                                        Out of Stock
                                    </Alert>
                                )}
                            </Box>
                            <Typography variant="body2" color="text.secondary" align='left'>
                            {/* Hundreds of hit games, one-of-a-kid experiences, live events, new ways to stay fit and  a growing community */}
                            {product?.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align='left'>
                            {/* Hundreds of hit games, one-of-a-kid experiences, live events, new ways to stay fit and  a growing community */}
                            {product?.description}
                            </Typography>
                            <Box
                             style={{
                                display: 'flex',
                                justifyContent: isMobile? 'center': 'left',
                                alignItems: 'center',
                            }}
                            >
                                <AddtoCart product={product}/>
                                {
                                    isVendor && <Button
                                    // variant="contained"
                                        variant='outlined'
                                        style={{
                                            // color: '#CCCCCC',
                                            // borderColor: '#CCCCCC',
                                            marginLeft: '20px',      
                                        }}
                                        onClick={() => navigate(`/products/update/${product._id}`)}
                                    >
                                        Edit
                                    </Button>
                                }
                                
                            </Box>
                            
                        </Grid>
                        </Grid>
                    </Paper>
                </Box>    
                
            </ThemeProvider>
        </div>
    )
}   
export default DetailPage;