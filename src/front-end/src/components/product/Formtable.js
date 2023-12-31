import React, { useEffect, useState } from 'react';
import { useAppContext } from "../../context/AppContext";
import axios from 'axios';
import { Box, Button, Typography, TextField, Grid, Select, MenuItem,  useMediaQuery, useTheme, Paper, IconButton } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useParams, useNavigate } from 'react-router-dom';
const Formtable = ({isUpdateMode = false}) => {
    const { productID } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    const [isUrlValid, setIsUrlValid] = useState(true);
    const [isImgUploaded, setIsImgUploaded] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'All',
        price: '',
        inStockQuantity: '',
        imageUrl: ''
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleUrlChange = (event) => {
        setIsUrlValid(urlRegex.test(event.target.value));
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const { auth } = useAppContext();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        if(isUpdateMode){
            try{
                const response = await axios.put(`/api/v1/products/${productID}`, formData, {
                    headers: {
                       Authorization: `Bearer ${auth.token}` // Include the JWT token here
                    }});
                console.log(response.data);
                navigate('/success');
            }
            catch(error){
                console.error('There was an error!', error);
            }
        }
        else{
            try {
                const response = await axios.post('/api/v1/products', formData, {
                    headers: {
                       Authorization: `Bearer ${auth.token}` // Include the JWT token here
                    }});
                console.log(response.data);
                navigate('/success');
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
    };

    useEffect(() => {
        if(isUpdateMode && productID) {
            axios.get(`/api/v1/products/${productID}`)
            .then((res) => {
                console.log(res.data);
                setFormData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    , [isUpdateMode, productID]);
    return (
        <form onSubmit={handleSubmit}>
            <Box style={{ margin: '0 auto', maxWidth: '80%', marginTop:'20px', marginBottom: '20px' }}>
                <Typography variant='h4' align={isMobile? 'center': 'left'}>
                    {isUpdateMode? `Update Product ${productID}`: 'Add Product'}
                </Typography>
            </Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // height: '100%',
              }}
            >
                <Paper elevation={3} 
                style={{ padding: '16px', 
                         maxWidth: '80%',
                         margin: '0 auto',
                         display: 'center',
                         justifyContent: 'center',
                         alignItems: 'center',
                         width: '80%',
                         marginBottom: '40px',
                         marginTop: '20px',
                        }}
                >
                    <Grid container spacing={3} style={{
                        display: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Grid item xs={12} md={12}>
                            <span style={{display: 'flex', alignItems: 'center'}}> Product Name </span>
                            <TextField required id="productName" name="name" 
                            value={formData.name} 
                            onChange={handleInputChange}
                            fullWidth 
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <span style={{display: 'flex', alignItems: 'center'}}> Product Description </span>
                            <TextField required id="productDescription" name="description" 
                                multiline
                                value={formData.description}
                                rows={4}
                                fullWidth
                                onChange={handleInputChange} 
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* category */}
                            <span style={{display: 'flex', alignItems: 'center'}}> Category </span>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleInputChange}
                                value={formData.category}
                                fullWidth
                                defaultValue="All"
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Category 1">Category 1</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* price */}
                            <span style={{display: 'flex', alignItems: 'center'}}> Price </span>
                            <TextField required id="productPrice" name="price" 
                            value={formData.price}
                            onChange={handleInputChange}
                            type='number'
                            fullWidth />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* in store quantity */}
                            <span style={{display: 'flex', alignItems: 'center'}}> In Store Quantity </span>
                            <TextField required id="productQuantity" name="inStockQuantity" 
                            value={formData.inStockQuantity} 
                            onChange={handleInputChange}
                            fullWidth />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            {/* image url */}
                            <span style={{display: 'flex', alignItems: 'center'}}> Add Image Link </span>
                            <TextField required id="productImage" name="imageUrl" defaultValue="http://" fullWidth
                                error={!isUrlValid}
                                value={formData.imageUrl}
                                // helperText={!isUrlValid ? 'Please enter a valid URL' : ''}
                                onChange={handleUrlChange}
                                InputProps={{
                                    endAdornment:(
                                        <Button variant="contained" color="primary" size="large" style={{
                                            backgroundColor: '#5048E5',
                                        }}
                                        onClick={() => setIsImgUploaded(true)}
                                        >
                                            Upload
                                        </Button>
                                    ),
                                }}

                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    width: '80%',
                                    margin: 'auto',
                                    border: '5px dashed grey',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '30px',
                                    gap: '10px'
                                }}
                                > 
                            {isImgUploaded && <img src={formData.imageUrl} alt="Product" style={{ width: '80%', height: '80%' }} />}
                            { !isImgUploaded &&
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" />
                                <InsertPhotoIcon fontSize="large" />
                            </IconButton>
                            }
                            <Typography variant="body1">image preview!</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12}
                            style={{
                                display: 'flex',
                                justifyContent: isMobile? 'center': 'left',
                                alignItems: isMobile? 'center': 'left',
                            
                            }}
                        >
                            <Button type='submit' variant="contained" color="primary" size="large" style={{
                                backgroundColor: '#5048E5',
                            }}
                            >
                                {/* Add Product */}
                                {isUpdateMode? 'Update Product': 'Add Product'}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </form>
    );
}
export default Formtable;