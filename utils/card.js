export function loadCart() {
    let cartString = localStorage.getItem("cart");

    if (cartString === null) {
        localStorage.setItem("cart", "[]");
        cartString = "[]";
    }

    return JSON.parse(cartString);
}

export function addTOCart(product, quantity) {
    let cart = loadCart();

    const existingItemIndex = cart.findIndex(
        (item) => item.productID === product.productID
    );

    if (existingItemIndex === -1) {
        if (quantity < 1) return;

        const cartItem = {
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            quantity: quantity,
            image: product.images[0]
        };

        cart.push(cartItem);
    } else {
        const existingItem = cart[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity < 1) {
            cart = cart.filter(
                (item) => item.productID !== product.productID
            );
        } else {
            cart[existingItemIndex].quantity = newQuantity;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export function getTotal() {
    const cart = loadCart();
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
    });

    return total;
}
