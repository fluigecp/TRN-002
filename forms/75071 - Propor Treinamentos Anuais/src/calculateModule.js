/**
 * @module calculateModule
 */

var calculateModule = (function () {
    "use strict";

    /**
     *  @description Atualiza a somatorias do campo carga horária
     *  Caso o status do treinamento for cancelado, ele desconsidera a o campo
     * 	no cálculo final.
     */
    var updateCargaHorariaTotal = function () {
        var qtdeTotal = 0;
        var elementos = $(".cargaHorariaTbTreinamentos");
        $.each(elementos, function () {
            var status = $(this).closest(".tableBodyRow").find("select[name*='statsTbTreinamentos___']").val();
            if (status != "CANCELADO") {
                qtdeTotal += parseInt(this.value ? this.value : 0);
            }
        });
        $('#totalCargaHoraria').val(qtdeTotal);
    };

    /**
     *  @description Atualiza a somatorias do campo quantidade de participantes
     *  Caso o status do treinamento for cancelado, ele desconsidera a quantidade de participantes
     * 	no cálculo final.
     */
    var updateQtdeTotal = function () {
        var qtdeTotal = 0;
        var elementos = $(".qtdeParticipanteTbTreinamentos");
        $.each(elementos, function () {
            var status = $(this).closest(".tableBodyRow").find("select[name*='statsTbTreinamentos___']").val();
            if (status != "CANCELADO") {
                qtdeTotal += parseInt(this.value ? this.value : 0);
            }
        });
        $('#totalQtdParticipantes').val(qtdeTotal);
    };

    /**
     * @description Atualiza o valor total da estimativa de treinamentos.
     * Caso o status do treinamento for cancelado, ele desconsidera o campo
     * no cálculo final.
     */
    var updateEstimativaTotal = function () {
        var estimativaTotal = 0;
        var current;
        var elementos = $(".estimativaTbTreinamentos");
        var status;
        $.each(elementos, function () {
            current = numbersAndCurrency.convert.currencyStringToFloat(this.value);
            status = $(this).closest(".tableBodyRow").find('select[name*=statsTbTreinamentos___]').val();
            current = status == "CANCELADO" ? current * -1 : current;
            estimativaTotal += current < current * -1 ? 0 : current;
        });
        $('#totalEstimativa').val(numbersAndCurrency.convert.numberToCurrency(estimativaTotal));
    };

    /**
     * @description Realiza a somatória da coluna de total gasto.
     */
    var updateGastoTotal = function () {
        var totalGasto = 0;
        var current;
        var elementos = $(".valorGastoTbTreinamentos");
        $.each(elementos, function () {
            current = numbersAndCurrency.convert.currencyStringToFloat(this.value);
            totalGasto += current < 0 ? 0 : current;
        });
        $('#totalGasto').val(numbersAndCurrency.convert.numberToCurrency(totalGasto));
    };

    // Calcula saldo

    var calculaSaldo = function () {
        var somatoriaDespesas = 0;
        var fieldValorGastoValue = 0;
        var fieldValorEstimativaValue = 0;
        var fieldStatusValue = "";
        $('.valorGastoTbTreinamentos').each(function () {
            fieldStatusValue = $(this).closest(".tableBodyRow").find('select[name*=statsTbTreinamentos]').val();
            fieldValorGastoValue = $(this).val();
            fieldValorEstimativaValue = numbersAndCurrency.convert.currencyStringToFloat($(this).closest(".tableBodyRow").find('input[name*=estimativaTbTreinamentos]').val());
            fieldValorEstimativaValue = fieldStatusValue == "CANCELADO" ? 0 : fieldValorEstimativaValue;
            somatoriaDespesas += (fieldValorGastoValue == "0,00" || fieldValorGastoValue == "") && fieldStatusValue != "REALIZADO" ?
                fieldValorEstimativaValue : numbersAndCurrency.convert.currencyStringToFloat(fieldValorGastoValue);
        });
        var valorOrcamento = numbersAndCurrency.convert.currencyStringToFloat($("#orcamento").val());
        var saldo = valorOrcamento - somatoriaDespesas;
        var saldoInput = $("#saldo");
        saldo < 0 ? saldoInput.css("color", "red") : saldoInput.css("color", "#000");
        saldoInput.val(numbersAndCurrency.convert.numberToCurrency(saldo));
    };

    return {
        updateCargaHorariaTotal: updateCargaHorariaTotal,
        updateQtdeTotal: updateQtdeTotal,
        updateEstimativaTotal: updateEstimativaTotal,
        updateGastoTotal: updateGastoTotal,
        calculaSaldo: calculaSaldo
    }
})();
