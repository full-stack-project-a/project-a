import React from 'react';
import { Box, Button, Typography, TextField, Grid, Select, MenuItem,  useMediaQuery, useTheme, Paper, IconButton } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
const Formtable = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <div>
            
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
                            <TextField required id="productName" name="productName"  fullWidth />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <span style={{display: 'flex', alignItems: 'center'}}> Product Description </span>
                            <TextField required id="productDescription" name="productDescription" 
                                multiline
                                rows={4}
                                fullWidth 
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* category */}
                            <span style={{display: 'flex', alignItems: 'center'}}> Category </span>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                            <TextField required id="productPrice" name="productPrice" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* in store quantity */}
                            <span style={{display: 'flex', alignItems: 'center'}}> In Store Quantity </span>
                            <TextField required id="productQuantity" name="productQuantity"  fullWidth />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            {/* image url */}
                            <span style={{display: 'flex', alignItems: 'center'}}> Add Image Link </span>
                            <TextField required id="productImage" name="productImage" defaultValue="http://" fullWidth
                                InputProps={{
                                    endAdornment:(
                                        <Button variant="contained" color="primary" size="large" style={{
                                            backgroundColor: '#5048E5',
                                        }}>
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
                                
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" />
                                <InsertPhotoIcon fontSize="large" />
                            </IconButton>
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
                            <Button variant="contained" color="primary" size="large" style={{
                                backgroundColor: '#5048E5',
                            }}
                            >
                                Add Product
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    );
}
export default Formtable;