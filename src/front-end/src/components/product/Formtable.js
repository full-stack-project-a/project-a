import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormGroup, FormControl, InputLabel, Input, Button } from '@mui/material';
const Formtable = () => {
    return (
        <div>
            <h1>Create Product</h1>
            <FormGroup>
                <FormControl>
                    <InputLabel>Product Name</InputLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <InputLabel>Product Description</InputLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <InputLabel>Catory</InputLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <InputLabel>Price</InputLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <InputLabel>In Stock Quantity</InputLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <InputLabel>Add Image Link</InputLabel>
                    <Input />
                </FormControl>
                {/* Image Preview */}
                {/* Button for submit */}
                {/* 79 72 221 */}
                <Button variant='contained'>Submit</Button>
            </FormGroup>
        </div>
    );
}
export default Formtable;