    
    var manipulateDOM = (function () {
        "use strict";

        /**
         * @description - Adiciona botão de ação para ir para a solicitação de cada item das tabelas do formulário.
         */

        var addButtonsSolic = function () {
            $("#treinamentos_realizados .table-treinamentos-realizados tbody tr:not(:first-child)").each(function () {
                var numSolicitacao = $(this).closest(".tableBodyRow").find('input[name^="numero_solicitacao_tb1___"]').val();
                $(this).closest(".tableBodyRow").find('button[name^="btnSolicitacao_tb1___"], button[name*="btnSolicitacao_tb1"] ')
                    .html(numSolicitacao)
                    .off("click")
                    .on("click", {numSolicitacao: numSolicitacao}, manipulateDOM.actions4Listeners.clickButtonSolicEvent);
            });
            
            $("#avaliacoes_reacao .table-avaliacoes-reacao tbody tr:not(:first-child)").each(function () {
                var numSolicitacao = $(this).closest(".tableBodyRow").find('input[name^="numero_solicitacao_tb2___"]').val();
                $(this).closest(".tableBodyRow").find('button[name^="btnSolicitacao_tb2___"], button[name*="btnSolicitacao_tb2"] ')
                    .html(numSolicitacao)
                    .off("click")
                    .on("click", {numSolicitacao: numSolicitacao}, manipulateDOM.actions4Listeners.clickButtonSolicEvent);
            });
            $("#avaliacoes-eficacia .table-avaliacoes-eficacia tbody tr:not(:first-child)").each(function () {
                var numSolicitacao = $(this).closest(".tableBodyRow").find('input[name^="numero_solicitacao_tb3___"]').val();
                $(this).closest(".tableBodyRow").find('button[name^="btnSolicitacao_tb3___"],button[name*="btnSolicitacao_tb3"] ')
                    .html(numSolicitacao)
                    .off("click")
                    .on("click", {numSolicitacao: numSolicitacao}, manipulateDOM.actions4Listeners.clickButtonSolicEvent);
            });
        };

        var actions4Listeners = {
            clickButtonSolicEvent: function (e) {
                e.preventDefault();
                var numSolic = e.data.numSolicitacao;
                var currentLocation = document.location.origin;
                window.open(currentLocation + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" +
                    numSolic, "_blank");
            },

            expandEventListener: function (event) {
                event.preventDefault();
                var type = $(this).prop('tagName');
                var classe = ($(this).attr('class')).indexOf('expand');
                $(this).css('resize', 'none');
                if (classe > -1) {
                    $(this).show('slow', function () {
                        $(this).css({
                            'display': 'block',
                            'overflow-y': 'hidden'
                        });
                        manipulateDOM.expandTextarea(this.id);
                    });
                }
            }

        }

        /**
        *  @description Funções utilizadas durante o ciclo de vida do form.
        */

        var expandTextarea = function (id) {
            var element = document.getElementById(id);
            if (element.scrollHeight != null) {
                var altura = element.scrollHeight + 'px';
                $(element).animate({
                    overflow: 'hidden',
                    height: 0,
                    height: altura
                });
            }
        }
        return {
            addButtonsSolic: addButtonsSolic,
            actions4Listeners: actions4Listeners,
            expandTextarea: expandTextarea
        }
    })();
