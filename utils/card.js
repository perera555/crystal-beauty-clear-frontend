
export function loadCart() {
    let cartString = localStorage.getItem("cart")//"[item1,item]2 like this"

    if (cartString == null) {
        localStorage.setItem("cart", "[]")
        cartString = "[]"

    }
    const cart = JSON.parse[cartString]
    return cart
}

export function addTOCart(product, quantity) {

    let cart = loadCart()

    const existingItemIndex = cart.findIndex(
        (item) => {
            return item.producID == Product.productID


        }
    )
    if(existingItemIndex == -1){
        //items is not in the cart
        if(quantity<1){
            console.log("Quantity must be atleaset 1")
            return
        }
        const cartItem ={
            productID : product.producID,
              name : product.name,
              price :   product.price,
             labelledPrice :   product.labelledPrice ,
             quantity :quantity,
             image:product.images[0]


        }
        cart.push(cartItem)

    }else{
    //items already  in  cart

    const existingItem =cart[existingItemIndex]
    const newQuantity =existingItem.quantity + quantity
    if(newQuantity<1){
        cart = cart.filter(
            (item)=>{
                return item.productID != product.producID
            }
        )

    }else{
       cart[existingItem].quantity = newQuantity
    }

    }
    localStorage.setItem("cart",JSON.stringify(cart))
}