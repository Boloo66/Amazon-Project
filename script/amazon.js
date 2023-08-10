 /* products = [{
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating:{
        stars: 4.5,
        count: 87
    },
    priceCent: 1090
 },
{
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
        stars: 4,
        count: 127
    },
    priceCent: 2095
},
{
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating:{
        stars: 4.5,
        count: 50
    },
    priceCent: 799
},
{
    image: 'images/products/kitchen-paper-towels-30-pack.jpg',
    name: 'kitchen paper towels',
    rating:{
        stars: 4.5,
        count: 200
    },
    priceCent: 12000
}]*/

let displayHTML = '';
products.forEach((product) => {
    displayHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}" />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-add-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
});
document.querySelector('.js-product-grid').innerHTML = displayHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    
    let {productId}  = button.dataset;
    let matchingItem;
    let clicked = false
    let timeoutId;
    
    function addClick(){
        let cartValue;
        cart.forEach((item) => {

        cartValue = document.querySelector(`.js-select-${productId}`).value || 1;
        console.log(cartValue);

        if(productId === item.id){
                matchingItem = item;
            }
        })

        if(matchingItem){
            matchingItem.quantity += Number(cartValue) || 1;
        }

        else{
            cart.push({id: productId,
            quantity: Number(cartValue) || 1});
        }
        
        let cartQuantity = 0;
        // get cart quantity
          cart.forEach((item) => {
            cartQuantity += item.quantity;
        })
        //console.log(button.dataset.productName);
        //console.log(cart);
        document.querySelector('.cart-quantity').innerHTML = cartQuantity;
        console.log(cart);
      }
    button.addEventListener('click', () => {
      
      if (!clicked){
        addClick();
        clearTimeout(timeoutId);
        document.querySelector(`.js-add-${productId}`).classList.add('opacity-1');
        timeoutId = setTimeout(() => {
          document.querySelector(`.js-add-${productId}`).classList.remove('opacity-1');
        }, 2000);
        clicked = true;
      }
      //console.log(cartValue);
      else{
        addClick();
        clearTimeout(timeoutId);
        document.querySelector(`.js-add-${productId}`).classList.add('opacity-1');
        timeoutId = setTimeout(() => {
          document.querySelector(`.js-add-${productId}`).classList.remove('opacity-1');
        }, 2000);
        
        clicked = false;
      }
      
        
    })
       
});