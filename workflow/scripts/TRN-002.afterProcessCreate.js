function afterProcessCreate(processId){
    log.info("PROCESSO CRIADO");
    var atividade = getValue('WKNumState');
    // Seta o estado do processo como 'ANDAMENTO', depois que o processo é criado.
    hAPI.setCardValue("processState", "ANDAMENTO");
}
