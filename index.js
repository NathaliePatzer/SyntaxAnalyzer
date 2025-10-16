$(document).ready(function () {

    $("#button-grammar").click(function () {
        $.magnificPopup.open({
            items: {
                src: '#grammar-popup',
                type: 'inline'
            },
            
        });
    });

    $(".column_button_click").click(function () {
        alert(this.textContent)
    });

});