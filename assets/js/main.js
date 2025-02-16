const shop = document.getElementById('shop');

    let basket = JSON.parse(localStorage.getItem('data')) || [];

    const fetchData = async () => {
        try {
            const response = await fetch('assets/js/data.json'); 
            const shopItemsData = await response.json(); 

            generateShop(shopItemsData);
        } catch (error) {
            console.error("Error loading JSON data:", error);
        }
    };

    let generateShop = (shopItemsData) => {
        shop.innerHTML = shopItemsData.map((x) => {
            let { id, name, price, desc, img } = x;

            return `
            <div class='col-lg-3 col-md-6 col-sm-12'>
                <div class='shop_item' id='product-id-${id}'>
                    <img src='${img}' alt='' />
                    <div class='product_info'>
                        <h5>${name}</h5>
                        <p class='price'><span>Money $:</span>${price}</p>
                        
                        <button onclick="add_to_cart('${id}','${name}','${price}','${img}') ">Add to Cart</button>
                    </div>
                </div>
             </div>
            `;
        }).join(""); 
    };

    fetchData(); 



// add_to_cart

let add_to_cart = (id, name, price, img) => {
    let existingItem = basket.find((x) => x.id === id);

    if (existingItem) {
        existingItem.item += 1; 
    } else {
        basket.push({
            id: id,
            item: 1,
            name: name,
            price: price,
            img: img
        });
    }
    cart_page();
    calculate();
    localStorage.setItem('data', JSON.stringify(basket));
    generate_Cart_item(); 
    Total_amount();
    
    // window.location.reload();
    
};

let calculate = () => {
    let cart_icon =document.getElementById('cart_amount');
    let cart_amount=basket.length

    cart_icon.innerHTML =cart_amount

}  

// calculate function call
calculate()




    
// Cart js
let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');


let calculate_cart = () => {
    let cartIcon = document.getElementById('cart_amount');
    cartIcon.innerHTML = basket.reduce((total, item) => total + item.item, 0);
};


let generate_Cart_item = () => {
    if (basket.length !== 0) {
        shoppingCart.innerHTML = basket.map((x) => {
            let { id, name, price, item, img } = x;
            return `
                <div class='cart_item' id="cart_item_${id}">
                    <div class='cart_item_img'>
                        <img width='100px' src='${img}' alt='' />
                    </div>
                    <div class='cart_item_content'>
                        <h4>${name}</h4>
                        <p>Price: $${price}</p>
                        <div class='add_item'>
                            <button class='minimus' onclick="item_remove_carts(${id})">-</button>
                            <div class="cart cart_count">
                                <div id="cart_amount_id_${id}">${item}</div>
                            </div>
                            <span><button class='plus' onclick="add_to_carts(${id}, ${price})">+</button></span>
                        </div>
                        <button class='remove_btn' onclick="remove_from_cart(${id})">Remove</button>
                    </div>
                </div>
            `;
        })
    } else {
        shoppingCart.innerHTML = `<p>Your cart is empty.</p>`;
    }
};

// add_to_carts Function
let add_to_carts = (id, price) => {
    let selectedItem = basket.find((x) => x.id == id);
    if (selectedItem) {
        selectedItem.item += 1;
    } else {
        basket.push({ id: id, item: 1, price: parseFloat(price) });
    }
    localStorage.setItem('data', JSON.stringify(basket));
    generate_Cart_item();
    calculate_cart();
    Total_amount();
};

// item_remove_carts Function
let item_remove_carts = (id) => {
    let selectedItem = basket.find((x) => x.id == id);
    if (selectedItem && selectedItem.item > 0) {
        selectedItem.item -= 1;
        if (selectedItem.item === 0) {
            basket = basket.filter((x) => x.id != id);
        }
    }
    localStorage.setItem('data', JSON.stringify(basket));
    generate_Cart_item();
    calculate_cart();
    Total_amount();
};

// remove_from_cart Function
let remove_from_cart = (id) => {
    basket = basket.filter((x) => x.id != id);
    localStorage.setItem('data', JSON.stringify(basket));
    generate_Cart_item();
    calculate_cart();
    Total_amount();
};

// Total_amount Function
let Total_amount = () => {
    let total_amount = basket.reduce((sum, item) => sum + item.item * item.price, 0);
    label.innerHTML = `
        <div class='checkout_area'>
            <h2>Total Price: <span id='amount-id'>  $${total_amount.toFixed(2)}</span></h2>
        </div>
    `;
};

// Initial calls
generate_Cart_item();
calculate_cart();
Total_amount();



// Cart Button js


function cart_page(){
    let cart_page =document.getElementById('cart_page')
    cart_page.classList.add("active_cart")
    
}

// Cart Button close tag

function cart_close(){
    let cart_page =document.getElementById('cart_page')
    cart_page.classList.remove("active_cart")
}