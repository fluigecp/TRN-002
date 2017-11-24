function servicetask60(attempt, message) {
	try {
		var numSolicPai = getValue('WKNumProces');

		var documentId = hAPI.getCardValue("documentid");
		log.warn("%%%%%% documentId : " + documentId);

		var servico = ServiceManager.getService("ECMWorkflowEngineService").getBean();
		log.warn("%%%%%% servico : " + servico);

		var locator = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
		log.warn("%%%%%% locator : " + locator);

		var WorkflowEngineService = locator.getWorkflowEngineServicePort();
		log.warn("%%%%%% WorkflowEngineService : " + WorkflowEngineService);

		var username = hAPI.getAdvancedProperty("loginUserWS");
		log.warn("%%%%%% username : " + username);

		var password = hAPI.getAdvancedProperty("passwdUserWS");
		log.warn("%%%%%% password : " + password);

		var companyId = parseInt(getValue("WKCompany"));
		log.warn("%%%%%% companyId : " + companyId);

		var processId = "TRN-006";

		var choosedState = 29;

		var comments = "Solicitação aberta por: Nº " + numSolicPai;
		log.warn("%%%%%% comments : " + comments);

		var userId = hAPI.getAdvancedProperty("matUserWS");
		log.warn("%%%%%% userId : " + userId);

		var completeTask = true;
		log.warn("%%%%%% completeTask : " + completeTask);

		var attachments = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
		log.warn("%%%%%% attachments : " + attachments);

		var appointment = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
		log.warn("%%%%%% appointment : " + appointment);

		var managerMode = false;
		log.warn("%%%%%% managerMode : " + managerMode);

		var novaSolic;

		var colleagueIds = servico.instantiate("net.java.dev.jaxb.array.StringArray");
		colleagueIds.getItem().add('System:Auto');
		log.warn("%%%%%% colleagueIds");

		var fieldsAvaliacao = ["nomeParticipante", "matricula", "area", "cursoTreinamento",
			"instituicao", "cargaHoraria", "avaliadorMat",
			"numSolicTreinamento", "classificacaoCurso", "campoDescritor", "matResponsavelArea", "aberturaAutomatica"
		];

		var fieldsAvaliacaoWithDepartamento = ["area", "cursoTreinamento", "instituicao", "cargaHoraria",
			"numSolicTreinamento", "classificacaoCurso",
			"matResponsavelArea", "aberturaAutomatica"
		];

		var treinamentos = getTreinamentos(documentId);
		var solicitacao = getSolicitacao(documentId);

		for (var index = 0; index < treinamentos.rowsCount; index++) {
			var participantesObj = filterParticipantesObj(treinamentos.getValue(index, "matriculasNomesTbTreinamentos"));
			var classificacao = validateClassificacao(treinamentos.getValue(index, "classificacaoTbTreinamentos"));

			if ( checkIfHasDepartamento(participantesObj) ) {
				var fieldsRequisicaoWithDepartamento = [];
				fieldsRequisicaoWithDepartamento.push( solicitacao.getValue(0, "departamento") + "" );
				fieldsRequisicaoWithDepartamento.push( treinamentos.getValue(index, "treinamentoTbTreinamentos") + "" );
				fieldsRequisicaoWithDepartamento.push( treinamentos.getValue(index, "entidadeSugeridaTbTreinamentos") + "" );
				fieldsRequisicaoWithDepartamento.push( treinamentos.getValue(index, "cargaHorariaTbTreinamentos")  + "" );
				fieldsRequisicaoWithDepartamento.push( numSolicPai + "" );
				fieldsRequisicaoWithDepartamento.push( classificacao + "" );
				fieldsRequisicaoWithDepartamento.push( hAPI.getCardValue("matResponsavelDepartamento") + "" );
				fieldsRequisicaoWithDepartamento.push( "Sim" );
				var qtdeParticipantes = parseInt( treinamentos.getValue(index, "qtdeParticipanteTbTreinamentos") );
				for (var y = 0; y < qtdeParticipantes; y++) {
					var cardData = servico.instantiate("net.java.dev.jaxb.array.StringArrayArray");
					for (var j = 0; j < fieldsAvaliacaoWithDepartamento.length; j++) {
						var objField = servico.instantiate("net.java.dev.jaxb.array.StringArray");
						objField.getItem().add(fieldsAvaliacaoWithDepartamento[j]);
						objField.getItem().add(fieldsRequisicaoWithDepartamento[j]);
						cardData.getItem().add(objField);
					}
					novaSolic = WorkflowEngineService.startProcess(username, password, companyId, processId, choosedState, colleagueIds, comments, userId,
						completeTask, attachments, cardData, appointment, managerMode);
				}

			} else {
				for (var i = 0; i < participantesObj.length; i++) {
					var fieldsPropor = [];
					var responsavelArea = hAPI.getCardValue("matResponsavelDepartamento");
					var camposDescritor = participantesObj[i].nome + " - " + treinamentos.getValue(index, "treinamentoTbTreinamentos");
					var currentMat = responsavelArea;
					if (searchUserMat(participantesObj[i].matricula)) {
						currentMat = participantesObj[i].matricula;
					}
					

					log.warn("%%%%%% classificacao: " + classificacao);
					fieldsPropor.push(participantesObj[i].nome + "");
					fieldsPropor.push(participantesObj[i].matricula + "");
					fieldsPropor.push(solicitacao.getValue(0, "departamento") + "");
					fieldsPropor.push(treinamentos.getValue(index, "treinamentoTbTreinamentos") + "");
					fieldsPropor.push(treinamentos.getValue(index, "entidadeSugeridaTbTreinamentos") + "");
					fieldsPropor.push(treinamentos.getValue(index, "cargaHorariaTbTreinamentos") + "");
					fieldsPropor.push(currentMat + "");
					fieldsPropor.push(numSolicPai + "");
					fieldsPropor.push(classificacao + "");
					fieldsPropor.push(camposDescritor + "");
					fieldsPropor.push(responsavelArea + "");
					fieldsPropor.push("Sim");
					var cardData = servico.instantiate("net.java.dev.jaxb.array.StringArrayArray");
					for (var x = 0; x < fieldsPropor.length; x++) {
						var objField = servico.instantiate("net.java.dev.jaxb.array.StringArray");
						objField.getItem().add(fieldsAvaliacao[x]);
						objField.getItem().add(fieldsPropor[x]);
						cardData.getItem().add(objField);
					}
					novaSolic = WorkflowEngineService.startProcess(username, password, companyId, processId, choosedState, colleagueIds, comments, userId,
						completeTask, attachments, cardData, appointment, managerMode);
				}
		}
		hAPI.setCardValue( treinamentos.getValue(index,"hasAvaliacaoReacaoName"), "SIM");
	}


	} catch (error) {
		log.error(error);
		throw error;
	}
}

