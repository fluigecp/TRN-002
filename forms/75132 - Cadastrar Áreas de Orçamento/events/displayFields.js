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
    
    if ( modo == 'VIEW' ) {
        ocultaId('add-departamento');
		ocultaClasse('btn-delete');
		ocultaClasse('lixeira');
		ocultaClasse('lixeiraTbAreaOrcamento')
    }   
}
