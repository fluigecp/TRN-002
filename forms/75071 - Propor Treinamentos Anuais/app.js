var activity = 0,
	modo = '',
	data = new Date();

$(window).load(function (){
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
	
});

$(document).ready(function () {
	activity = getAtividade();
	modo = getFormMode();
	console.log("Activity: ", activity);
	console.log("Modo: ", modo);
	$("#currentActivity").val(activity);
	
	/**
	 * Funções de validações
	 */
	$('.expand').on('click ', function (event) {
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
				expandTextarea(this.id);
			});
		}
	});



	/** Início - Life Cycle */
	if (activity == 0 || activity == 4) {
		$("#dataAbertura").val(getToday().date);
		$("#anoVigencia").val(parseInt(getToday().year) + 1);
	}
	// Rotinas padronizadas
	if (activity == 12 || activity == 14 || activity == 18 || activity == 22 || activity == 24 ||
		activity == 26 || activity == 30 || activity == 35 || activity == 40) {
		$(".qtdeParticipanteTbTreinamentos").each(function () {
			if (modo != "VIEW") {
				updateAutoCompleteWithLimit(this);
			}
		});

		if (activity != 12 && activity != 24) {
			$(".qtdeParticipanteTbTreinamentos").each(function () {
				disableAutoCompleteField($(this));
			});
			$(".bootstrap-tagsinput input[type=text]").each(function () {
				$(this).attr("placeholder", "");
			});
		} 

		if (activity == 14) {
			$("input[name='treinamentoAprovado']").attr('checked', false);
			updateClassificacaoTreinamentosCountFields();
		} 

		if (activity == 18) {
			$("input[name='treinamentoAprovadoGGR']").attr('checked', false);
		} else

		if (activity == 22) {
			setTimeout(function () {
				calculaSaldo();
			}, 2000);
		} else

		if (activity == 26) {
			$("input[name='planejamentoAprovadoRH']").attr('checked', false);
			updateClassificacaoTreinamentosCountFields();
		} else

		if (activity == 30) {
			$("input[name='planejamentoAprovadoGGR']").attr('checked', false);
		} else

		if (activity == 35) {
			$("input[name='atualizarPlanejamento']").attr('checked', false);
			updateClassificacaoTreinamentosCountFields();
		}

		if ( activity > 35 ) {
			updateClassificacaoTreinamentosCountFields();
		}
	}


	if (activity == 12 || activity == 24) {
		//  Cadastrar um treinamento
		$('div#treinamentos').on('blur change focusout', 'tbody input[name^="estimativaTbTreinamentos___"]', function (event) {
			$(this).val(numeroParaMoeda(converteParaFloat(this.value)));
			updateEstimativaTotal();
			if (activity == 24) {
				calculaSaldo();
			}
		});

		$('div#treinamentos').on('blur change focusout', 'tbody input[name^="matriculasNomesTbTreinamentos___"]', function (event) {
			var textWithComma = $(this).val();
			var textWithSpace = textWithComma.replace(/,/g, '\n');
			$(this).closest(".tableBodyRow").find(".matriculasNomesTbTreinamentosView").val(textWithSpace);
		});

		//habilitar popovers
		FLUIGC.popover('.bs-docs-popover-hover', {
			trigger: 'hover',
			placement: 'auto'
		});
		
		// adiciona um elemento na tabela e atualiza os campos de autocomplete
		$('button#add-treinamento').click(function (event) {
			var row = wdkAddChild('tbTreinamentos');
			$("#statusTbTreinamentos___" + row).val("");
			$("#cancelamentoJustificado___" + row).val("NAO");
			$("#valorGastoTbTreinamentos___" + row).attr("readonly", true);
			$("#valorGastoTbTreinamentos___" + row).css({
				"pointer-events": "none",
				"touch-action": "none"
			});
			$("#statsTbTreinamentos___" + row).attr("readonly", true);
			$("#statsTbTreinamentos___" + row).css({
				"pointer-events": "none",
				"touch-action": "none"
			});
			$(".qtdeParticipanteTbTreinamentos").each(function () {
				updateAutoCompleteWithLimit(this);
			});
			$(".statusTbTreinamentos").each(function () {
				var currentStatus = $(this);
				if (currentStatus.val() == "REALIZADO" || currentStatus.val() == "CANCELADO")
					disableAutoCompleteField(currentStatus);
			});
			var inputs = $("[mask]");
			MaskEvent.initMask(inputs);
		});

		// Replica Treinamento anterior
		$('button#replicar-treinamento').click(function (event) {
			//Obter todas as linhas da tabela de treinamento, desconsiderando a primeira
			var regCount = $("#treinamentos table tbody tr.tableBodyRow:not(:first)").length;
			if (regCount > 0) {
				var row = wdkAddChild('tbTreinamentos');
				$("#statusTbTreinamentos___" + row).val("");
				$("#cancelamentoJustificado___" + row).val("NAO");
				$("#treinamentoTbTreinamentos___" + row).val( $("#treinamentoTbTreinamentos___" + row).closest(".tableBodyRow").prev().find('input[name*="treinamentoTbTreinamentos___"]').val() );
				$("#classificacaoTbTreinamentos___" + row).val( $("#classificacaoTbTreinamentos___" + row).closest(".tableBodyRow").prev().find('select[name*="classificacaoTbTreinamentos___"]').val() );
				$("#justificativaTbTreinamentos___" + row).val( $("#justificativaTbTreinamentos___" + row).closest(".tableBodyRow").prev().find('textarea[name*="justificativaTbTreinamentos___"]').val() );
				$("#qtdeParticipanteTbTreinamentos___" + row).val( $("#qtdeParticipanteTbTreinamentos___" + row).closest(".tableBodyRow").prev().find('input[name*="qtdeParticipanteTbTreinamentos___"]').val() );
				$("#matriculasNomesTbTreinamentos___" + row).val( $("#matriculasNomesTbTreinamentos___" + row).closest(".tableBodyRow").prev().find('input[name*="matriculasNomesTbTreinamentos___"]').val() );
				$("#entidadeSugeridaTbTreinamentos___" + row).val( $("#entidadeSugeridaTbTreinamentos___" + row).closest(".tableBodyRow").prev().find('input[name*="entidadeSugeridaTbTreinamentos___"]').val() );
				$("#mesPrevistoTbTreinamentos___" + row).val( $("#mesPrevistoTbTreinamentos___" + row).closest(".tableBodyRow").prev().find('select[name*="mesPrevistoTbTreinamentos___"]').val() );
				$("#estimativaTbTreinamentos___" + row).val( $("#estimativaTbTreinamentos___" + row).closest(".tableBodyRow").prev().find('input[name*="estimativaTbTreinamentos___"]').val() );
				$("#cargaHorariaTbTreinamentos___" + row).val( $("#cargaHorariaTbTreinamentos___" + row).closest(".tableBodyRow").prev().find('input[name*="cargaHorariaTbTreinamentos___"]').val() );
				$("#valorGastoTbTreinamentos___" + row).attr("readonly", true);
				$("#valorGastoTbTreinamentos___" + row).css({
					"pointer-events": "none",
					"touch-action": "none"
				});
				$("#statsTbTreinamentos___" + row).attr("readonly", true);
				$("#statsTbTreinamentos___" + row).css({
					"pointer-events": "none",
					"touch-action": "none"
				});
				$(".qtdeParticipanteTbTreinamentos").each(function () {
					updateAutoCompleteWithLimit(this);
				});
				$(".statusTbTreinamentos").each(function () {
					var currentStatus = $(this);
					if (currentStatus.val() == "REALIZADO" || currentStatus.val() == "CANCELADO")
						disableAutoCompleteField(currentStatus);
				});
				// Atualizar somatórias
				updateQtdeTotal();
				updateCargaHorariaTotal();
				updateEstimativaTotal();
				if (activity == 24) {
					calculaSaldo();
				}
				var inputs = $("[mask]");
				MaskEvent.initMask(inputs);
			}
		});

		/**
		 *  @description Trava valores negativos no campo de quantidade de participantes e atualiza 
		 *  quantidade máxima de tags no campo seguinte (participantes)
		 */
		$('div#treinamentos').on('change', 'tbody input[name^="qtdeParticipanteTbTreinamentos___"]', function () {
			if (parseInt(this.value) < 0)
				this.value = 0;
			updateQtdeTotal();
			updateAutoCompleteWithLimit(this);
		});

		$('div#treinamentos').on('change', 'tbody input[name^="cargaHorariaTbTreinamentos___"]', function () {
			if (parseInt(this.value) < 0)
				this.value = 0;
			updateCargaHorariaTotal();
		});

		//  Deletar um participante na lista de presença do treinamento
		$('div#treinamentos').on('mousedown', 'i.fluigicon-trash', function () {
			fnWdkRemoveChild(this);
			// Atualizar somatórias
			updateQtdeTotal();
			updateCargaHorariaTotal();
			updateEstimativaTotal();
			if (activity == 24) {
				calculaSaldo();
			}
		});
	}

	if (activity == 24 || activity == 26 || activity == 30 || activity == 35) {
		if ( modo != "VIEW" ) {
			calculaSaldo();
			updateEstimativaTotal();
		}
		
		if (activity == 24) {
			$(".statusTbTreinamentos").each(function () {
				var self = this;
				if ($(this).val() == "CANCELADO" || $(this).val() == "REALIZADO") {
					disableAutoCompleteField($(self));
					$(self).closest(".tableBodyRow").find(".btn-delete").remove();
				}
			});
			if ($("#previous_activity").val() == 35) {
				$('.tableHeadRow .tableColumn:nth-last-child(1)').css("display", "table-cell");
				$('.tableBodyRow td:nth-last-child(1)').css("display", "table-cell");
				$('.tableHeadRow .tableColumn:nth-last-child(2)').css("display", "table-cell");
				$('.tableBodyRow td:nth-last-child(2)').css("display", "table-cell");
			}
		}
	}

	if (activity == 35) {
		$('.statusTbTreinamentos').on('change', function () {
			atualizaEstimativaStatus($(this));
		});
		$(".statusTbTreinamentos").each(function () {
			atualizaEstimativaStatus($(this));
		});
		$('.valorGastoTbTreinamentos').on('change', function () {
			calculaSaldo();
			updateGastoTotal();
		});
		$('.valorGastoTbTreinamentos').each(function () {
			if ($(this).val() != "") {
				var statusField = $(this).closest('.fs-v-align-middle').next().find('select');
				if (statusField.val() == "REALIZADO" || statusField.val() == "CANCELADO") {
					$(this).attr('readonly', true);
				}
			}
		});

		$("input[name='atualizarPlanejamento']").on('change', function(){
			var _self = $(this);
			if ( $(this).val() == "Não" ){
				FLUIGC.message.confirm({
					message: 'Deseja realmente não atualizar o planejamento antes de finalizar?',
					title: 'Finalizar Planejamento',
					labelYes: 'Sim',
					labelNo: 'Não'
				}, function(result, el, ev) {
					if (!result) {
						_self.attr('checked', false);
					}
				});
			}
		});
	}

	if ( modo == 'VIEW' ) {
		var currentVal = $( "option:selected", $("#departamento") );
		$("#departamento > option").each(function() {
			if ( this.value != currentVal.val() ){
				$(this).remove();
			}
		});
	}


	/** Fim - Life Cycle */
});





