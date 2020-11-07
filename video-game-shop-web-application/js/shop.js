window.Shop = {


    API_URL: "http://localhost:8087",


    getProducts: function () {

        $.ajax({

            url: Shop.API_URL + "/products",
            method: "GET"
        }).done(function (response) {
            Shop.displayProducts(response.content);
        });
    },

    addProductToCart: function (productId) {

        const userId = 5;

        const requestBody = {
            userId: userId,
            productId: productId
        }

        $.ajax({
            url: Shop.API_URL,
            contentType: "application/json,",
            method: "PUT",
            data: JSON.stringify(requestBody)
        }).done(function () {
            window.location("cart.html");
        })
    },

    getProductHtml: function (product) {

        return `
            <div class="product">
            <div class="inner-product">
            <div class="figure-image">
            <a href="single.html"><img src="dummy/game-1.jpg" alt="Game 1"></a>
            </div>
            <h3 class="product-title"><a href="#">${product.name}</a></h3>
            <a href="#" class="button" data-product_id="${product.id}">Add to cart</a>
            <a href="#" class="button muted">Read Details</a>
            <div class="product-price">
            <ins>$${product.price}</ins>
            </div>
            </div>
            </div> 
        `
    },

    displayProducts:function (products){
        let productsHtml='';

        products.forEach(product =>productsHtml += Shop.getProductHtml(product));

        $('.product-list .row').html(productsHtml);
    }


}
Shop.getProducts();