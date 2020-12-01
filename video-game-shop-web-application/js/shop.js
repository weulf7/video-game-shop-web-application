window.Shop = {


    API_URL: "http://localhost:8088",


    getProducts: function () {

        $.ajax({

            url: Shop.API_URL + "/products",
            method: "GET"
        }).done(function (response) {
            Shop.displayProducts(response.content);
        });
    },

    addProductToCart: function (productId) {

        const userId = 1;

        const requestBody = {
            userId: userId,
            productId: productId
        }

        $.ajax({
            url: Shop.API_URL +"/carts",
            contentType: "application/json",
            method: "PUT",
            data: JSON.stringify(requestBody)
        }).done(function () {
            window.location.replace("cart.html");
        })
    },

    getProductHtml: function (product) {

        return `
           
            
            
             <div style="text-align: center !important;color: black" class="col mb-4">
                            <div class="card h-100">
                                <img style="height: 400px" src="${product.imageUrl}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 style="font-size: 1.3rem;text-align: center" class="card-title"><strong>${product.name}</strong></h5>
                                    <p >${product.description}</p>
                                    <div  style="margin-bottom: 2rem" class="product-price">
                                        <ins class="price2"><strong>$${product.price}</strong></ins>
                                                                         
                                  </div>
                                  <div style="position: relative;bottom: 1px">
                                   <button id="button" data-product_id="${product.id}" type="button" class="btn btn-secondary btn-lg">Add to cart</button>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
            
            
        `
    },



    displayProducts:function (products){
        let productsHtml='';

        products.forEach(product =>productsHtml += Shop.getProductHtml(product));

        $('#product-list').html(productsHtml);
    },

    bindEvents:function (){
    $('#product-list').delegate('#button','click',function (event){
        event.preventDefault();
        let productId = $(this).data('product_id');

        Shop.addProductToCart(productId);


    })

    }



}
Shop.getProducts();
Shop.bindEvents();