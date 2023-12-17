import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Grid, Paper, Button, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Pagination, PaginationItem, createTheme, ThemeProvider } from '@mui/material';
import ProductCard from './CardStyle';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';

const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}

const newTheme = createTheme({
    palette: {
        primary: {
            main: '#5048E5',
        },
    },
});
const ProductPage = () => {
    const options = [
        'Last added',
        'Price: Low to High',
        'Price: High to Low',
    ];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [page, setPage] = useState(1);
    const [totalSize, setTotalSize] = useState(0);
    const [filter, setFilter] = useState("Last added");
    const [products, setProducts] = useState([]);
    const { searchQuery } = useAppContext();

    const urlBuilder = () => {
        let baseurl = `/api/v1/products?limit=10`;
        if (filter === 'Price: Low to High') {
            baseurl += '&price=asc';
        } else if (filter === 'Price: High to Low') {
            baseurl += '&price=desc';
        } else {
            baseurl += `&date=desc`;
        }
        baseurl += `&page=${page}`;
        return baseurl;
    }

    const fetchProducts = async () => {
        try {
            let url = urlBuilder();
            if (searchQuery) {
                // remove whitespace some dummy user will add
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }
            const res = await axios.get(url);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };
  
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        // get total size from enpoint /api/v1/products/count
        fetchProducts();
        axios.get(`api/v1/products/count`)
        .then((res) => {
            console.log(res.data);
            setTotalSize(Math.ceil(res.data / 10));
        })
        .catch((err) => {
            console.log(err);
        })
    }
    , [searchQuery, page, filter]);

  
    return (
        <div>
            <Box style={{ margin: '0 auto', maxWidth: '80%', marginTop:'20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <Typography variant='h4' align={isMobile? 'center': 'left'}>
                            Product Page
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} align={isMobile? 'center': 'right'}>
                        {/* <Box> */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                            <Select style={{ width:isMobile?'70%':'100%', marginRight: isMobile? '0':'20px'}}
                                    defaultValue={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        <ListItemText primary={option} />
                                    </MenuItem>
                                ))}
                            </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ThemeProvider theme={newTheme}>
                                <Button variant="contained" color="primary" style={{height:'100%'}}>
                                    Add Product
                                </Button>
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                    </Grid>
                </Grid>
            </Box>
            <Box style={{ margin: '0 auto', maxWidth: '100%', marginTop:'20px' }}>
                <Paper elevation={24} style={{ margin: '0 auto', maxWidth: '80%', padding: '20px' }}>
                <Grid container spacing={5} style={{ margin: '0 auto', maxWidth: '90%' }} >
                    {/* {range(1, 10).map((product) => (
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
                    ))} */}
                    {products.map((product) => (
                        <Grid item xs={12} md={isMobile ? 12 : 2.4} key={product._id}>
                            <Box>
                                <ProductCard
                                    product={{
                                        name: product.name,
                                        price: product.price,
                                        imageUrl: product.imageUrl
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
                <Pagination count={totalSize} shape="rounded" color='primary'
                      page={page}
                      onChange={handlePageChange}

                    //   onPageChange={handleChangePage}
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