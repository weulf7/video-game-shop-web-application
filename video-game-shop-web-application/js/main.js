window.Main = {


    API_URL: "http://localhost:8088",

    getCart: function () {

        const userId = 1;
        $.ajax({
            url: Main.API_URL + "/carts/" + userId
        }).done(function (response) {
            Main.displayCartItemCount(response.products.length);
        })
    },
    displayCartItemCount: function (itemCountInCart) {
        $('#item-count').html(itemCountInCart);
    },
}
Main.getCart();