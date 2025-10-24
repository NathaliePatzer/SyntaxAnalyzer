$(document).ready(function () {

    //popup da gramática
    $("#button-grammar").click(function () {
        $.magnificPopup.open({
            items: {
                src: '#grammar-popup',
                type: 'inline'
            },
        });

        //setar estado inicial da gramatica
        $(".row_S").attr('id', "greenLine");
        $("#sentence-input").val("S");
    });

    //conteudo clicado
    $(".column_button_click").click(function () {
        var input = $("#sentence-input").val();
        var token = this.textContent;

        //encontrar linha do token 
        var father = $(this).parent();
        var fatherClass = father.attr('class');

        //limpar a palavra row da string
        let line = fatherClass.at(-1);

        //permite substituir o não terminal mais a esquerda se ele estiver no input
        let inputMatch = input.match(/[A-Z]/);
        if (inputMatch !== null && line === inputMatch[0]) {

            if (token === 'ε') {
                var output = input.replace(line, '');
            } else {
                var output = input.replace(line, token);
            }
            father.removeAttr("id"); //descolore a linha de verde

            $("#sentence-input").val(output);

            let result = output.match(/[A-Z]/);
            let firstUppercase = null;

            //colore a linha de verde
            if (result !== null) {
                firstUppercase = result[0];
                $(".row_" + firstUppercase).attr('id', "greenLine");
            }
        }
    });

});