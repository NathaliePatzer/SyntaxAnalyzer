$(document).ready(function () {

    var cont = 0;
    var inputStack = [];
    var stack = [];
    var parsingTable = {
        "S": {
            "a": "aA",
            "b": "bB",
        },
        "A": {
            "b": "bA",
            "c": "cC",
            "d": "dD",
        },
        "B": {
            "c": "cS",
            "d": "dDA",
        },
        "C": {
            "a": "aS",
            "b": "ε",
            "$": "ε"
        },
        "D": {
            "c": "cCb",
        }
    };

    function createInputStack(inputString) {
        //Converte a string em um array de caracteres:
        let charArray = [...inputString];

        //Inverte a ordem do array:
        let reversedArray = charArray.reverse();

        //Retorna um novo array começando com "$" seguido pelos elementos do array invertido:
        return ['$', ...reversedArray];
    }

    function stackToString(stack) {
        // Primeiro, revertemos o array para que a ordem fique correta.
        // Ex: ['$', 'd', 'c', 'b', 'a'] se torna ['a', 'b', 'c', 'd', '$']
        const reversedArray = stack.slice().reverse();

        // Depois, juntamos todos os elementos do array revertido em uma única string.
        const resultString = reversedArray.join('');

        return resultString;
    }

    function sintaxAnalyzer() {
        cont++;
        var stackItem = stack[stack.length - 1];
        var inputStackItem = inputStack[inputStack.length - 1];

        console.log(stackItem);
        console.log(inputStackItem);
        console.log(inputStack);
        console.log(stack);

        if (stackItem == inputStackItem) {
            if (stackItem == "$") {
                var tableEntry = `<tr class="row">
                    <td class="column_stack">${stack.join('')}</td>
                    <td class="column_entry">${stackToString(inputStack)}</td>
                    <td class="column_action">Aceito em ${cont} passos</td>
                </tr>`;
                stack.pop();
                inputStack.pop();
                $("#resolutionTableBody").append(tableEntry);
                //alert("aceito em X passos");
            } else {
                var tableEntry = `<tr class="row">
                    <td class="column_stack">${stack.join('')}</td>
                    <td class="column_entry">${stackToString(inputStack)}</td>
                    <td class="column_action">Ler ${inputStackItem}</td>
                </tr>`;
                stack.pop();
                inputStack.pop();
                $("#resolutionTableBody").append(tableEntry);
                //alert("ler");
                sintaxAnalyzer();
            }
        } else {
            if (stackItem in parsingTable) {
                //alert("esta na parsing table");
                if (inputStackItem in parsingTable[stackItem]) {
                    var tableEntry = `<tr class="row">
                        <td class="column_stack">${stack.join('')}</td>
                        <td class="column_entry">${stackToString(inputStack)}</td>
                        <td class="column_action">${stackItem} → ${parsingTable[stackItem][inputStackItem]}</td>
                    </tr>`;

                    stack.pop();
                    let productionRule = parsingTable[stackItem][inputStackItem];

                    if (productionRule !== "ε") {
                        for (let i = productionRule.length - 1; i >= 0; i--) {
                            // Empilhamos cada caractere
                            stack.push(productionRule[i]);
                        }
                    }
                    $("#resolutionTableBody").append(tableEntry);
                    //alert("tem na parsing table");
                    sintaxAnalyzer();
                } else {
                    var tableEntry = `<tr class="row">
                        <td class="column_stack">${stack.join('')}</td>
                        <td class="column_entry">${stackToString(inputStack)}</td>
                        <td class="column_action">Erro em ${cont} passos</td>
                    </tr>`;
                    $("#resolutionTableBody").append(tableEntry);
                    //alert("erro (topo da pilha não esta na parsing table");
                }
            } else {
                var tableEntry = `<tr class="row">
                    <td class="column_stack">${stack.join('')}</td>
                    <td class="column_entry">${stackToString(inputStack)}</td>
                    <td class="column_action">Erro em ${cont} passos</td>
                </tr>`;
                $("#resolutionTableBody").append(tableEntry);
                //alert("erro (topo da pilha não esta na parsing table");
            }
        }
    }

    //Criar a pilha da entrada 
    $("#button-execute").click(function () {
        if ($("#words").val().trim() != "") {
            cont = 0;
            stack[0] = "$";
            stack[1] = "S";

            inputStack = createInputStack($("#words").val());

            $("#resolutionTableBody").html("");
            sintaxAnalyzer();

        } else {
            $.magnificPopup.open({
                items: {
                    src: '#empty-popup',
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
        }
    });

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