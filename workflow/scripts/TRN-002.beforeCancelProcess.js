function beforeCancelProcess(colleagueId, processId){
    // Seta o estado do processo como 'CANCELADO' no registro, antes de cancelar o processo.
    hAPI.setCardValue("processState", "CANCELADO");
}
