/** Global Variables */
var activity = 0,
    modo = '',
    currentLocation = '';

/**
 * @module Lifecycle
 */
var lifecycle = (function () {
    "use strict";
    /**
     * @description Função de inicialiazação do ciclo de vida do processo.
     */
    var init = function () {
        _setup();
        _logActivityInformation();
        _control();
    };
    /**
     * @description Função que inicializa as variáveis globais que serão utilizadas ao longo do
     * ciclo de vida do processo.
     */
    var _setup = function () {
        activity = getAtividade();
        modo = getFormMode();
        currentLocation = document.location.origin;
    };
    /**
     * @description Dispara um log da atividade.
     */
    var _logActivityInformation = function () {
        console.log("Activity: ", activity);
        console.log("Modo: ", modo);
    };
    /**
     * @description Controla o ciclo de vida e os eventos do processo
     */
    var _control = function() {
        document.getElementById("currentActivity").value = activity;
        
       	/**
        * Funções de validações
        */
        $(".expand").on("click", manipulateDOM.actions4Listeners.expandTextareaListener);
        manipulateDOM.actions4Listeners.initSomething.dataTable();
        manipulateDOM.actions4Listeners.initSomething.popover();

        /** Início - Life Cycle */
        if (activity == 0 || activity == 4) {
            document.getElementById("dataAbertura").value = dateFunctions.calendar.today().date;
            document.getElementById("anoVigencia").value = parseInt(dateFunctions.calendar.today().year) + 1;
        }
        // Rotinas padronizadas
        if (activity == 12 || activity == 14 || activity == 18 || activity == 22 || activity == 24 ||
            activity == 26 || activity == 30 || activity == 35 || activity == 40) {
            $(".qtdeParticipanteTbTreinamentos").each(function () {
                if (modo != "VIEW") {
                    manipulateDOM.updateAutoCompleteWithLimit(this);
                }
            });

            if (activity != 12 && activity != 24) {
                $(".qtdeParticipanteTbTreinamentos").each(function () {
                    manipulateDOM.disableAutoCompleteField($(this));
                });
                $(".bootstrap-tagsinput input[type=text]").each(function () {
                    $(this).attr("placeholder", "");
                });
            }

            if (activity == 14) {
                $("input[name='treinamentoAprovado']").attr('checked', false);
                manipulateDOM.actions4Listeners.updateClassificacaoTreinamentosCountFields();
            }

            if (activity == 18) {
                $("input[name='treinamentoAprovadoGGR']").attr('checked', false);
            } 

            if (activity == 22) {
                setTimeout(function () {
                    calculateModule.calculaSaldo();
                }, 2000);
            } 

            if (activity == 26) {
                $("input[name='planejamentoAprovadoRH']").attr('checked', false);
                manipulateDOM.actions4Listeners.updateClassificacaoTreinamentosCountFields();
            } 

            if (activity == 30) {
                $("input[name='planejamentoAprovadoGGR']").attr('checked', false);
            } 

            if (activity == 35) {
                $("input[name='atualizarPlanejamento']").attr('checked', false);
                manipulateDOM.actions4Listeners.updateClassificacaoTreinamentosCountFields();
            }

            if (activity > 35) {
                manipulateDOM.actions4Listeners.updateClassificacaoTreinamentosCountFields();
            }
        }


        if (activity == 12 || activity == 24) {
            //  Cadastrar um treinamento
            $('div#treinamentos').on('blur change focusout', 'tbody input[name^="estimativaTbTreinamentos___"]', function (event) {
                $(this).val(numbersAndCurrency.convert.numberToCurrency(numbersAndCurrency.convert.currencyStringToFloat(this.value)));
                calculateModule.updateEstimativaTotal();
                if (activity == 24) {
                    calculateModule.calculaSaldo();
                }
            });

            $('div#treinamentos').on('blur change focusout', 'tbody input[name^="matriculasNomesTbTreinamentos___"]', function (event) {
                var textWithComma = $(this).val();
                var textWithSpace = textWithComma.replace(/,/g, '\n');
                $(this).closest(".tableBodyRow").find(".matriculasNomesTbTreinamentosView").val(textWithSpace);
            });
            
            $('button#add-treinamento').on("click", manipulateDOM.actions4Listeners.tableTreinamento.add);
            $('button#replicar-treinamento').on("click", manipulateDOM.actions4Listeners.tableTreinamento.replicar);

            /**
             *  @description Trava valores negativos no campo de quantidade de participantes e atualiza 
             *  quantidade máxima de tags no campo seguinte (participantes)
             */
            $('div#treinamentos').on('change', 'tbody input[name^="qtdeParticipanteTbTreinamentos___"]', function () {
                var itens, auto, $participantesField;
                if (parseInt(this.value) < 0)
                    this.value = 0;
                calculateModule.updateQtdeTotal();
                $participantesField = $(this).closest(".tableBodyRow").find("[name*=matriculasNomesTbTreinamentos___]");
                itens = $participantesField.val();
                $participantesField.val("");
                auto = manipulateDOM.updateAutoCompleteWithLimit(this);
                auto.add(itens);
            });

            $('div#treinamentos').on('change', 'tbody input[name^="cargaHorariaTbTreinamentos___"]', function () {
                if (parseInt(this.value) < 0)
                    this.value = 0;
                calculateModule.updateCargaHorariaTotal();
            });

            $('div#treinamentos').on('mousedown', 'i.fluigicon-trash', manipulateDOM.actions4Listeners.tableTreinamento.remover);
        }

        if (activity == 24 || activity == 26 || activity == 30 || activity == 35) {
            if (modo != "VIEW") {
                calculateModule.calculaSaldo();
                calculateModule.updateEstimativaTotal();
            }

            if (activity == 24) {
                $(".statusTbTreinamentos").each(function () {
                    var self = this;
                    if ($(this).val() == "CANCELADO" || $(this).val() == "REALIZADO") {
                        manipulateDOM.disableAutoCompleteField($(self));
                        $(self).closest(".tableBodyRow").find(".btn-delete").remove();
                        $(self).closest(".tableBodyRow").find(".matriculasNomesTbTreinamentosView").show();
                    }
                });
            }

            var regTreinamentos = $("#treinamentos table tbody tr.tableBodyRow:not(:first)");
            if (regTreinamentos.length > 0) {
                regTreinamentos.each(function () {
                    var $hasAvaliacaoReacao = $(this).closest(".tableBodyRow").find("input[name*=hasAvaliacaoReacao___]");
                    var $hasAvaliacaoReacaoName = $(this).closest(".tableBodyRow").find("input[name*=hasAvaliacaoReacaoName___]");
                    $hasAvaliacaoReacaoName.val($hasAvaliacaoReacao.attr("name"));
                });
            }

        }

        if (activity == 35) {
            $('.statusTbTreinamentos').on('change', function () {
                manipulateDOM.atualizaEstimativaStatus($(this));
            });
            $(".statusTbTreinamentos").each(function () {
                manipulateDOM.atualizaEstimativaStatus($(this));
            });
            $('.valorGastoTbTreinamentos').on('change', function () {
                calculateModule.calculaSaldo();
                calculateModule.updateGastoTotal();
            });
            $('.valorGastoTbTreinamentos').each(function () {
                if ($(this).val() != "") {
                    var statusField = $(this).closest('.tableBodyRow').find('select[name*=statsTbTreinamentos___]');
                    if (statusField.val() == "REALIZADO" || statusField.val() == "CANCELADO") {
                        $(this).attr('readonly', true);
                    }
                }
            });
    
            $("input[name='atualizarPlanejamento']").on('change', function () {
                var _self = $(this);
                if ($(this).val() == "Não") {
                    FLUIGC.message.confirm({
                        message: 'Deseja realmente não atualizar o planejamento antes de finalizar?',
                        title: 'Finalizar Planejamento',
                        labelYes: 'Sim',
                        labelNo: 'Não'
                    }, function (result, el, ev) {
                        if (!result) {
                            _self.attr('checked', false);
                        }
                    });
                }
            });
        }

        if (modo == 'VIEW') {
            var currentVal = $("option:selected", $("#departamento"));
            $("#departamento > option").each(function () {
                if (this.value != currentVal.val()) {
                    $(this).remove();
                }
            });
        }

        /** Fim - Life Cycle */
    
    };

    var windowLoadEvents = function () {
        /** Events onload, zoomFields etc.. */
        
        var filters = 'areaOrcamento,' + $('input#guardaArea').val();
        var act = getAtividade();
        if (act == 0 || act == 4) {
            if ($('input#guardaArea').val() !== '' && modo !== 'VIEW') {
                reloadZoomFilterValues('departamento', filters);
                setAreaOrcamento();
            }
            if ($('input#guardaDpto').val() !== '' && modo !== 'VIEW') {
                setAreaDepartamento();
            }
        }
    
        /* DECLARA O OBJETO ZOOM ÁREA ORÇAMENTO */
        function setAreaOrcamento() {
            var $areaOrcamento = FLUIGC.autocomplete('input#areaOrcamento');
            var $areaOrcamentoTagData = {
                areaOrcamento: $('input#guardaArea').val()
            };
            $areaOrcamento.add($areaOrcamentoTagData);
        }
    
        /* DECLARA O OBJETO ZOOM DEPARTAMENTO */
        function setAreaDepartamento() {
            var $eventoNome = FLUIGC.autocomplete('input#departamento');
            var $eventoTagData = {
                segmentoExecutivo: $('input#guardaDpto').val()
            };
            $eventoNome.add($eventoTagData);
        }
    
        if (act == 12 || act == 24) {
            $(document).on("fluig.autocomplete.itemAdded fluig.autocomplete.itemRemoved", function (item) {
                var participantesIdField = item.target.id;
                participantesIdField = participantesIdField.indexOf("participanteFluig") == -1 ? participantesIdField : "";
                if (participantesIdField != "") {
                    var myTagParticipantes = FLUIGC.autocomplete("#" + participantesIdField);
                    var myTagParticipantesArray = myTagParticipantes.items();
                    var totalParticipantes = $("[name=" + participantesIdField + "]").closest(".tableBodyRow").find(".qtdeParticipanteTbTreinamentos").val();
                    var participantesObj = filterParticipantesObj(myTagParticipantesArray);
                    var hasDepartamento = checkIfHasDepartamento(participantesObj);
                    var $tagControl = $("[name=" + participantesIdField + "]").closest(".tableBodyRow").find("[name*=tagControl___]");
                    console.log("tagControl: ", $tagControl);
                    if (hasDepartamento) {
                        $tagControl.val("Sim");
                        console.log("Departamento added, passed!");
                    } else {
                        if (myTagParticipantesArray.length < totalParticipantes) {
                            $tagControl.val("Não");
                            console.log("Adicionar mais participantes!");
                        } else {
                            $tagControl.val("Sim");
                            console.log("passed!");
                        }
                    }
                }
            });
        }
    };

    return {
        init: init,
        windowLoadEvents: windowLoadEvents
    }
})();