/**
 *  @description Funções utilizadas durante o ciclo de vida do form.
 */

function expandTextarea(id) {
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

function loadCalendar(obj, data) {
	var pkDate = false,
		pkTime = false,
		pkMinutes = false;

	if (data == 'date') {
		pkDate = true;

		FLUIGC.calendar('#' + obj.id, {
			pickDate: pkDate,
			pickTime: pkTime,
			useMinutes: pkMinutes,
			useSeconds: false,
			useCurrent: true,
			minuteStepping: 1,
			minDate: '1/1/2010',
			maxDate: '1/1/2215',
			showToday: true,
			language: 'pt-br',
			defaultDate: "",
			disabledDates: arrayDates(),
			useStrict: false,
			sideBySide: false,
			daysOfWeekDisabled: [0]
		});
	} else if (data == 'hour') {
		pkTime = true;
		pkMinutes = true;
		FLUIGC.calendar('#' + obj.id, {
			pickDate: pkDate,
			pickTime: pkTime,
		});
	}
}

function arrayDates() {
	var date = new Date();
	var day = date.getDate() - 1;
	var month = date.getMonth() + 1;
	var ano = date.getFullYear();
	var arrayDate = [];

	for (var i = ano; i > 2009; i--) {
		var months = (i > ano - 1) ? month : 12;
		for (var j = months; j > 0; j--) {
			var days = (i > ano - 1) && month == j ? day : 31;
			for (var k = days; k > 0; k--) {
				var dayFinish = k < 10 ? '0' + k : k;
				var monthFinish = j < 10 ? '0' + j : j;
				arrayDate.push(dayFinish + '/' + monthFinish + '/' + i);
			}
		}
	}
	return arrayDate;
}

function converteParaFloat(variavel) {
	if (variavel == "") {
		return parseFloat(0);
	}
	if (variavel.indexOf("R$") > -1) {
		variavel = variavel.replace("R$ ", "");
	}
	while (variavel.indexOf(".") != -1) {
		variavel = variavel.replace(".", "");
	}

	return parseFloat(variavel.replace(",", "."));
}

/**
 * @description Detalhe dos parametros
 * @param n  número a converter
 * @param c  numero de casas decimais
 * @param d  separador decimal
 * @param t  separador milhar
 */
function numeroParaMoeda(n, c, d, t) {
	//no final de cada linha é virgula mesmo, pois todas as variaveis sao do mesmo tipo
	c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

// Retorna a data do dia 
function getToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	return {
		"date": dd + '/' + mm + '/' + yyyy,
		"day": dd,
		"month": mm,
		"year": yyyy
	};
}

/**
 *  @description Atualiza a somatorias do campo carga horária
 *  Caso o status do treinamento for cancelado, ele desconsidera a o campo
 * 	no cálculo final.
 */
function updateCargaHorariaTotal() {
	var qtdeTotal = 0;
	var elementos = $(".cargaHorariaTbTreinamentos");
	$.each(elementos, function () {
		var status = $(this).closest(".tableBodyRow").find("select[name*='statsTbTreinamentos___']").val();
		if (status != "CANCELADO") {
			qtdeTotal += parseInt(this.value ? this.value : 0);
		}
	});
	$('#totalCargaHoraria').val(qtdeTotal);
}

/**
 *  @description Atualiza a somatorias do campo quantidade de participantes
 *  Caso o status do treinamento for cancelado, ele desconsidera a quantidade de participantes
 * 	no cálculo final.
 */
function updateQtdeTotal() {
	var qtdeTotal = 0;
	var elementos = $(".qtdeParticipanteTbTreinamentos");
	$.each(elementos, function () {
		var status = $(this).closest(".tableBodyRow").find("select[name*='statsTbTreinamentos___']").val();
		if (status != "CANCELADO") {
			qtdeTotal += parseInt(this.value ? this.value : 0);
		}
	});
	$('#totalQtdParticipantes').val(qtdeTotal);
}
/**
 * @description Atualiza o valor total da estimativa de treinamentos.
 * Caso o status do treinamento for cancelado, ele desconsidera o campo
 * no cálculo final.
 */
function updateEstimativaTotal() {
	var estimativaTotal = 0;
	var current;
	var elementos = $(".estimativaTbTreinamentos");
	var status;
	$.each(elementos, function () {
		current = converteParaFloat(this.value);
		status = $(this).closest(".fs-v-align-middle").next().next().find('select').val();
		current = status == "CANCELADO" ? current * -1 : current;
		estimativaTotal += current < current * -1 ? 0 : current;
	});
	$('#totalEstimativa').val(numeroParaMoeda(estimativaTotal));
}
/**
 * @description Realiza a somatória da coluna de total gasto.
 */
function updateGastoTotal() {
	var totalGasto = 0;
	var current;
	var elementos = $(".valorGastoTbTreinamentos");
	$.each(elementos, function () {
		current = converteParaFloat(this.value);
		totalGasto += current < 0 ? 0 : current;
	});
	$('#totalGasto').val(numeroParaMoeda(totalGasto));
}

/**
 * 	@description Atualiza os campos de autocomplete e esconde os campos de autocomplete gerados 
 *  automaticamente quando os campos hidden são criados e limita o número de tags
 *  baseado na quantidade de participantes definida no campo anterior.
 */

function updateAutoCompleteWithLimit(element) {
	var autoCompleteFieldId = $(element).closest(".fs-v-align-middle").next().find('input').attr('id');
	var maxTag = $(element).val() == "" ? "0" : $(element).val();
	var autoComplete = FLUIGC.autocomplete("#" + autoCompleteFieldId);
	autoComplete.destroy();
	autoComplete = FLUIGC.autocomplete("#" + autoCompleteFieldId, {
		maxTags: maxTag,
		onMaxTags: function (item, tag) {
			if ($(element).val() != ""){
				if (!($(".alert-danger").length > 0)) {
					FLUIGC.toast({
						message: 'Limite de participantes atingido.',
						type: 'danger'
					});
				}
			} else {
				return false;
			}
		}
	});
	/**
	 * @description Máscara para o campo de Nome(apenas letras) - Matrícula(apenas número).
	 * 
	 */
	autoComplete.input().on("blur", function(){
		$(".alert-danger").remove();
	});
	autoComplete.input().on("keypress", function (e) {
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
	});

	$.each($(".bootstrap-tagsinput"), function () {
		$(this).next().css("display", "none");
		if ($(this).prev().attr('type') == "hidden") {
			$(this).css("display", "none");
		}
	});
}

/**
 *  @description Desabilita o campo de autocomplete quando for necessário
 * 	@param element - Qualquer elemento da linha da tabela que será desabilitada o campo 
 * 	de autoComplete(Nomes dos participantes dos treinamentos)
 */
function disableAutoCompleteField(element) {
	/*$.each($(element).closest(".tableBodyRow").find(".bootstrap-tagsinput"), function () {
		var textWithComma = $(element).closest(".tableBodyRow").find(".matriculasNomesTbTreinamentos").val();
		var textWithSpace = textWithComma.replace(/,/g, '\n');
		$(element).closest(".tableBodyRow").find(".matriculasNomesTbTreinamentosView").text(textWithSpace);
		$(this).remove();
	});*/
	$(".bootstrap-tagsinput").remove();
}
// Calcula saldo

function calculaSaldo() {
	var somatoriaDespesas = 0;
	var fieldValorGastoValue = 0;
	var fieldValorEstimativaValue = 0;
	var fieldStatusValue = "";
	$('.valorGastoTbTreinamentos').each(function () {
		fieldStatusValue = $(this).closest(".fs-v-align-middle").next().find('select').val();
		fieldValorGastoValue = $(this).val();
		fieldValorEstimativaValue = converteParaFloat($(this).closest(".fs-v-align-middle").prev().find('input').val());
		fieldValorEstimativaValue = fieldStatusValue == "CANCELADO" ? 0 : fieldValorEstimativaValue;
		somatoriaDespesas += fieldValorGastoValue == "0,00" || fieldValorGastoValue == "" ? fieldValorEstimativaValue :
			converteParaFloat(fieldValorGastoValue);
	});
	var valorOrcamento = converteParaFloat($("#orcamento").val());
	var saldo = valorOrcamento - somatoriaDespesas;
	var saldoInput = $("#saldo");
	saldo < 0 ? saldoInput.css("color", "red") : saldoInput.css("color", "#000");
	saldoInput.val(numeroParaMoeda(saldo));
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
function atualizaEstimativaStatus(combo) {
	var currentValorEstimativa, estimativa, comboValue;
	//obtém o valor da estimativa
	currentValorEstimativa = combo.closest(".fs-v-align-middle").prev().prev().find('input');
	//obtém o valor gasto no treinamento
	currentValorGasto = combo.closest(".fs-v-align-middle").prev().find('input');
	comboValue = combo.val();
	if (comboValue == "") {
		combo.removeClass("has-success has-error");
		combo.css("background-color", "#fff");
		estimativa = converteParaFloat(currentValorEstimativa.val());
		estimativa = estimativa < 0 ? estimativa * -1 : estimativa;
		// zera o valor de total gasto do treinamento.
		currentValorGasto.val(numeroParaMoeda(0));
		currentValorGasto.attr('readonly', true);
	} else if (comboValue == "REALIZADO") {
		combo.addClass("has-success");
		combo.removeClass("has-error");
		combo.css("background-color", "rgba(27, 195, 27, 0.25)");
		currentValorGasto.attr('readonly', false);
		estimativa = converteParaFloat(currentValorEstimativa.val());
		estimativa = estimativa < 0 ? estimativa * -1 : estimativa;
	} else if (comboValue == "CANCELADO") {
		combo.addClass("has-error");
		combo.removeClass("has-success");
		combo.css("background-color", "rgba(213, 49, 47, 0.25)");
		// zera o valor de total gasto do treinamento.
		currentValorGasto.val(numeroParaMoeda(0));
		currentValorGasto.attr('readonly', true);
		estimativa = converteParaFloat(currentValorEstimativa.val());
	}
	setTimeout(function () {
		currentValorEstimativa.val(numeroParaMoeda(estimativa));
		updateEstimativaTotal();
		updateQtdeTotal();
		updateCargaHorariaTotal();
		calculaSaldo();
		updateGastoTotal();
	}, 300);
}

//Histórico

function expandTextarea(id) {
	var objTextArea = document.getElementById(id);

	if (objTextArea.scrollHeight > objTextArea.offsetHeight) {
		objTextArea.rows += 1;

	}
}

function mostraHistorico() {
	var historico = 'historico';
	document.getElementById(historico).style.display = 'inline';
	expandTextarea(historico);
}

//Fim do histórico

// método do campo zoom de departamentos
function setSelectedZoomItem(selectedItem) {  
	if (selectedItem.inputName == 'departamento') { 
		if (event.type != 'load') {
			$("#responsavelDepartamento").val(selectedItem.responsavel);
			$("#matResponsavelDepartamento").val(selectedItem.matResponsavel);
			$("#siglaDepartamento").val(selectedItem.sigla);
			$("#guardaDpto").val( selectedItem.segmentoExecutivo );
			$("#numeroOrcamentarioDepartamento").val(selectedItem.numeroOrcamentario);
			//Verifica se existe ficha aberta para o segmento/departamento selecionado.
			var existeDepartamento = hasDepartamentoPlanejamentoThisYear(selectedItem.segmentoExecutivo,$("#anoVigencia").val());
			//Caso exista, é disparado um aviso e limpa os campos.
			if ( existeDepartamento ) {
				FLUIGC.message.alert({
					message: 'Já existe um planejamento de treinamentos anuais para este Segmento.',
					title: selectedItem.segmentoExecutivo,
					label: 'OK'
				}, function(el, ev) {
					$('[data-field-name=departamento] [data-role=remove]').trigger('click');
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
			$("#guardaArea").val( selectedItem.areaOrcamento );
			/**
			 * Seta o filtro para o zoom de departamentos, para filtrar todos os segmentos/departamentos
			 * relacionados a área selecionada especificamente.
			 */
			reloadZoomFilterValues( 'departamento','areaOrcamento,' + $("#guardaArea").val() );
		}
		$('[data-field-name="areaOrcamento"] [data-role=remove]').on('click', function(){
			cleanAllFieldsRelatedArea();
		});
	}
	/**
	 * @description Limpa todos os campos de controle e seta o filtro do campo zoom de departamentos para não retornar nenhum valor.
	 */
	function cleanAllFieldsRelatedArea() {
		$('[data-field-name="departamento"] [data-role=remove]').trigger('click');
		$("#responsavelDepartamento").val("");
		$("#matResponsavelDepartamento").val("");
		$("#siglaDepartamento").val("");
		$("#numeroOrcamentarioDepartamento").val("");
		$("#guardaArea").val("");
		reloadZoomFilterValues( 'departamento','areaOrcamento,areaOrcamento' );
	}
}

function updateClassificacaoTreinamentosCountFields() {
	var treinamentos = $("#treinamentos table tbody tr.tableBodyRow:not(:first-child)");
	var qtdeAprimoramento = 0, qtdeLegislacao = 0, qtdeProjeto = 0;
	$(treinamentos).each(function( i , e ){
		var classificacao = $(e).find("select[name*='classificacaoTbTreinamentos___']").val();
		var status = $(e).find("select[name*='statsTbTreinamentos___']").val();
		if ( status != "CANCELADO") {
			if ( classificacao == "legislacao_obrigatorio" ) {
				qtdeLegislacao++;
			}
			if ( classificacao == "projeto_implantacao" ) {
				qtdeProjeto++;
			}
			if ( classificacao == "aprimoramento_profissional" ) {
				qtdeAprimoramento++;
			}
		}
	});
	$("#fato_4").val(qtdeProjeto);
	$("#fato_5").val(qtdeLegislacao);
	$("#fato_6").val(qtdeAprimoramento);
}


/** SERVICES */

/**
 * @deprecated - Este método não é mais utilizado desde que foi implementado o zoom no campo de departamentos.
 * @returns {object[]} - Array de departamentos.
 * @description - Retorna objeto com todos os departamentos do dataset.
 * 
 */
function getDepartamentosService() {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var data = DatasetFactory.getDataset("cadastro_departamento", ["CodDepartamento", "departamento",
		"matResponsavelDpto", "responsavelDpto"
	], [c1], ["departamento"]);
	var departamentos = [];
	var objValor = {};
	for (var i = 0; i < data.values.length; i++) {
		objValor = {
			cod_dpto: data.values[i]["CodDepartamento"],
			dpto: data.values[i]["departamento"],
			mat_responsavel_dpto: data.values[i]["matResponsavelDpto"],
			responsavel_dpto: data.values[i]["responsavelDpto"]
		};
		departamentos.push(objValor);
	}
	return departamentos;
}
/**
 * @deprecated - Este método não é mais utilizado desde que foi implementada a tarefa automática
 * para setar o valor do orçamento ao processo.
 * @param {int} processID - número do processo a ser pesquisado
 * @param {int} anoVigencia - ano de vigência do processo a ser pesquisado
 * @description - Retorna o valor do orçamento para o planejamento correspondente ao processID informado.
 */
function getOrcamento(processID, anoVigencia) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("processState", "CANCELADO", "CANCELADO", ConstraintType.MUST_NOT);
	var c3 = DatasetFactory.createConstraint("orcamentoAprovadoGGR", "Sim", "Sim", ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("anoVigencia", anoVigencia, anoVigencia, ConstraintType.MUST);
	var consulta1 = DatasetFactory.getDataset('cadastro_orcamentos', null, [c1, c2, c3, c4], ['documentid']);
	var index = consulta1.values.length - 1;
	if (index > -1) {
		var c5 = DatasetFactory.createConstraint("tablename", 'orcamentos', 'orcamentos', ConstraintType.MUST);
		var consulta2 = DatasetFactory.getDataset('cadastro_orcamentos', null, [c1, c5], null);
		for (var i = 0; i < consulta2.values.length; i++) {
			if (parseInt(consulta2.values[i].numeroSolicitacaoTbOrcamentos) == parseInt(processID)) {
				return consulta2.values[i].orcamentoTbOrcamentos;
			}
		}
	}
	return "";
}
/**
 * 
 * @param {string} departamento - Nome do departamento.
 * @param {int} ano - Ano de vigência do planejamento.
 * @return {boolean} - 'true' caso haja um planejamento do departamento informado no ano vigênte informado, 
 * retorna 'false' caso contrário.
 * @description - Verifica se existe um planejamento para o departamento no ano vigente informado.
 */
function hasDepartamentoPlanejamentoThisYear(departamento, ano) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("departamento", departamento, departamento, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("anoVigencia", ano, ano, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("processState", "CANCELADO", "CANCELADO", ConstraintType.MUST_NOT);
	var c5 = DatasetFactory.createConstraint("numProcess", getProcess(), getProcess(), ConstraintType.MUST_NOT);
	var dataset = DatasetFactory.getDataset('propor_treinamentos_anuais', null, [c1, c2, c3, c4,c5], ['documentid']);
	if (dataset.values.length > 0) {
		return true;

	}
	return false;
}
