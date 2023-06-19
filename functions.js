
// ADD TO CART

let inc_val = 0;
function cart() {
    const addToCart = document.querySelector("#cart-number"); // Mobile
    const addCart = document.getElementById("cart-num");     // Desktop
    inc_val += 1;
    addToCart.innerHTML = inc_val;// Desktop
    addCart.innerHTML = inc_val;                  //Mobile

}



















