window.Cart = {

    API_URL: "http://localhost:8088",

    getCart: function () {

        const userId = 1;
        $.ajax({
            url: Cart.API_URL + "/carts/" + userId
        }).done(function (response) {
            Cart.displayProductsInCart(response.products);

        })


    },


    getProductRow: function (product) {
        return `

    <tr class="cart-products">
        <td class="product-name">
        <div class="product-thumbnail">
        <img src=${product.imageUrl} style="height: 300px" alt="">
        </div>
        <div class="product-detail">
        <h3 style="font-size: 2rem;color: black" class="product-title"><strong>${product.name}</strong></h3>
        <h4 style="font-size: 1rem;color: black">${product.description}</h4>

        </div>
        </td>
        <td data-product_price="${product.price}" class="product-price1"><span>$</span><span class="product-total-price">${product.price}</span></td>
        <td class="product-qty1">

        <select id="cars" name="cars">
        <option value="volvo">1</option>
<!--        <option value="saab">2</option>-->
<!--        <option value="fiat">3</option>-->
<!--        <option value="audi">4</option>-->
        </select>

        </td>
        <td class="product-total"><a href="#"><i class="fas fa-trash fa-3x delete-product"  data-product_id="${product.id}"></i></a></td>
        <td class="action"></td>

        </tr>    
    
    `
    },


    displayProductsInCart: function (products) {
        let cartBody = '';

        products.forEach(product => cartBody += Cart.getProductRow(product));

        $('.item-body').html(cartBody);

        Cart.calculateTotal();
        Cart.displayCartItemCount(products.length);

    },


    displayCartItemCount: function (itemCountInCart) {
        $('#item-count').html(itemCountInCart);
    },

    calculateTotal: function () {
        let total = 0;
        let $product = $('.product-total-price').each(function () {
            total += parseFloat($(this).text());
        });
        if (total === 0) {
            $('#shipment').html(0);
        }
        $('#subtotal-id').html(total);
        $('#num').html(total + parseFloat($('#shipment').text()));
    },

    removeProductsFromCart: function (productId) {
        const userId = 1


        $.ajax({
            url: Cart.API_URL + "/carts/" + userId + "/" + productId,
            method: "DELETE"
        }).done(function () {
            Cart.getCart();
        })

    },

    // updateCartTotal:function (){
    //    let cartItemContainer = $('.item-body').delegate('.cart-products');
    //     for (let i=0;i<cartItemContainer.length;i++){
    //         let cartRow=cartItemContainer[i];
    //         let priceElement=$('.item-body').delegate('.product-price1');
    //         let quantityElement=$('.item-body').delegate('.product-qty1');
    //
    //         let price=priceElement.innerText;
    //         console.log(priceElement,quantityElement);
    //     }
    //
    // },


    bindEvents: function () {

        $('.page').delegate('.delete-product', 'click', function (event) {
            event.preventDefault();
            let productId = $(this).data('product_id');
            Cart.removeProductsFromCart(productId);
            Cart.getCart();

        })
    }
}

Cart.getCart();


Cart.bindEvents();