function displayFields(form,customHTML) {
	var activity = getValue('WKNumState');
	form.setShowDisabledFields(true);
	var modo = form.getFormMode();
	customHTML.append("<script>");
	customHTML.append("function getAtividade(){return '" + getValue('WKNumState') + "'};");
	customHTML.append("function getFormMode(){return '" + form.getFormMode() + "'};");
	customHTML.append("function getGestor(){return '" + getValue('WKManagerMode') + "'};");
	customHTML.append("function getProcess(){return '" + getValue('WKNumProces') + "'};");
	customHTML.append("</script>");
	  
	function oculta(variavel){        
		customHTML.append('<script>                                       ');
		customHTML.append('$(\'[name="'+variavel+'"]\').css(\'display\', \'none\');                      ');
		customHTML.append('$([name="'+variavel+'"]).parent().css(\'display\', \'none\');                                     ');
		customHTML.append('var closers = $([name="'+variavel+'"]).closest(\'.form-field\').find(\'input, textarea, select, table\');');
		customHTML.append('var hideDiv = true;                                                                               ');
		customHTML.append('$.each(closers, function(i, close) {                                                              ');
		customHTML.append('  if (close.style.display != \'none\') {                                                          ');
		customHTML.append('    hideDiv = false;                                                                              ');
		customHTML.append('  }                                                                                               ');
		customHTML.append('});                                                                                               ');
		customHTML.append('                                                                                                  ');
		customHTML.append('if (hideDiv == true) {                                                                            ');
		customHTML.append('  $([name="'+variavel+'"]).closest(\'.form-field\').css(\'display\', \'none\');                   ');
		customHTML.append('}                                                                                                 ');
		customHTML.append('$(\'[name="'+variavel+'"]\').closest(".form-field").hide();                                       ');
		customHTML.append('</script>                                       ');
	}

	function ocultaClasse(classe){
		customHTML.append('<script>');
		customHTML.append('$(\'.'+classe+'\').css(\'display\', \'none\')');
		customHTML.append('</script>');
	}
	function ocultaId(id){
		customHTML.append('<script>');
		customHTML.append('$(\'#'+id+'\').css(\'display\', \'none\')');
		customHTML.append('</script>');
	}
	/**
	 * Validações no modo de Visualização
	 */


	if ( activity == 0 || activity == 4 ) {
		ocultaClasse('aprovacoesTreinamentoRH');
		ocultaClasse('aprovacoesTreinamentoGerencia');
		ocultaClasse('aprovacoesPlanejamentoRH');
		ocultaClasse('aprovacoesPlanejamentoGerencia');
		ocultaClasse('condicoesOrcamentarias');
		ocultaClasse('treinamentosContainer');
		ocultaClasse('atualizarPlanejamentoContainer');
		ocultaId('add-treinamento');
		ocultaId('replicar-treinamento');
    }
	else if (activity == 12) {
		if (form.getValue("treinamentoAprovado") != "Não")
			ocultaClasse('aprovacoesTreinamentoRH');
		if (form.getValue("treinamentoAprovadoGGR") != "Não")
			ocultaClasse('aprovacoesTreinamentoGerencia');
		ocultaClasse('aprovacoesPlanejamentoRH');
		ocultaClasse('aprovacoesPlanejamentoGerencia');
		ocultaClasse('condicoesOrcamentarias');
		ocultaClasse('atualizarPlanejamentoContainer');
		// Oculta a penútima e a última coluna da tabela
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(1)');
		ocultaClasse('tableBodyRow td:nth-last-child(1)');
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(2)');
		ocultaClasse('tableBodyRow td:nth-last-child(2)');
		//Oculta total valor gasto
		ocultaClasse('totalGastoContainer');
		if (modo != "VIEW"){
			ocultaClasse('matriculasNomesTbTreinamentosView');
		}
	}
	else if (activity == 14) {
		ocultaClasse('aprovacoesTreinamentoGerencia');
		ocultaClasse('aprovacoesPlanejamentoRH');
		ocultaClasse('aprovacoesPlanejamentoGerencia');
		ocultaClasse('condicoesOrcamentarias');
		ocultaClasse('btn-delete');
		ocultaId('add-treinamento');
		ocultaId('replicar-treinamento');
		ocultaClasse('atualizarPlanejamentoContainer');
		// Oculta a penútima e a última coluna da tabela
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(1)');
		ocultaClasse('tableBodyRow td:nth-last-child(1)');
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(2)');
		ocultaClasse('tableBodyRow td:nth-last-child(2)');
		//Oculta total valor gasto
		ocultaClasse('totalGastoContainer');
	}
	else if (activity == 18) {
		ocultaClasse('aprovacoesTreinamentoRH');
		ocultaClasse('aprovacoesPlanejamentoRH');
		ocultaClasse('aprovacoesPlanejamentoGerencia');
		ocultaClasse('condicoesOrcamentarias');
		ocultaId('add-treinamento');
		ocultaId('replicar-treinamento');
		ocultaClasse('btn-delete');
		ocultaClasse('atualizarPlanejamentoContainer');
		// Oculta a penútima e a última coluna da tabela
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(1)');
		ocultaClasse('tableBodyRow td:nth-last-child(1)');
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(2)');
		ocultaClasse('tableBodyRow td:nth-last-child(2)');
		//Oculta total valor gasto
		ocultaClasse('totalGastoContainer');
	}
	else if (activity == 22) {
		ocultaClasse('aprovacoesPlanejamentoRH');
		ocultaClasse('aprovacoesPlanejamentoGerencia');
		ocultaId('add-treinamento');
		ocultaId('replicar-treinamento');
		ocultaClasse('btn-delete');
		ocultaClasse('atualizarPlanejamentoContainer');
		// Oculta a penútima e a última coluna da tabela
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(1)');
		ocultaClasse('tableBodyRow td:nth-last-child(1)');
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(2)');
		ocultaClasse('tableBodyRow td:nth-last-child(2)');
		//Oculta total valor gasto
		ocultaClasse('totalGastoContainer');
		// Oculta saldo final
		ocultaClasse('saldoFinalContainer');
	}
	else if (activity == 24) {
		ocultaClasse('aprovacoesTreinamentoRH');
		ocultaClasse('aprovacoesTreinamentoGerencia');
		if (form.getValue("planejamentoAprovadoRH") != "Não")
			ocultaClasse('aprovacoesPlanejamentoRH');
		if (form.getValue("planejamentoAprovadoGGR") != "Não")
			ocultaClasse('aprovacoesPlanejamentoGerencia');
		ocultaClasse('atualizarPlanejamentoContainer');
		// Oculta a penútima e a última coluna da tabela
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(1)');
		ocultaClasse('tableBodyRow td:nth-last-child(1)');
		ocultaClasse('tableHeadRow .tableColumn:nth-last-child(2)');
		ocultaClasse('tableBodyRow td:nth-last-child(2)');
		//Oculta total valor gasto
		ocultaClasse('totalGastoContainer');
		// Oculta saldo final
		ocultaClasse('saldoFinalContainer');
		// Oculta total estimado
		ocultaId("tabTotalEstimadoQtde");
		if (modo != "VIEW"){
			ocultaClasse('matriculasNomesTbTreinamentosView');
		}
	}
	else if (activity == 26) {
		ocultaClasse('aprovacoesTreinamentoRH');
		ocultaClasse('aprovacoesTreinamentoGerencia');
		ocultaClasse('aprovacoesPlanejamentoGerencia');
		ocultaId('add-treinamento');
		ocultaClasse('btn-delete');
		ocultaId('replicar-treinamento');
		ocultaClasse('atualizarPlanejamentoContainer');
		ocultaId("tabTotalEstimadoQtde");
		//Oculta total valor gasto
		ocultaClasse('totalGastoContainer');

	}

	else if (activity == 30 || activity == 35 || activity == 40 || modo == "VIEW") {
		ocultaId('add-treinamento');
		ocultaId('replicar-treinamento');
		ocultaClasse('btn-delete');
		ocultaClasse('aprovacoesTreinamentoRH');
		ocultaClasse('aprovacoesTreinamentoGerencia');
		ocultaClasse('aprovacoesPlanejamentoRH');
		ocultaId('tabTotalEstimadoQtde');
		if (activity == 30 ){
			ocultaClasse('atualizarPlanejamentoContainer');
			ocultaId("tabTotalEstimadoQtde");
			//Oculta total valor gasto
			ocultaClasse('totalGastoContainer');
		} else {
			ocultaClasse('aprovacoesPlanejamentoGerencia');
			if ( activity == 40 ) {
				ocultaClasse('atualizarPlanejamentoContainer');
			}
		}
	} else if ( activity == 42 ) {
		ocultaClasse('aprovacoesTreinamentoRH');
		ocultaClasse('aprovacoesTreinamentoGerencia');
		ocultaClasse('aprovacoesPlanejamentoGerencia');
		ocultaClasse('aprovacoesPlanejamentoRH');
		ocultaClasse('atualizarPlanejamentoContainer');
	}

	if ((activity != 12 && activity != 24) || modo == 'VIEW') {
		ocultaClasse('lixeira');
		ocultaClasse('lixeiraTbTreinamentos');
		ocultaClasse("matriculasNomesTbTreinamentos");
		ocultaClasse("btn-insert");
		ocultaClasse("participanteFluigContainer");
		ocultaClasse("funcionariosAtivosContainer");
	}

	if ( modo == 'VIEW' ) {
		form.setShowDisabledFields(false);
		ocultaClasse("obsHistoricoContainer");
	}

	if ( activity == 51 ) {
		ocultaClasse("obsHistoricoContainer");
		ocultaClasse("condicoesOrcamentarias");
		ocultaClasse('aprovacoesTreinamentoRH');
		ocultaClasse('aprovacoesTreinamentoGerencia');
		ocultaClasse('aprovacoesPlanejamentoGerencia');
		ocultaClasse('aprovacoesPlanejamentoRH');
		ocultaClasse('atualizarPlanejamentoContainer');
		ocultaId("tabTotalEstimadoQtde");
		//Oculta total valor gasto
		ocultaClasse('totalGastoContainer');
		ocultaClasse('saldoFinalContainer');
	}

	/** Life Cycle */
    

}
