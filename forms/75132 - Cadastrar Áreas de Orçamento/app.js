

$(document).ready(function() {
	//main functions
	//var departamentos = getDepartamentosService();
	$('button#add-departamento').on('click', function () {
		var row = wdkAddChild('area_orcamento');
		var inputsMasks = $("[mask]");
		MaskEvent.initMask(inputsMasks);
	});


	$('div#area_orcamento').on('mousedown', 'i.fluigicon-trash', function () {
		fnWdkRemoveChild(this); 
	});

});

function setSelectedZoomItem(selectedItem) {  
	rowIndex = selectedItem.inputId.substr(selectedItem.inputId.length - 4);
	$("#matResponsavelDepartamento"+rowIndex).val(selectedItem.colleagueId);
}

function atualizarDepartamento (el) {
	var currentOpt = $("option:selected", el);
	var codDpto = currentOpt.attr('data_cod_dpto');
	var mat_responsavel = currentOpt.attr('data_mat_responsavel');
	var responsavel = currentOpt.attr('data_responsavel');
	$(el).closest('.tableBodyRow').find('input[name^="codDepartamento___"]').val(codDpto);
	$(el).closest('.tableBodyRow').find('input[name^="matResponsavelDepartamento___"]').val(mat_responsavel);
	$(el).closest('.tableBodyRow').find('input[name^="responsavelDepartamento___"]').val(responsavel);
};

/** SERVICES */

/**
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