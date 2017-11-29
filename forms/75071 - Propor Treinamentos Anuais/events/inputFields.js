function inputFields(form) {
    var activity = parseInt(getValue('WKNumState'));
    var numProcess = getValue("WKNumProces");
    
    form.setValue('campoDescritor', form.getValue('departamento'));
    form.setValue('custom_0', form.getValue('areaOrcamento'));
    form.setValue('custom_1', form.getValue('departamento'));
    form.setValue("numProcess", numProcess);
/*     if ( activity != 0 ) {
        form.setValue("numProcess", numProcess);
    }

    if ( activity == 12 || activity == 18 || activity == 24 || activity == 35 ) {
        switch(activity) {
            case 12:
                    form.setValue( 'fato_0', parseInt( form.getValue('totalQtdParticipantes') ) );
                    form.setValue( 'fato_1', converteParaFloat( form.getValue('totalEstimativa') ) );
                    form.setValue( 'fato_2', converteParaFloat( form.getValue('totalCargaHoraria') ) );
                    form.setValue( 'fato_8', converteParaFloat( form.getValue('orcamento') ) );
                    break;
            case 18:
                    form.setValue( 'fato_0', parseInt( form.getValue('totalQtdParticipantes') ) );
                    form.setValue( 'fato_1', converteParaFloat( form.getValue('totalEstimativa') ) );
                    form.setValue( 'fato_2', converteParaFloat( form.getValue('totalCargaHoraria') ) );
                    form.setValue( 'fato_8', converteParaFloat( form.getValue('orcamento') ) );
                    break;
            case 24:
                    form.setValue( 'fato_0', parseInt( form.getValue('totalQtdParticipantes') ) );
                    form.setValue( 'fato_1', converteParaFloat( form.getValue('totalEstimativa') ) );
                    form.setValue( 'fato_2', converteParaFloat( form.getValue('totalCargaHoraria') ) );
                    form.setValue( 'fato_8', converteParaFloat( form.getValue('orcamento') ) );
                    break;
            case 35:
                    form.setValue( 'fato_0', parseInt( form.getValue('totalQtdParticipantes') ) );
                    form.setValue( 'fato_1', converteParaFloat( form.getValue('totalEstimativa') ) );
                    form.setValue( 'fato_2', converteParaFloat( form.getValue('totalCargaHoraria') ) );
                    form.setValue( 'fato_3', converteParaFloat( form.getValue('totalGasto') ) );
                    form.setValue( 'fato_8', converteParaFloat( form.getValue('orcamento') ) );
                    form.setValue( 'fato_7', converteParaFloat( form.getValue('totalGasto') ) / parseFloat( form.getValue('totalQtdParticipantes') ) );
                    break;
        }
    } */
    form.setValue( 'fato_0', parseInt( form.getValue('totalQtdParticipantes') ) );
    form.setValue( 'fato_1', converteParaFloat( form.getValue('totalEstimativa') ) );
    form.setValue( 'fato_2', converteParaFloat( form.getValue('totalCargaHoraria') ) );
    form.setValue( 'fato_3', converteParaFloat( form.getValue('totalGasto') ) );
    form.setValue( 'fato_8', converteParaFloat( form.getValue('orcamento') ) );
    form.setValue( 'fato_7', converteParaFloat( form.getValue('totalGasto') ) / parseFloat( form.getValue('totalQtdParticipantes') ) );
}
if (!String.prototype.includes) {
    String.prototype.includes = function() {'use strict';
      return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
  }

function converteParaFloat(variavel) {
	if (variavel == "") {
		return parseFloat(0);
	}
	if (variavel.includes("R$") == true) {
		variavel = variavel.replace("R$ ", "");
	}
	while (variavel.includes(".") == true) {
		variavel = variavel.replace(".", "");
	}

	return parseFloat(variavel.replace(",", "."));
}