
function createDataset(fields, constraints, sortFields) {
    
    try {
        // VARIABLES    
        var customDataset = DatasetBuilder.newDataset(),
        arrayList = [],
		sqlLimit = false,
		limitReturn = 0,
		listSuport = [],
		filterI = '',
        filterII= '',
        filterStrI= '',
        filterStrII= '',
		filters = [],
        codDepart = '';
        
        //Estrutura do novo dataset
        customDataset.addColumn("documentid");
        customDataset.addColumn("areaOrcamento");
        customDataset.addColumn("sigla");
        customDataset.addColumn("numeroOrcamentario");
        customDataset.addColumn("segmentoExecutivo");
        customDataset.addColumn("responsavel");
        customDataset.addColumn("matResponsavel");


        //Verifica se tem filtros a serem tratados
	   if (constraints !== null && constraints !== undefined && constraints.length > 0) {
			//itera todas as constraints, verifica e configura cada filtro
			for (var index = 0; index < constraints.length; index++) {
                if (constraints[index].fieldName == 'sqlLimit') {
					sqlLimit = true;
					limitReturn = parseInt(constraints[index].initialValue);
				}
                if (constraints[index].fieldName == 'areaOrcamento') {                          
                    filterI = DatasetFactory.createConstraint("areaOrcamento", "%" + constraints[index].initialValue + "%" , "%" + constraints[index].finalValue + "%",  ConstraintType.SHOULD);
					filterI.setLikeSearch(true);
                    filters.push(filterI);
                }
                if(constraints[index].fieldName == 'segmentoExecutivo' || constraints[index].fieldName == 'sigla') {
                    filterStrI = (constraints[index].initialValue).toLowerCase();
                }
            }
        }

        //Verifica se tem filtros configurados
		if (filters.length > 0) {
            //constraint para obter todos os dados do dataset ativos
			var metadata = DatasetFactory.createConstraint("metadata#active",'true','true',  ConstraintType.MUST);
            //obtendo todas as áreas de orçamento em ordem crescente(filtro pelo documentid)
            var areas = DatasetFactory.getDataset('areas_orcamento', null, [filterI, metadata], ['documentid']);
            //obtém o documentid do último elemento para trazer no resultados todos os elementos  que o antecede, inclusive ele mesmo
            var documentid = DatasetFactory.createConstraint("documentid", areas.getValue((areas.rowsCount -1), 'documentid'), areas.getValue((areas.rowsCount -1), 'documentid'),ConstraintType.MUST);
            //constraint para obter a tabela pai-filho do dataset de áreas(no caso, todos os segmentos executivos)
            var tablename = DatasetFactory.createConstraint("tablename", 'area_orcamento', 'area_orcamento', ConstraintType.MUST);	
            //objeto que contém todos os segmentos executivos
            var tableSegmentos = DatasetFactory.getDataset('areas_orcamento',null,[documentid, tablename],null);
            for (var index = 0; index < tableSegmentos.rowsCount; index++) {
                //obtem os valores de departamento e sigla respectivamente na posição de index
                var textReturnI = (tableSegmentos.getValue(index, "departamento")).toLowerCase();
                var textReturnII = (tableSegmentos.getValue(index, "sigla")).toLowerCase();
                //verifica se os valores obtidos acima contém fragmentos da string de filtro 
                var positionI = textReturnI.contains(filterStrI);
                var positionII = textReturnII.contains(filterStrI);
                //se um dos casos acima for verdadeiro, ele adiciona uma linha no dataset de retorno
				if(positionI == true || positionII == true) {

					if (sqlLimit == true && customDataset.rowsCount < limitReturn) {
                        customDataset.addRow(new Array(	areas.getValue((areas.rowsCount -1), 'documentId'), areas.getValue((areas.rowsCount -1), 'areaOrcamento'),
                         tableSegmentos.getValue(index, "sigla"),
                         tableSegmentos.getValue(index, "numeroOrcamentario"),
                         tableSegmentos.getValue(index, "departamento"),
                         tableSegmentos.getValue(index, "responsavelDepartamento"),
                         tableSegmentos.getValue(index, "matResponsavelDepartamento")));
					}else if (sqlLimit == false) {
						customDataset.addRow(new Array(	areas.getValue((areas.rowsCount -1), 'documentId'), areas.getValue((areas.rowsCount -1), 'areaOrcamento'),
                         tableSegmentos.getValue(index, "sigla"),
                         tableSegmentos.getValue(index, "numeroOrcamentario"),
                         tableSegmentos.getValue(index, "departamento"),
                         tableSegmentos.getValue(index, "responsavelDepartamento"),
                         tableSegmentos.getValue(index, "matResponsavelDepartamento")));
					}
				}
			}
        } else { // caso não haja filtros configurados
            //constraint para obter todos os dados do dataset ativos
            var metadata = DatasetFactory.createConstraint("metadata#active",'true','true',  ConstraintType.MUST);
            //obtendo todas as áreas de orçamento em ordem crescente(filtro pelo documentid)
            var areas = DatasetFactory.getDataset('areas_orcamento', null, [metadata], ['documentid']);
            //iteração de todas as áreas
            for (var index = 0; index < areas.rowsCount; index++) {
                //obtém o documentid do último elemento para trazer no resultados todos os elementos  que o antecede, inclusive ele mesmo
                var documentid = DatasetFactory.createConstraint("documentid", areas.getValue(index, 'documentid'), areas.getValue(index, 'documentid'),ConstraintType.MUST);
                //constraint para obter a tabela pai-filho do dataset de áreas(no caso, todos os segmentos executivos)
                var tablename = DatasetFactory.createConstraint("tablename", 'area_orcamento', 'area_orcamento',ConstraintType.MUST);	
                //objeto que contém todos os segmentos executivos
                var tableSegmentos = DatasetFactory.getDataset('areas_orcamento',null,[documentid, tablename],null);
                //caso tenha objetos
                if (tableSegmentos != undefined && tableSegmentos != null) {
                    //iteração de todas as de seguimento, irá retornar todos os elementos, pois não há filtros configurados
                    for (var indice = 0; indice < tableSegmentos.rowsCount; indice++) {
                        if (sqlLimit == true && customDataset.rowsCount < limitReturn) {
                            customDataset.addRow(new Array(	areas.getValue(index, "documentid"), areas.getValue(index, "areaOrcamento"),
                            tableSegmentos.getValue(indice, "sigla"),
                            tableSegmentos.getValue(indice, "numeroOrcamentario"),
                            tableSegmentos.getValue(indice, "departamento"),
                            tableSegmentos.getValue(indice, "responsavelDepartamento"),
                            tableSegmentos.getValue(indice, "matResponsavelDepartamento")));
                        }else if (sqlLimit == false) {
                            customDataset.addRow(new Array(	areas.getValue(index, "documentid"), areas.getValue(index, "areaOrcamento"),
                            tableSegmentos.getValue(indice, "sigla"),
                            tableSegmentos.getValue(indice, "numeroOrcamentario"),
                            tableSegmentos.getValue(indice, "departamento"),
                            tableSegmentos.getValue(indice, "responsavelDepartamento"),
                            tableSegmentos.getValue(indice, "matResponsavelDepartamento")));
                        }
                    }
                }	
			}
        }
        return customDataset;

    } catch(e) {
		log.warn('>>> >>> e.message '+e.message);
	}

}
