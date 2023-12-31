import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import React from 'react';
import AddtoCart from './AddtoCartButton';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../../context/AppContext";
const theme = createTheme({
    palette: {
        primary: {
            main: '#5048E5',
        },
    },
});
const ProductCard = ({product}) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/products/${product._id}`);
        // console.log(`/products/${product._id}`);
    }
    const { auth } = useAppContext();
    const isVendor = auth.user && auth.user.role === 'vendor';
    return (
        <ThemeProvider theme={theme}>
        <Card>
            <CardMedia
            onClick={handleCardClick}
            component="img"
            alt="Product"
            height="140"
            image={ product.imageUrl ||"https://source.unsplash.com/random"}
            />
            <CardContent>
            <Typography variant="body2" color="text.secondary">
                {product.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
                ${product.price}
            </Typography>
            <CardActions>
                <Grid container spacing={3}>
                    <Grid item xs={isVendor? 6:12}>
                        <AddtoCart product={product} />
                    </Grid>
                    <Grid item xs={6}>
                        {
                            isVendor && <Button variant="outlined" color="primary"  style={{
                            }} fullWidth
                            onClick={() => navigate(`/products/update/${product._id}`)}
                            >
                                Edit
                            </Button>
                        }
                        {/* <Button variant="outlined" color="primary"  style={{
                        }} fullWidth
                        onClick={() => navigate(`/products/update/${product._id}`)}
                        >
                            Edit 
                        </Button> */}
                    </Grid>
                </Grid>
            </CardActions>
            </CardContent>            
        </Card>
        </ThemeProvider>
    )
}
export default ProductCard;