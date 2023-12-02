export const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const calculateTax = (subtotal, taxRate) => {
    return subtotal * taxRate;
};

export const applyDiscount = (code, validCode) => {
    if (code === validCode) {
        return 20;
    }
    return 0;
};

export const calculateCartItemsNumber = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
}