    
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
            $("#avaliacoes_eficacia .table-avaliacoes-eficacia tbody tr:not(:first-child)").each(function () {
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

        };

        var populate = {
            mainForm: function(objData) {
                var matricula = objData.matricula == undefined ? "" : objData.matricula;
                var participante = objData.participante == undefined ? "" : objData.participante;
                document.getElementById("lotacao").value = objData.lotacao == undefined ? "" : objData.lotacao;
                document.getElementById("departamento").value = objData.departamento == undefined ? "" : objData.departamento;
                window["matricula"].setValue(matricula);
                window["participante"].setValue(participante);
            },

            tables: {
                treinamentos: function(objData) {
                    for ( var i = 0; i < objData.length; i++ ) {
                        var row = wdkAddChild("treinamentos_realizados");
                        document.getElementById("titulo_do_treinamento_tb1___" + row).value = objData[i].titulo_do_treinamento_tb1 == undefined ? "" : objData[i].titulo_do_treinamento_tb1;
                        document.getElementById("classificacao_treinamento_tb1___" + row).value = objData[i].classificacao_treinamento_tb1 == undefined ? "" : objData[i].classificacao_treinamento_tb1;
                        document.getElementById("planejamento_anual_tb1___" + row).value = objData[i].planejamento_anual_tb1 == undefined ? "" : objData[i].planejamento_anual_tb1;
                        document.getElementById("justificativa_treinamento_tb1___" + row).value = objData[i].justificativa_treinamento_tb1 == undefined ? "" : objData[i].justificativa_treinamento_tb1;
                        document.getElementById("instituicao_treinamento_tb1___" + row).value = objData[i].instituicao_treinamento_tb1 == undefined ? "" : objData[i].instituicao_treinamento_tb1;
                        document.getElementById("carga_horaria_tb1___" + row).value = objData[i].carga_horaria_tb1 == undefined ? "" : objData[i].carga_horaria_tb1 ;
                        document.getElementById("ano_realizacao_tb1___" + row).value = objData[i].ano_realizacao_tb1 == undefined ? "" : objData[i].ano_realizacao_tb1 ;
                        document.getElementById("numero_solicitacao_tb1___" + row).value = objData[i].numero_solicitacao_tb1 == undefined ? "" : objData[i].numero_solicitacao_tb1;
                    } 
                },
                
                reacao: function(objData) {
                    for (var i = 0; i < objData.length; i++) {
                        var row = wdkAddChild("avaliacoes_reacao");
                        document.getElementById("numero_solicitacao_tb2___" + row).value = objData[i].numero_solicitacao_tb2 == undefined ? "" : objData[i].numero_solicitacao_tb2;
                        document.getElementById("titulo_do_treinamento_tb2___" + row).value = objData[i].titulo_do_treinamento_tb2 == undefined ? "" : objData[i].titulo_do_treinamento_tb2;
                        document.getElementById("ano_realizacao_tb2___" + row).value = objData[i].ano_realizacao_tb2 == undefined ? "" : objData[i].ano_realizacao_tb2;
                        document.getElementById("data_inicio_tb2___" + row).value = objData[i].data_inicio_tb2 == undefined ? "" : objData[i].data_inicio_tb2;
                        document.getElementById("data_termino_tb2___" + row).value = objData[i].data_termino_tb2 == undefined ? "" : objData[i].data_termino_tb2 ;
                        document.getElementById("avaliacao_media_tb2___" + row).value = objData[i].avaliacao_media_tb2 == undefined ? "" : objData[i].avaliacao_media_tb2;
                    }
                },

                eficacia: function(objData) {
                    for (var i = 0; i < objData.length; i++) {
                        var row = wdkAddChild("avaliacoes_eficacia");
                        document.getElementById("numero_solicitacao_tb3___" + row).value = objData[i].numero_solicitacao_tb3 == undefined ? "" : objData[i].numero_solicitacao_tb3;
                        document.getElementById("titulo_do_treinamento_tb3___" + row).value = objData[i].titulo_do_treinamento_tb3 == undefined ? "" : objData[i].titulo_do_treinamento_tb3;
                        document.getElementById("ano_realizacao_tb3___" + row).value = objData[i].ano_realizacao_tb3 == undefined ? "" : objData[i].ano_realizacao_tb3;
                        document.getElementById("data_inicio_tb3___" + row).value = objData[i].data_inicio_tb3 == undefined ? "" : objData[i].data_inicio_tb3 ;
                        document.getElementById("data_termino_tb3___" + row).value = objData[i].data_termino_tb3 == undefined ? "" : objData[i].data_termino_tb3;
                    }
                }

            }
        }

        var zoomFields = {
            eventZoom: function(selectedItem) {
                $("#treinamentos_realizados").find("tr.tableBodyRow:not(:first)").each(function () {
                    fnWdkRemoveChild(this);
                });

                $("#avaliacoes_reacao").find("tr.tableBodyRow:not(:first)").each(function () {
                    fnWdkRemoveChild(this);
                });

                $("#avaliacoes_eficacia").find("tr.tableBodyRow:not(:first)").each(function () {
                    fnWdkRemoveChild(this);
                });

                var participante, treinamentos, reacao, eficacia, constraintZoom;
                
                if (selectedItem.inputName == "matricula") {
                    constraintZoom = servicesModule.constraintFilterFactory(selectedItem.inputName, selectedItem.matricula);
                }
                
                if (selectedItem.inputName == "participante") {
                    constraintZoom = servicesModule.constraintFilterFactory(selectedItem.inputName, selectedItem.participante);
                }

                participante = servicesModule.consultas.getParticipanteData(constraintZoom);
                treinamentos = servicesModule.consultas.getTreinamentos(constraintZoom);
                reacao = servicesModule.consultas.getAvaliacoesReacao(constraintZoom);
                eficacia = servicesModule.consultas.getAvaliacaoEficacia(constraintZoom);

                if (participante) {
                    populate.mainForm(participante[0]);
                }
                
                if (treinamentos) {
                    populate.tables.treinamentos(treinamentos);
                }
                
                if (reacao) {
                    populate.tables.reacao(reacao);
                }
                
                if (eficacia) {
                    populate.tables.eficacia(eficacia);
                }
                manipulateDOM.addButtonsSolic();
            }
        };

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
        };

        return {
            addButtonsSolic: addButtonsSolic,
            actions4Listeners: actions4Listeners,
            expandTextarea: expandTextarea,
            zoomFields: zoomFields
        }
    })();
