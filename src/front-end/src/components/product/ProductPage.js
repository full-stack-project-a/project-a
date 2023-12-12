import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Grid, Paper, Button, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Pagination, PaginationItem, createTheme, ThemeProvider } from '@mui/material';
import ProductCard from './CardStyle';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}
const names = [
    'Last added',
    'Price: Low to High',
    'Price: High to Low',
  ];
const newTheme = createTheme({
    palette: {
        primary: {
            main: '#5048E5',
        },
    },
});
const ProductPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [personName, setPersonName] = useState([]);
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };
  
    return (
        <div>
            <Box style={{ margin: '0 auto', maxWidth: '80%', marginTop:'20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h4' align={isMobile? 'center': 'left'}>
                            Product Page
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} align={isMobile? 'center': 'right'}>
                        <Box>
                            <Select
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                style={{ marginRight: '20px' , width: '180px'}}
                                defaultValue={names[0]}
                                >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                            <ThemeProvider theme={newTheme}>
                            <Button variant="contained" color="primary">
                                Add Product
                            </Button>
                            </ThemeProvider>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box style={{ margin: '0 auto', maxWidth: '100%', marginTop:'20px' }}>
                <Paper elevation={24} style={{ margin: '0 auto', maxWidth: '80%', padding: '20px' }}>
                <Grid container spacing={5} style={{ margin: '0 auto', maxWidth: '90%' }} >
                    {range(1, 10).map((product) => (
                        <Grid item xs={12} md={isMobile ? 12 : 2.4} key={product}>
                            <Box>
                                <ProductCard
                                    product={{
                                        name: "iPhone 13 Pro Max",
                                        price: "1000",
                                        imageUrl: 'https://source.unsplash.com/random'
                                    }} 
                                />
                            </Box>    
                        </Grid>
                    ))}
                </Grid>
                </Paper>
            </Box>
            <ThemeProvider theme={newTheme}>
            <Box display='flex' style={{ margin: '0 auto', maxWidth: '80%', marginTop: '20px' }}
                justifyContent={isMobile ? 'center' : 'flex-end'}
            >
                {/* Pages select */}
                <Pagination count={5} shape="rounded" color='primary'
                      renderItem={(item) => (
                        <PaginationItem
                          slots={{ previous: KeyboardDoubleArrowLeftIcon, next: KeyboardDoubleArrowRightIcon }}
                          {...item}
                        />
                    )}
                />
            </Box>
            </ThemeProvider>
        </div>
    )
}
export default ProductPage;