/**
 * retorna um array de objetos com nome e matricula de todos os participantes.
 * @param {string} str - Parâmetro string com o nome de todos os participantes, separados com virgula 
 */
function filterParticipantesObj(str) {
	var strArray = str.split(",");
	var participantesObj = [];
	for (var i = 0; i < strArray.length; i++) {
		participantesObj.push({
			nome: strArray[i].substring(strArray[i].indexOf("-") + 2),
			matricula: strArray[i].substring(0, strArray[i].indexOf("-") - 1)
		});
	}
	return participantesObj;
}
/**
 * Verifica se um usuário existe na base de usuários do Fluig
 * @param {string} mat - Matrícula do usuário
 */
function searchUserMat(mat) {
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", mat, mat, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", null, [c1, c2], null);
	if (dataset.values.length > 0) {
		return true;
	}
	return false;
}

/**
 * Verifica se existe departamentos na lista de participantes
 * @param {Object} participantesObj 
 * @returns {Boolean} true, caso haja departamento.
 */
function checkIfHasDepartamento(participantesObj) {
	for (var i = 0; i < participantesObj.length; i++) {
		if (participantesObj[i].matricula == "00000") {
			return true;
		}
	}
	return false;
}

function validateClassificacao(classificacao) {
	if (classificacao == "legislacao_obrigatorio") {
		return "Legislação/Obrigatório";
	}
	if (classificacao == "projeto_implantacao") {
		return "Projeto/implantação";
	}
	if (classificacao == "aprimoramento_profissional") {
		return "Aprimoramento profissional";
	}
	return classificacao;
}

function getTreinamentos(documentId) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentid", documentId, documentId, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("statsTbTreinamentos", "REALIZADO", "REALIZADO", ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("hasAvaliacaoReacao", "NAO", "NAO", ConstraintType.MUST);
	var tablename = DatasetFactory.createConstraint("tablename", "tbTreinamentos", "tbTreinamentos", ConstraintType.MUST);
	var treinamentos = DatasetFactory.getDataset("propor_treinamentos_anuais", null, [c1, c2, c3, c4, tablename], null);
	return treinamentos;
}

function getSolicitacao(documentId) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentid", documentId, documentId, ConstraintType.MUST);
	var solicitacao = DatasetFactory.getDataset("propor_treinamentos_anuais", null, [c1, c2], null);
	return solicitacao;
}