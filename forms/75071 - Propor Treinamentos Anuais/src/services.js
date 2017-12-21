/**
 * @module servicesModule
 */

var servicesModule = (function(){
    "use strict";
    /**
     * @param {string} departamento - Nome do departamento.
     * @param {int} ano - Ano de vigência do planejamento.
     * @return {boolean} - 'true' caso haja um planejamento do departamento informado no ano vigênte informado, 
     * retorna 'false' caso contrário.
     * @description - Verifica se existe um planejamento para o departamento no ano vigente informado.
     */
    var hasDepartamentoPlanejamentoThisYear = function(departamento, ano) {
        var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("departamento", departamento, departamento, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("anoVigencia", ano, ano, ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint("processState", "CANCELADO", "CANCELADO", ConstraintType.MUST_NOT);
        var c5 = DatasetFactory.createConstraint("numProcess", getProcess(), getProcess(), ConstraintType.MUST_NOT);
        var dataset = DatasetFactory.getDataset('propor_treinamentos_anuais', null, [c1, c2, c3, c4, c5], ['documentid']);
        if (dataset.values.length > 0) {
            return true;
        }
        return false;
    };

    return {
        hasDepartamentoPlanejamentoThisYear: hasDepartamentoPlanejamentoThisYear
    }

})();
