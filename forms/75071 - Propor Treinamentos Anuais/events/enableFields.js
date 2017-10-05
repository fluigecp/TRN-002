function enableFields(form) {
	var activity = getValue('WKNumState');
    
    /** Life Cycle */


    if ( activity == 12 || activity == 14 || activity == 18 || activity == 22 || activity == 24 || activity == 26
     || activity == 30 || activity == 35 || activity == 40 ) {
        form.setEnabled('dataAbertura',false, true);
        form.setEnabled('departamento',false, true);
        form.setEnabled('areaOrcamento',false, true);
        form.setEnabled('anoVigencia',false, true);
        if ( activity != 12 && activity != 24 ) {
            disableListaTreinamentos(true);
        }

        if ( activity != 22 ){ 
            form.setEnabled('orcamento',false, true);
        }
    }

    if ( activity != 35 ) {
        disableTotalAndStatus();
    }

    if (activity == 12) {
        if (form.getValue("treinamentoAprovado") == "Não")
            form.setEnabled('treinamentoAprovado',false, true);
        if (form.getValue("treinamentoAprovadoGGR") == "Não")
            form.setEnabled('treinamentoAprovadoGGR',false, true);
    }

    if (activity == 18 ) {
        form.setEnabled('treinamentoAprovado', false, true);
    }

    if ( activity == 22 ) {
        form.setEnabled('treinamentoAprovado',false, true);
        form.setEnabled('treinamentoAprovadoGGR',false, true);
    }

    if ( activity == 24 ) {
        form.setEnabled('treinamentoAprovado',false, true);
        form.setEnabled('treinamentoAprovadoGGR',false, true);
        form.setEnabled('orcamento',false, true);
        if (form.getValue("planejamentoAprovadoRH") == "Não")
            form.setEnabled('planejamentoAprovadoRH',false, true);
        if (form.getValue("planejamentoAprovadoGGR") == "Não")
            form.setEnabled('planejamentoAprovadoGGR',false, true);
        disableTreinamentosValidados();
    }

    if ( activity == 26) {
        form.setEnabled('treinamentoAprovado',false, true);
        form.setEnabled('treinamentoAprovadoGGR',false, true);
        form.setEnabled('orcamento',false, true);
    }

    if ( activity == 30 ) {
        form.setEnabled('treinamentoAprovado',false, true);
        form.setEnabled('treinamentoAprovadoGGR',false, true);
        form.setEnabled('planejamentoAprovadoRH',false, true);
        form.setEnabled('orcamento',false, true);
    }

    if ( activity == 35 ) {
        form.setEnabled('treinamentoAprovado',false, true);
        form.setEnabled('treinamentoAprovadoGGR',false, true);
        form.setEnabled('planejamentoAprovadoRH',false, true);
        form.setEnabled('planejamentoAprovadoGGR',false, true);
        form.setEnabled('orcamento',false, true);
        disableTreinamentosValidados();
    }

    if ( activity == 40 ) {
        form.setEnabled('treinamentoAprovado',false, true);
        form.setEnabled('treinamentoAprovadoGGR',false, true);
        form.setEnabled('planejamentoAprovadoRH',false, true);
        form.setEnabled('planejamentoAprovadoGGR',false, true);
        form.setEnabled('orcamento',false, true);
        form.setEnabled('atualizarPlanejamento',false, true);
        //disableListaTreinamentos(false);
        disableTreinamentosValidados();
    }


   

    /**
     * Desabilita table de lista de treinamentos
     */

    function disableListaTreinamentos (disableStatus) {
        var list = form.getChildrenIndexes("tbTreinamentos");
        for (var i = 0; i < list.length; i++) {
            form.setEnabled("treinamentoTbTreinamentos___"+list[i],false, true);
            form.setEnabled("classificacaoTbTreinamentos___"+list[i],false, true);
            form.setEnabled("justificativaTbTreinamentos___"+list[i],false, true);
            form.setEnabled("qtdeParticipanteTbTreinamentos___"+list[i],false, true);
            form.setEnabled("cargaHorariaTbTreinamentos___"+list[i],false, true);
            form.setEnabled("matriculasNomesTbTreinamentos___"+list[i],false, true);
            form.setEnabled("entidadeSugeridaTbTreinamentos___"+list[i],false, true);
            form.setEnabled("mesPrevistoTbTreinamentos___"+list[i],false, true);
            form.setEnabled("estimativaTbTreinamentos___"+list[i],false, true);
            if (!disableStatus) 
                form.setEnabled("statsTbTreinamentos___"+list[i],false, true);
        }
    }

    /**
     * Desabilita treinamentos já validados
     */
    function disableTreinamentosValidados () {
        var list = form.getChildrenIndexes("tbTreinamentos");
        for (var i = 0; i < list.length; i++) {
            var status = form.getValue("statsTbTreinamentos___"+list[i]);
            if (status == "REALIZADO" || status == "CANCELADO") {
                form.setEnabled("treinamentoTbTreinamentos___"+list[i],false, true);
                form.setEnabled("classificacaoTbTreinamentos___"+list[i],false, true);
                form.setEnabled("justificativaTbTreinamentos___"+list[i],false, true);
                form.setEnabled("qtdeParticipanteTbTreinamentos___"+list[i],false, true);
                form.setEnabled("cargaHorariaTbTreinamentos___"+list[i],false, true);
                form.setEnabled("matriculasNomesTbTreinamentos___"+list[i],false, true);
                form.setEnabled("entidadeSugeridaTbTreinamentos___"+list[i],false, true);
                form.setEnabled("mesPrevistoTbTreinamentos___"+list[i],false, true);
                form.setEnabled("estimativaTbTreinamentos___"+list[i],false, true);
                form.setEnabled("valorGastoTbTreinamentos___"+list[i],false, true);
                form.setEnabled("statsTbTreinamentos___"+list[i],false, true);
            }   
        }
    }

    function disableTotalAndStatus() {
        var list = form.getChildrenIndexes("tbTreinamentos");
        for (var i = 0; i < list.length; i++) {
            form.setEnabled("valorGastoTbTreinamentos___"+list[i],false, true);
            form.setEnabled("statsTbTreinamentos___"+list[i],false, true);
        }
    }
    

}