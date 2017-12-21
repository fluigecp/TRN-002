function validaCampos(atividade, proximaAtividade) {
	if ( atividade == 0 || atividade == 4) {
		addHasFree('departamento');
		addHasFree('areaOrcamento');
		addHasFree('anoVigencia');
		var today = new Date();
		var yyyy = today.getFullYear();
		var anoVigencia = $("#anoVigencia").val();
		if ( parseInt(anoVigencia) < parseInt(yyyy) ) {
			throw ("Favor informar um ano válido.");
		}
		$(".btn-default").on("click", function(){
			console.log("BTN CLICKED!!!");
		});
		
		var dep = $("#departamento").closest(".input-group").find("span.tag-text").text();
		var hasPlan = servicesModule.hasDepartamentoPlanejamentoThisYear(dep, $("#anoVigencia").val());
		if (hasPlan) {
			throw("Já existe um planejamento de treinamentos anuais para este Segmento.");
		}
		
	}

	if ( atividade == 12 || atividade == 24 ) {
		addHasFreeTable2('input', 'treinamentoTbTreinamentos', 1);
		addHasFreeTable2('select', 'classificacaoTbTreinamentos', 1);
		addHasFreeTable2('textarea', 'justificativaTbTreinamentos', 1);
		addHasFreeTable2('input', 'qtdeParticipanteTbTreinamentos', 1);
		addHasFreeTable2('input', 'matriculasNomesTbTreinamentos', 1);
		addHasFreeTable2('input', 'entidadeSugeridaTbTreinamentos', 1);
		addHasFreeTable2('select', 'mesPrevistoTbTreinamentos', 1);
		addHasFreeTable2('input', 'cargaHorariaTbTreinamentos', 1);
		addHasFreeTable2('input', 'estimativaTbTreinamentos', 1);
		var regCount = $("#treinamentos table tbody tr.tableBodyRow:not(:first)").length;
		if (regCount < 1) {
			addHasFree('obsHistorico');
		}
		var tagControlFields = $("input[name*=tagControl___]");
		var errorString = "";
		$.each(tagControlFields, function (indexInArray, valueOfElement) { 
			if ( getValue( valueOfElement.name ) != "Sim" ) {
				var treinamentoName = $("#" + valueOfElement.name).closest(".tableBodyRow").find("[name*=treinamentoTbTreinamentos___]").val();
				errorString += "Número de participantes insuficientes no treinamento " + treinamentoName + "\n";
			}	 
		});
		if ( errorString != "" ) {
			throw(errorString);
		}
	}

	if ( atividade == 14 ) {
		addHasFree('treinamentoAprovado');
		if ( getValue('treinamentoAprovado') == "Não" || getValue('treinamentoAprovado') == "Cancelar" ){
			addHasFree('obsHistorico');
		}
	}

	if ( atividade == 18 ) {
		addHasFree('treinamentoAprovadoGGR');
		if ( getValue('treinamentoAprovadoGGR') == "Não" || getValue('treinamentoAprovadoGGR') == "Cancelar" ){
			addHasFree('obsHistorico');
		}
	}

	if ( atividade == 22 ) {
		if ( $("#orcamento").val() == "" ) {
			throw ("Aguardar disponibilidade orçamentária");
		}
	}

	if ( atividade == 24 ) {
		var saldo = $('#saldo').val();
		if (saldo == "") {saldo = parseFloat(0);}
		if (saldo.indexOf("R$") > -1) {saldo = saldo.replace("R$ ", "");}
		while (saldo.indexOf(".") != -1) {saldo = saldo.replace(".", "");}
		saldo = parseFloat(saldo.replace(",", "."));
		if (saldo < 0) {
			throw ("Despesas superiores ao orçamento. Ajuste para prosseguir.");
		}
		$("#previous_activity").val("");
	}

	if ( atividade == 26 ) {
		addHasFree('planejamentoAprovadoRH');
		if ( getValue('planejamentoAprovadoRH') == "Não" ){
			addHasFree('obsHistorico');
		}
	}
	
	if ( atividade == 30 ) {
		addHasFree('planejamentoAprovadoGGR');
		if ( getValue('planejamentoAprovadoGGR') == "Não" ){
			addHasFree('obsHistorico');
		}
	}

	if ( atividade == 35 ) {
		addHasFreeTable2('input','valorGastoTbTreinamentos', 1);
		var atualizarPlanejamento = $("input[name='atualizarPlanejamento']:checked");
		var treinamentosCancelados = [];
		var blankStats = false;
		$('.statusTbTreinamentos:not(:first)').each(function () {
			// Obtem os treinamentos que foram cancelados e ainda não foram justificados
			if ( $(this).val() == "CANCELADO" && $(this).next().val() == 'NAO') {
				var treinamentoCancelado = $(this).closest(".tableBodyRow").find("input[name*='treinamentoTbTreinamentos___']").val();
				if ($('#obsHistorico').val() != "")
					$(this).next().val('SIM');
				treinamentosCancelados.push(treinamentoCancelado);
			}

			if ( $(this).val() == "" ) {
				blankStats = true;
			}
		});

		if (!blankStats) {
			addHasFree("atualizarPlanejamento");
		}
		/* Caso exista treinamentos cancelados e não justificados, impossibilitar a saida
		 da atividade sem justificativa no campo de observações. */

		if ( treinamentosCancelados.length > 0 ) {
			var txtErro = "Favor justificar os cancelamentos no campo de observações:\n";
			for (var i = 0; i < treinamentosCancelados.length; i++) {
				txtErro += "\n"+"&#x9;"+treinamentosCancelados[i];
			}
			if ($('#obsHistorico').val() == "")
				throw (txtErro);
		}

		if ( atualizarPlanejamento.val() == "Não" ){
			addHasFreeTable2('select', 'statsTbTreinamentos', 1);
		}

		// Justificar ao término da execução do planejamento, caso o saldo total ficar negativo.
		var saldo = numbersAndCurrency.convert.currencyStringToFloat($("#saldo").val());
		if (saldo < 0 || atualizarPlanejamento.val() != "Sim") {
			addHasFree('obsHistorico');
		}
		$("#previous_activity").val(atividade);
		
	}
}
