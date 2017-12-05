function createDataset(fields, constraints, sortFields) {

	log.warn("%%% +++++++ INICIANDO CONSULTA AO WS DE FUNCIONARIOS");
 
	var dataset = DatasetBuilder.newDataset();
 	try {

 		log.warn("%%% +++++++ VOU PEGAR O SERVICO");

 		//Serviço https://portalecp.ecp.org.br/Consulta/v20/ws/Consulta.asmx?WSDL
	    var serviceHelper = ServiceManager.getServiceInstance('WSPortalECP');
		var XMLL = serviceHelper.instantiate("org.json.XML");
		var JSONN = serviceHelper.instantiate("org.json.JSONObject");
	    //o objeto ConsultaSoap é o que tem as funcoes do servico: alteraSenha, consultaHelp, recuperarSenha e executarConsulta
	    log.warn("%%% +++++++ VOU INSTANCIAR ConsultaSoap");
	    var serviceLocator = serviceHelper.instantiate("org.tempuri.ConsultaFluig");
	    var consultaSoap = serviceLocator.getConsultaFluigSoap();

	    //Instanciando o objeto de Autenticacao que deve ir no <soapenv:Header>
		log.warn("%%% +++++++ VOU INSTANCIAR Authentication");
	    var authentication = serviceHelper.instantiate('org.tempuri.AuthenticationFluig');
	    authentication.setUser("fluig");
	    authentication.setPassword("Planejamento123*");

	    // Adicionando o SoapHeader via CXF
	    var headers = new java.util.ArrayList();
	    var authenticationHeader = new org.apache.cxf.headers.Header( new javax.xml.namespace.QName("http://tempuri.org/",
		"Authentication"), authentication, new org.apache.cxf.jaxb.JAXBDataBinding(authentication.getClass()));
     	headers.add( authenticationHeader );

     	org.apache.cxf.frontend.ClientProxy.getClient(consultaSoap).getRequestContext()
     		.put(org.apache.cxf.headers.Header.HEADER_LIST, headers);

	    //Esse objeto é para identificar se o que eu quero buscar é Funcionarios ou Atletas
	    log.warn("%%% +++++++ VOU INSTANCIAR ExecucaoConsulta");
		var execucaoConsulta = serviceHelper.instantiate('org.tempuri.ExecucaoConsulta');
		var parametros = serviceHelper.instantiate('org.tempuri.ArrayOfConsultaParametro');
	    execucaoConsulta.setConsulta("Funcionarios");
	    //execucaoConsulta.setConsulta("Atletas");
	    
		// Setando um parametro e filtros
		if(constraints != null){
			for(var c in constraints){
				if(constraints[c].fieldName != 'sqlLimit'){
					log.warn("%%% +++++++ constraints[c].fieldName" + constraints[c].fieldName);
					var parametro = serviceHelper.instantiate('org.tempuri.ConsultaParametro');
					parametro.setParametro(constraints[c].fieldName);
					parametro.setValor(constraints[c].initialValue);
					parametros.getConsultaParametro().add(parametro);
				}
			}
		}
	    	
    	execucaoConsulta.setParametros(parametros);

	    // Execução
	    var executarConsultaResponse = consultaSoap.executarConsulta(authentication, execucaoConsulta);

	    log.warn("%%% +++++++ RETORNOU ISSO: "+executarConsultaResponse);

	    // Retorno é um tipo complexo(XML), tem que tratar antes de adicionar no dataset
	    // Exemplo tratando com as classes Java
	    // Nesse caso retorna uma lista contendo a classe org.apache.xerces.dom.ElementNSImpl no Java
	    if (!executarConsultaResponse.getContent().isEmpty()) {
			dataset.addColumn("nome");
			dataset.addColumn("matricula");
			dataset.addColumn("lotacao");
			dataset.addColumn("situacao");
			
	    	// Retornando um NodeList com os funcionarios
			var funcionariosOBJ = XMLL.toJSONObject(executarConsultaResponse.getContent().get(0)).toString();
			log.warn("%%% +++++++ funcionariosOBJ: "+funcionariosOBJ);
			//funcionariosOBJ.kfjgdf();
			var funcionarios = JSON.parse(funcionariosOBJ);
			var funcionariosLinhas = funcionarios["Funcionarios"]["Linha"];
			if ( funcionariosLinhas != undefined ) {
				log.warn("%%% +++++++ existe funcionariosLinhas");
				if ( funcionariosLinhas.length != undefined ) {
					log.warn("%%% +++++++ existe prop length funcionariosLinhas");
					if (funcionariosLinhas.length > 0) {
							log.warn("%%% +++++++ existe prop length funcionariosLinhas > 0");
							for (var i = 0; i < funcionariosLinhas.length; i++) {
								var datasetRow = new Array();
								datasetRow.push(funcionariosLinhas[i]["Nome"]);
								datasetRow.push(funcionariosLinhas[i]["Chapa"]);
								datasetRow.push(funcionariosLinhas[i]["Lotacao"]);
								datasetRow.push(funcionariosLinhas[i]["Situacao"]);
								dataset.addRow(datasetRow);
							}
						
					} 
				} else {
					// Quando retorna apenas 1 registro, ele vem fora de um array, logo a propriedade length é undefined
					var datasetRow = new Array();
					datasetRow.push(funcionariosLinhas.Nome);
					datasetRow.push(funcionariosLinhas.Chapa);
					datasetRow.push(funcionariosLinhas.Lotacao);
					datasetRow.push(funcionariosLinhas.Situacao);
					dataset.addRow(datasetRow);
				}
			}
		}
	} catch (erro) {
		log.error("%%% +++++++ ERRO NO wsFuncionarios: "+erro.message);
		dataset.addColumn('Erro');
	    dataset.addRow(new Array(erro.message));
	}
    return dataset;


}