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
        $("#button-select-grammar").addClass("disabled-button");
    });

    function grammarReady(text) {
        let result = text.match(/[A-Z]/);

        if (result === null) {
            $("#button-select-grammar").removeClass("disabled-button");
        }
    }

    //verificar caracteres digitados 
    $("#words").keydown(function (event) {
        var text = $("#words").val();
        console.log(event.key + ":" + event.keyCode)
        if ((event.keyCode < 65 || event.keyCode > 68) && event.keyCode != 8) {
            if (event.key == " ") {
                $("#char-popup p").html("Caractere inválido: Espaço");
            } else {
                $("#char-popup p").html("Caractere inválido: " + event.key);
            }
            $.magnificPopup.open({
                items: {
                    src: '#char-popup',
                    type: 'inline'
                },
                callbacks: {
                    open: function () {
                        setTimeout(function () {
                            $.magnificPopup.close();
                        }, 4000);
                    }
                },
                removalDelay: 300,
                mainClass: 'mfp-fade'
            });
            event.preventDefault();
        }
    });

    $("#button-select-grammar").click(function () {
        if ($(this).hasClass('disabled-button')) {
            return;
        }
        $("#words").val($("#sentence-input").val());
        $.magnificPopup.close();
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
                grammarReady(output);
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