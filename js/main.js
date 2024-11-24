import { products } from "./product.js";    
console.log(products);

const cartList = document.querySelector(".cart-list");
const cartHeader = document.querySelector(".cart-fill .cart-header");
const cartFooter = document.querySelector(".cart-footer");
const cartEmpty = document.querySelector(".cart-empty");
const cartFill = document.querySelector(".cart-fill");

let cart = [];

let productList = document.querySelector(".product-list .row");

productList.innerHTML=null;
products.forEach(product=>{
    let newProduct=document.createElement('div');
    newProduct.classList.add('item','col-lg-4','col-md-6','mb-4');
    newProduct.innerHTML=`
                            <div class="product-body">
                                <div class="product-img">
                                    <img src="${product.image.desktop}" class="img-fluid" alt="">
                                </div>
                                 <button class="add-btn" data-product-name="${product.name}"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                                    Add to Cart</button>
                           </div>
                           
                           <div class="product-discription d-flex flex-column gap-1">
                            <div class="category">${product.category}</div>
                            <div class="name">${product.name}</div>
                            <div class="price">$${product.price}</div>
                           </div>
                        `;
    productList.appendChild(newProduct);
});


const removeItem = (index)=>{
   let removedItem = cart[index];
   cart.splice(index,1);
   resetBtn(removedItem.name);
   updateCart();
}

const resetBtn = (removedItemName)=>{
    addBtns.forEach((button)=>{
        let buttonProductName=button.getAttribute('data-product-name');
        if(removedItemName===buttonProductName){
            button.closest('.item').querySelector('.product-img').classList.remove('active');
            button.classList.remove('active');
            button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                <g fill="#C73B0F" clip-path="url(#a)">
                    <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                    <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                </g>
                <defs>
                    <clipPath id="a">
                        <path fill="#fff" d="M.333 0h20v20h-20z" />
                    </clipPath>
                </defs>
            </svg>
            Add to Cart`;
        }
    });
};

const updateCart = () => {

    if (cart.length > 0) {
        cartEmpty.classList.add('d-none');
        cartFill.classList.remove('d-none')
        cartHeader.textContent = `Your Cart (${cart.length})`;
      
        cartList.innerHTML = '';
        
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

          
            const totalPrice = (item.price * item.quantity).toFixed(2);

            cartItem.innerHTML = `
                <div class="cart-item-quantity">
                    <div class="item-name">${item.name}</div>
                    <div class="item-quantity">
                        <span>${item.quantity}x</span>
                        <span>@$${item.price.toFixed(2)}</span>
                        <span>$${totalPrice}</span>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                        <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                    </svg>
                </button>
            `;

            cartList.appendChild(cartItem);
        });
        const totalOrder = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
        document.querySelector(".total-order h3").textContent = `$${totalOrder}`;
        cartFooter.style.display = 'block';
        cartEmpty.style.display = 'none';
    } else {
        cartEmpty.classList.remove('d-none');
        cartEmpty.style.display='block';
        cartFill.classList.add('d-none')
    }

    let removeBtns=document.querySelectorAll('.remove-btn');
    removeBtns.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            let index = parseInt(btn.dataset.index,10);
            removeItem(index);
        });
    });
};


let addBtns=document.querySelectorAll(".add-btn");

    addBtns.forEach((button,index) => {
    button.addEventListener("click", () => {

        button.closest('.item').querySelector('.product-img').classList.add('active');
        
        const product=products[index];
        const existingProduct=cart.find(item=>item.name===product.name);
        if(!existingProduct){
            cart.push({...product,quantity:1});
            updateCart();
        }


        if (!button.classList.contains("active")) {
            button.classList.add("active");
            button.innerHTML = `
                <div class="quantity-controls">
                    <span class="decrement"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg></span>
                    <span class="quantity">1</span>
                    <span class="increment"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg></span>
                </div>`;
            
           
            const quantity = button.querySelector(".quantity");
            const increment = button.querySelector(".increment");
            const decrement = button.querySelector(".decrement");

            increment.addEventListener("click", () => {
                quantity.textContent = parseInt(quantity.textContent) + 1;

                let productName=button.closest('.item').querySelector('.name').textContent;
                let itemName=cart.find(item=>item.name==productName);
                if(itemName){
                    itemName.quantity=parseInt(quantity.textContent);
                    updateCart();
                }
            });

            decrement.addEventListener("click", () => {
                if (parseInt(quantity.textContent) > 1) {
                    quantity.textContent = parseInt(quantity.textContent) - 1;
                    let productName=button.closest('.item').querySelector('.name').textContent;
                    let itemName=cart.find(item=>item.name==productName);
                if(itemName){
                    itemName.quantity=parseInt(quantity.textContent);
                    updateCart();
                }
                } else {
                    button.classList.remove("active");
                    button.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                            <g fill="#C73B0F" clip-path="url(#a)">
                                <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                                <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                            </g>
                            <defs>
                                <clipPath id="a">
                                    <path fill="#fff" d="M.333 0h20v20h-20z" />
                                </clipPath>
                            </defs>
                        </svg>
                        Add to Cart`;
                }
            });
        }
    });
});

let confirmBtn = document.querySelector('.confirm-btn');

confirmBtn.addEventListener('click',()=>{
    let confirmCart=document.querySelector('.confirm-cart');
    confirmCart.classList.remove('d-none');
    let confirmContent= confirmCart.querySelector('.confirm-content');
    confirmContent.innerHTML='';
    
    cart.forEach(item=>{
        let cartItemQuantity = document.createElement('div');
        cartItemQuantity.classList.add('cart-item-quantity');
        cartItemQuantity.innerHTML=`
            <div class="item-name">${item.name}</div>
                <div class="item-quantity">
                    <span>${item.quantity}x</span>
                    <span>@$${item.price.toFixed(2)}</span>
                    <span>$${(item.quantity * item.price).toFixed(2)}</span>   
                </div>
        `;
        confirmContent.appendChild(cartItemQuantity);
    });

    let completeOrder = confirmCart.querySelector('.complete-order h3');
    let completePrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);
    completeOrder.textContent = `$${completePrice.toFixed(2)}`;
});


document.querySelector('.new-order-btn').addEventListener('click', () => {
    cart = [];
    updateCart(); 

    addBtns.forEach((button) => {
        button.classList.remove('active');
        button.closest('.item').querySelector('.product-img').classList.remove('active');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                <g fill="#C73B0F" clip-path="url(#a)">
                    <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                    <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                </g>
                <defs>
                    <clipPath id="a">
                        <path fill="#fff" d="M.333 0h20v20h-20z" />
                    </clipPath>
                </defs>
            </svg>
            Add to Cart`;
    });

    cartEmpty.classList.remove('d-none');
    cartEmpty.style.display='block' ;
    cartFill.classList.add('d-none');

    let confirmCart = document.querySelector('.confirm-cart');
    confirmCart.classList.add('d-none');

    let confirmContent = confirmCart.querySelector('.confirm-content');
    confirmContent.innerHTML = '';
});
