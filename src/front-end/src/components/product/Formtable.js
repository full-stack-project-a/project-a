import React from 'react';
import { Box, Button, Typography, TextField, Grid, Select, MenuItem, Avatar, Card } from '@mui/material';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

const Formtable = () => {
    
    return (
        <div>
            <Typography variant='h4' >
                Add Product
            </Typography>
            <Grid container spacing={3}>   
                <Grid item xs={12} sm={12}>
                    <span style={{display: 'flex', alignItems: 'center'}}> Product Name </span>
                    <TextField required id="productName" name="productName"  fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <span style={{display: 'flex', alignItems: 'center'}}> Product Description </span>
                    <TextField required id="productDescription" name="productDescription" 
                        multiline
                        rows={4}
                        fullWidth 
                    />    
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* category */}
                    <span style={{display: 'flex', alignItems: 'center'}}> Category </span>
                    <Select
                        native
                        required
                        fullWidth
                        id="productCategory"
                        name="productCategory"
                        label="Category"
                        // value={age}
                        // onChange={handleChange}
                        >
                            <MenuItem value={1}>Category 1</MenuItem>
                            <MenuItem value={2}>Category 2</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* price */}
                    <span style={{display: 'flex', alignItems: 'center'}}> Price </span>
                    <TextField required id="productPrice" name="productPrice" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* in store quantity */}
                    <span style={{display: 'flex', alignItems: 'center'}}> In Store Quantity </span>
                    <TextField required id="productQuantity" name="productQuantity"  fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* image url */}
                    <span style={{display: 'flex', alignItems: 'center'}}> Add Image Link </span>
                    <TextField required id="productImage" name="productImage" defaultValue="http://" fullWidth />
                </Grid>
                <Grid item xs={10} sm={10}>
                    {/* image preview */}
                    <span style={{display: 'flex', alignItems: 'center'}}> Image Preview </span>
                    <Card sx={{ maxWidth: 345 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1, p: 1, bgcolor: 'background.paper' }}>
                            <Avatar sx={{ width: 300, height: 300 }} alt="product image" src="http://www.sclance.com/pngs/preview-png/preview_png_1156683.png" />
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={3} sm={3}>
                    {/* submit button */}
                    <Button variant="contained" color="primary" size="large" style={{
                        backgroundColor: '#5048E5',
                    }} fullWidth>Submit</Button>
                </Grid>
            </Grid> 
        </div>
    );
}
export default Formtable;