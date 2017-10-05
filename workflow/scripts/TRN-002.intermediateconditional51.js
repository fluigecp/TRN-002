function intermediateconditional51() {
	/**
	 *  Caso o planejamento possua um orçamento aprovado, a execução do 
	 * 	processo avança para a próxima etapa.
	 */
	if ( hAPI.getCardValue("processState") == "EXECUCAO_OK" ) {
		return true;
	}
	return false;
}