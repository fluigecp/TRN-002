/**
 * @module manipulateDOM
 */

var manipulateDOM = (function(){
    "use strict";
    /** Listener events */
    var actions4Listeners = {
        updateClassificacaoTreinamentosCountFields: function() {
            var treinamentos = $("#treinamentos table tbody tr.tableBodyRow:not(:first-child)");
            var qtdeAprimoramento = 0,
                qtdeLegislacao = 0,
                qtdeProjeto = 0;
            $(treinamentos).each(function (i, e) {
                var classificacao = $(e).find("select[name*='classificacaoTbTreinamentos___']").val();
                var status = $(e).find("select[name*='statsTbTreinamentos___']").val();
                if (status != "CANCELADO") {
                    if (classificacao == "legislacao_obrigatorio") {
                        qtdeLegislacao++;
                    }
                    if (classificacao == "projeto_implantacao") {
                        qtdeProjeto++;
                    }
                    if (classificacao == "aprimoramento_profissional") {
                        qtdeAprimoramento++;
                    }
                }
            });
            $("#fato_4").val(qtdeProjeto);
            $("#fato_5").val(qtdeLegislacao);
            $("#fato_6").val(qtdeAprimoramento);
        },


    };

    /**
     * @description Limpa todos os campos de controle e seta o filtro do campo zoom de departamentos para não retornar nenhum valor.
     */
    var cleanAllFieldsRelatedArea = function() {
        $('[data-field-name="departamento"] [data-role=remove]').trigger('click');
        $("#responsavelDepartamento").val("");
        $("#matResponsavelDepartamento").val("");
        $("#siglaDepartamento").val("");
        $("#numeroOrcamentarioDepartamento").val("");
        $("#guardaArea").val("");
        reloadZoomFilterValues('departamento', 'areaOrcamento,areaOrcamento');
    }

    /**
     * @description Atualiza o valor da estimativa de acordo com o status selecionado.
     * Regras de status:
     * 
     * EM BRANCO: Considera o valor da estimativa e desconsidera o valor gasto no calculo final de saldo.
     * REALIZADO: Desconsidera o valor da estimativa e considera o valor gasto no calculo final de saldo.
     * CANCELADO: Tanto o valor gasto e o valor da estimativa não é considerado no calculo final de saldo.
     * 
     * Em todos os casos o valor da estimativa é calculado.
     * 
     * @param {*} combo - Combobox de status do treinamento
     */
    var atualizaEstimativaStatus = function(combo) {
        var currentValorEstimativa, estimativa, comboValue;
        //obtém o valor da estimativa
        currentValorEstimativa = combo.closest(".tableBodyRow").find('input[name*=estimativaTbTreinamentos]');
        //obtém o valor gasto no treinamento
        currentValorGasto = combo.closest(".tableBodyRow").find('input[name*=valorGastoTbTreinamentos]');
        comboValue = combo.val();
        if (comboValue == "") {
            combo.removeClass("has-success has-error");
            combo.css("background-color", "#fff");
            estimativa = numbersAndCurrency.convert.currencyStringToFloat(currentValorEstimativa.val());
            estimativa = estimativa < 0 ? estimativa * -1 : estimativa;
            // zera o valor de total gasto do treinamento.
            currentValorGasto.val(numbersAndCurrency.convert.numberToCurrency(0));
            currentValorGasto.attr('readonly', true);
        } else if (comboValue == "REALIZADO") {
            combo.addClass("has-success");
            combo.removeClass("has-error");
            combo.css("background-color", "rgba(27, 195, 27, 0.25)");
            currentValorGasto.attr('readonly', false);
            estimativa = numbersAndCurrency.convert.currencyStringToFloat(currentValorEstimativa.val());
            estimativa = estimativa < 0 ? estimativa * -1 : estimativa;
        } else if (comboValue == "CANCELADO") {
            combo.addClass("has-error");
            combo.removeClass("has-success");
            combo.css("background-color", "rgba(213, 49, 47, 0.25)");
            // zera o valor de total gasto do treinamento.
            currentValorGasto.val(numbersAndCurrency.convert.numberToCurrency(0));
            currentValorGasto.attr('readonly', true);
            estimativa = numbersAndCurrency.convert.currencyStringToFloat(currentValorEstimativa.val());
        }
        setTimeout(function () {
            currentValorEstimativa.val(numbersAndCurrency.convert.numberToCurrency(estimativa));
            calculateModule.updateEstimativaTotal();
            calculateModule.updateQtdeTotal();
            calculateModule.updateCargaHorariaTotal();
            calculateModule.calculaSaldo();
            calculateModule.updateGastoTotal();
        }, 300);
    }

    /**
     * 	@description Atualiza os campos de autocomplete e esconde os campos de autocomplete gerados 
     *  automaticamente quando os campos hidden são criados e limita o número de tags
     *  baseado na quantidade de participantes definida no campo anterior.
     */

    function updateAutoCompleteWithLimit(element) {
        var autoCompleteFieldId = $(element).closest(".tableBodyRow").find("input[name*=matriculasNomesTbTreinamentos]").attr('id');
        var maxTag = $(element).val() == "" ? "0" : $(element).val();
        var autoComplete = FLUIGC.autocomplete("#" + autoCompleteFieldId);
        autoComplete.destroy();
        var autoComplete = FLUIGC.autocomplete("#" + autoCompleteFieldId, {
            maxTags: maxTag,
            onMaxTags: _autocompleteListeners.maxtagAction
        });
        /**
         * @description Máscara para o campo de Nome(apenas letras) - Matrícula(apenas número).
         * 
         */
        autoComplete.input().on({
            "blur": _autocompleteListeners.blurAction,
            "keypress": _autocompleteListeners.keypressAction
        });

        $.each($(".matriculasNomesTbTreinamentosContainer .bootstrap-tagsinput"),
         _autocompleteListeners.foreachAction);
         
        return autoComplete;
    };

    var _autocompleteListeners = {
        maxtagAction: function(item, tag) {
            if ($(element).val() != "") {
                if (!($(".alert-danger").length > 0)) {
                    FLUIGC.toast({
                        message: 'Limite de participantes atingido.',
                        type: 'danger'
                    });
                }
            } else {
                return false;
            }
        },

        blurAction: function() {
            $(".alert-danger").remove();
        },

        keypressAction: function(e) {
            e = e || window.event;
            var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
            var numberSide = $(this).val().indexOf("- ");
            var charStr = String.fromCharCode(charCode);
            var obj = $(this);
            if (numberSide == -1) {
                if (obj.val().length > 14 || charCode == 45) {
                    obj.val(obj.val() + " - ");
                    return false;
                }
                if (charCode > 47 && charCode < 58) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (charCode > 47 && charCode < 58) {
                    return false;
                }
            }
        },

        foreachAction: function () {
            $(this).next().css("display", "none");
            if ($(this).prev().attr('type') == "hidden") {
                $(this).css("display", "none");
            }
        }
    }


    /**
     * Verifica se existe departamentos na lista de participantes
     * @param {Object} participantesObj 
     * @returns {Boolean} true, caso haja departamento.
     */
    var checkIfHasDepartamento = function(participantesObj) {
        for (var i = 0; i < participantesObj.length; i++) {
            if (participantesObj[i].matricula == "00000") {
                return true;
            }
        }
        return false;
    };

    /**
     * retorna um array de objetos com nome e matricula de todos os participantes.
     * @param {string} strArray - Parâmetro array com todos os participantes. 
     */
    var filterParticipantesObj = function (strArray) {
        var participantesObj = [];
        for (var i = 0; i < strArray.length; i++) {
            participantesObj.push({
                nome: strArray[i].substring(strArray[i].indexOf("-") + 2),
                matricula: strArray[i].substring(0, strArray[i].indexOf("-") - 1)
            });
        }
        return participantesObj;
    };


    var zoomFields = {
        eventZoom: function(selectedItem){
            if (selectedItem.inputName == 'departamento') {
                if (event.type != 'load') {
                    $("#responsavelDepartamento").val(selectedItem.responsavel);
                    $("#matResponsavelDepartamento").val(selectedItem.matResponsavel);
                    $("#siglaDepartamento").val(selectedItem.sigla);
                    $("#guardaDpto").val(selectedItem.segmentoExecutivo);
                    $("#numeroOrcamentarioDepartamento").val(selectedItem.numeroOrcamentario);
                    //Verifica se existe ficha aberta para o segmento/departamento selecionado.
                    var existeDepartamento = servicesModule.hasDepartamentoPlanejamentoThisYear(selectedItem.segmentoExecutivo, $("#anoVigencia").val());
                    //Caso exista, é disparado um aviso e limpa os campos.
                    if (existeDepartamento) {
                        FLUIGC.message.alert({
                            message: 'Já existe um planejamento de treinamentos anuais para este Segmento.',
                            title: selectedItem.segmentoExecutivo,
                            label: 'OK'
                        }, function (el, ev) {
                            $('[data-field-name=departamento] [data-role=remove], [data-field-name=departamento] .select2-selection__choice__remove').trigger('click');
                            $("#responsavelDepartamento").val("");
                            $("#matResponsavelDepartamento").val("");
                            $("#siglaDepartamento").val("");
                            $("#numeroOrcamentarioDepartamento").val("");
                        });
                    }
                }
            }
        
            if (selectedItem.inputName == 'areaOrcamento') {
                if (event.type != 'load') {
                    $("#guardaArea").val(selectedItem.areaOrcamento);
                    /**
                     * Seta o filtro para o zoom de departamentos, para filtrar todos os segmentos/departamentos
                     * relacionados a área selecionada especificamente.
                     */
                    reloadZoomFilterValues('departamento', 'areaOrcamento,' + $("#guardaArea").val());
                }
                $('[data-field-name="areaOrcamento"] [data-role=remove]').on('click', function () {
                    manipulateDOM.cleanAllFieldsRelatedArea();
                });
            }
        
            if (selectedItem.inputName.indexOf("participanteFluig") !== -1) {
                var zoomFieldName = selectedItem.inputName;
                var $participantesFieldId = $("[name*=" + zoomFieldName + "]").closest(".tableBodyRow").find("input[name*=matriculasNomesTbTreinamentos]").attr("id");
                var participantes = FLUIGC.autocomplete("#" + $participantesFieldId);
                var zoomField = window[zoomFieldName];
                var tagData = selectedItem.colleagueId + " - " + selectedItem.colleagueName;
                participantes.add(tagData);
                zoomField.clear();
            }
        
            if (selectedItem.inputName.indexOf("funcionariosAtivos") !== -1) {
                var zoomFieldName = selectedItem.inputName;
                var $participantesFieldId = $("[name*=" + zoomFieldName + "]").closest(".tableBodyRow").find("input[name*=matriculasNomesTbTreinamentos]").attr("id");
                var zoomField = window[zoomFieldName];
                var participantes = FLUIGC.autocomplete("#" + $participantesFieldId);
                var tagData = selectedItem.matricula + " - " + selectedItem.nome;
                participantes.add(tagData);
                zoomField.clear();
            }
        }
    };

    //Histórico

    var expandTextarea = function (id) {
        var objTextArea = document.getElementById(id);

        if (objTextArea.scrollHeight > objTextArea.offsetHeight) {
            objTextArea.rows += 1;
        }
    };

    var mostraHistorico = function () {
        var historico = 'historico';
        document.getElementById(historico).style.display = 'inline';
        expandTextarea(historico);
    };

    //Fim do histórico
})();