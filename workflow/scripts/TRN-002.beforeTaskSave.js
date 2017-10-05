function beforeTaskSave(colleagueId,nextSequenceId,userList){
    var atividade = getValue('WKNumState');

	if( getValue("WKCompletTask") == "true" ){
		atualizaHistorico("obsHistorico");
        log.info("HISTÓRICO ATUALIZADO");
	} else {
        log.info("HISTÓRICO NÃO ATUALIZADO");
    }


    if ( ( atividade == 20 && hAPI.getCardValue("treinamentoAprovadoGGR") == "Sim" ) && hAPI.getCardValue("processState") != "EXECUCAO_OK") {
        setState("OK");
    }
    
    if ( atividade == 22 ) {
        var numProcess = hAPI.getCardValue("numProcess");
        var year = hAPI.getCardValue("anoVigencia");
        var orcamento = getOrcamentoByNumProcessAndYear(numProcess, year);
        if ( orcamento == "") {
            log.info("NAO EXISTE ORCAMENTO PARA ESTA SOLICITACAO");
            hAPI.setCardValue("orcamento", orcamento);
            throw ("Aguardar disponibilidade orçamentária");
        }
    }

    if ( atividade == 37 && hAPI.getCardValue("atualizarPlanejamento") != "Sim" ) {
        setState("FINALIZADO");
    }

}

function setState(state) {
    hAPI.setCardValue("processState", state);
}

function atualizaHistorico(name) {
    if( name == "" ){
        return;
    }
    var mensagem = hAPI.getCardValue(name);

    if(mensagem == null || mensagem == ""){
        return;
    }

    var ultimaAtualizacao = hAPI.getCardValue("ultimaAtualizacao") == "" ? " " : hAPI.getCardValue("ultimaAtualizacao");
    var historico = hAPI.getCardValue("historico")== "" ? " " : hAPI.getCardValue("historico");
    
    var usuarioLogado = "";
    try {
        usuarioLogado = usuario();
    } catch(err){
        usuarioLogado = "Erro ao buscar usuário";
    }

    var htmlHistoricoNovo = dataHoraAtual()+" - "+usuarioLogado+"  \r\n" + mensagem +"\r\n \r\n";
    
    hAPI.setCardValue("ultimaAtualizacao", htmlHistoricoNovo );           
    hAPI.setCardValue("historico", ultimaAtualizacao + historico );
    hAPI.setCardValue(name, "" );
}


function dataHoraAtual() {
    var dt = new Date();
    var txtData = (dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate()) + "/" + ((dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1)) + "/" + dt.getFullYear() + " - " + (dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()) + ":" + (dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes());
    return txtData;
}


function usuario(){
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",getValue("WKUser"),getValue("WKUser"),ConstraintType.MUST);
    var dsUser = DatasetFactory.getDataset("colleague",["colleagueName"],[c1],null);
    return dsUser.getValue(0,"colleagueName");
}

/**
 * @param {int} - Número do processo
 * @param {int} - Ano de vigência do planejamento
 * @returns {string} - String vazia caso não haja um orçamento para o processo no ano informado
 * @description - verifica se existe um orçamento para um determinado processo no ano vigente informado.
 */
function getOrcamentoByNumProcessAndYear(numProcess, anoVigencia) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true,ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("processState", "CANCELADO", "CANCELADO",ConstraintType.MUST_NOT);
    var c3 = DatasetFactory.createConstraint("orcamentoAprovadoGGR", "Sim", "Sim", ConstraintType.MUST); 
    var c4 = DatasetFactory.createConstraint("anoVigencia", anoVigencia, anoVigencia, ConstraintType.MUST); 
    var consulta1 = DatasetFactory.getDataset('cadastro_orcamentos',null,[c1,c2,c3,c4],['documentid']);
    var index = consulta1.values.length - 1;
    //if (index > -1) { 
    if (index == -1) { 
        /*var c5 = DatasetFactory.createConstraint("tablename", 'orcamentos', 'orcamentos',ConstraintType.MUST); 
        var consulta2 = DatasetFactory.getDataset('cadastro_orcamentos',null,[c1,c5],null);
        for (var i = 0; i < consulta2.values.length; i++) {
            if ( consulta2.values[i].numeroSolicitacaoTbOrcamentos == processID ) {
                return consulta2.values[i].orcamentoTbOrcamentos;
            }
        }
    }*/
    return "";
    }
}