function enableFields(form) {
    /*form.setEnabled('lotacao',false, true);
    form.setEnabled('departamento',false, true);
    disableListaTreinamentos(form);
    disableListaAvaliacoesReacao(form);
    disableListaAvaliacoesEficacia(form);*/
}

function disableListaTreinamentos (form) {
    var list = form.getChildrenIndexes("treinamentos_realizados");
    for (var i = 0; i < list.length; i++) {
        form.setEnabled("titulo_do_treinamento_tb1___"+list[i],false, true);
        form.setEnabled("classificacao_treinamento_tb1___"+list[i],false, true);
        form.setEnabled("planejamento_anual_tb1___"+list[i],false, true);
        form.setEnabled("justificativa_treinamento_tb1___"+list[i],false, true);
        form.setEnabled("instituicao_treinamento_tb1___"+list[i],false, true);
        form.setEnabled("carga_horaria_tb1___"+list[i],false, true);
        form.setEnabled("ano_realizacao_tb1___"+list[i],false, true);
    }
}

function disableListaAvaliacoesReacao (form) {
    var list = form.getChildrenIndexes("treinamentos_realizados");
    for (var i = 0; i < list.length; i++) {
        form.setEnabled("titulo_do_treinamento_tb2___"+list[i],false, true);
        form.setEnabled("ano_realizacao_tb2___"+list[i],false, true);
        form.setEnabled("data_inicio_tb2___"+list[i],false, true);
        form.setEnabled("data_termino_tb2___"+list[i],false, true);
        form.setEnabled("avaliacao_media_tb2___"+list[i],false, true);
    }
}

function disableListaAvaliacoesEficacia (form) {
    var list = form.getChildrenIndexes("treinamentos_realizados");
    for (var i = 0; i < list.length; i++) {
        form.setEnabled("titulo_do_treinamento_tb3___"+list[i],false, true);
        form.setEnabled("ano_realizacao_tb3___"+list[i],false, true);
        form.setEnabled("data_inicio_tb3___"+list[i],false, true);
        form.setEnabled("data_termino_tb3___"+list[i],false, true);
    }
}