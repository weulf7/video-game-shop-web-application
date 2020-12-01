window.Cart = {

    API_URL: "http://localhost:8087",

    getCart: function () {
        const userId = 5;
        $.ajax({

            url: Cart.API_URL + "/carts/" + userId

        }).done(function (response) {
            Cart.displayProductsInCart(response.products);
        })
    },

        getProductRow: function (product){
        return`
        <tr class="cart_item">
                                            <td class="product-remove">
                                                <a title="Remove this item" class="remove" data-id=${product.id} href="#">×</a> 
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/product-thumb-2.jpg"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="single-product.html">${product.name}</a> 
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">${product.price}</span> 
                                            </td>

                                            <td class="product-quantity">
                                                <div class="quantity buttons_added">
                                                    <input type="button" class="minus" value="-">
                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
                                                    <input type="button" class="plus" value="+">
                                                </div>
                                            </td>

                                            <td class="product-subtotal">
                                                <span class="amount">£${product.price}</span> 
                                            </td>
                                        </tr>
        `

        },

    removeProductFromCart:function (productId){
        $.ajax({
            url:Cart.API_URL +"/carts/"+productId,
            method:"DELETE"
        }).done(function (){
            Cart.getCart();
        })

    },

    displayProductsInCart:function (products){
        let cartTableBody="";

        products.forEach(product => cartTableBody+=Cart.getProductRow(product))

        $('table.shop_table.cart tbody').html(cartTableBody);
    },

    bindEvents:function (){
        $('.shop_table.cart').delegate('.remove','click',function (event){
            let id = $(this).data('id');

            Cart.removeProductFromCart(id);
        })
    }

}

Cart.getCart();

