var servicesModule = (function(){
    "use strict";

    var constraintActive = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    
    var constraintFilterFactory = function(columnName, columnValue) {

        if (columnName == "participante") {
            var constraint = DatasetFactory.createConstraint(columnName, columnValue, columnValue, ConstraintType.MUST);
            return constraint;
        }

        if (columnName == "matricula") {
            var constraint = DatasetFactory.createConstraint(columnName, columnValue, columnValue, ConstraintType.MUST);
            return constraint;
        
        }
        return null;
    };
 
    var consultas = {

        getParticipanteData: function(filterConstraint) {
            var participanteData = DatasetFactory.getDataset("participante_x_treinamento", null, [constraintActive, filterConstraint], null);
            if (participanteData.values) {
                if (participanteData.values.length > 0) {
                    return participanteData.values;
                }
            }
            return [];
        },

        getTreinamentos: function(filterConstraint) {
            var tablename = DatasetFactory.createConstraint("tablename", "treinamentos_realizados", "treinamentos_realizados", ConstraintType.MUST);
            var participantePrincipal = DatasetFactory.getDataset("participante_x_treinamento", null, [constraintActive, filterConstraint], null);
            if (participantePrincipal.values) {
                if (participantePrincipal.values.length > 0) {
                    var docId = participantePrincipal.values[0].documentid;
                    var docIdConstraint = DatasetFactory.createConstraint("documentid", docId, docId,ConstraintType.MUST);
                    var participanteTreinamentos = DatasetFactory.getDataset("participante_x_treinamento", null, [tablename, docIdConstraint], null);
                    if (participanteTreinamentos.values) {
                        if (participanteTreinamentos.values.length > 0) {
                            return participanteTreinamentos.values;
                        }
                    }
                }
            }
            return [];
        },

        getAvaliacoesReacao: function(filterConstraint) {
            var tablename = DatasetFactory.createConstraint("tablename", "avaliacoes_reacao", "avaliacoes_reacao", ConstraintType.MUST);
            var participantePrincipal = DatasetFactory.getDataset("participante_x_treinamento", null, [constraintActive, filterConstraint], null);
            if (participantePrincipal.values) {
                if (participantePrincipal.values.length > 0) {
                    var docId = participantePrincipal.values[0].documentid;
                    var docIdConstraint = DatasetFactory.createConstraint("documentid", docId, docId,ConstraintType.MUST);
                    var participanteAvaliacoesReacao = DatasetFactory.getDataset("participante_x_treinamento", null, [tablename, docIdConstraint], null);
                    if (participanteAvaliacoesReacao.values) {
                        if (participanteAvaliacoesReacao.values.length > 0) {
                            return participanteAvaliacoesReacao.values;
                        }
                    }
                }
            }
            return [];
        },

        getAvaliacaoEficacia: function(filterConstraint) {
            var tablename = DatasetFactory.createConstraint("tablename", "avaliacoes_eficacia", "avaliacoes_eficacia", ConstraintType.MUST);
            var participantePrincipal = DatasetFactory.getDataset("participante_x_treinamento", null, [constraintActive, filterConstraint], null);
            if (participantePrincipal.values) {
                if (participantePrincipal.values.length > 0) {
                    var docId = participantePrincipal.values[0].documentid;
                    var docIdConstraint = DatasetFactory.createConstraint("documentid", docId, docId,ConstraintType.MUST);
                    var participanteAvaliacoesEficacia = DatasetFactory.getDataset("participante_x_treinamento", null, [tablename, docIdConstraint], null);
                    if (participanteAvaliacoesEficacia.values) {
                        if (participanteAvaliacoesEficacia.values.length > 0) {
                            return participanteAvaliacoesEficacia.values;
                        }
                    }
                }
            }
            return [];
        }
    };

    return {
        constraintFilterFactory: constraintFilterFactory,
        consultas: consultas
    }
})();