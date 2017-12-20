/** Global Variables */
var activity = 0,
    modo = '',
    currentLocation = '';

/**
 * @module Lifecycle
 */
var lifecycle = (function () {
    "use strict";
    /**
     * @description Função de inicialiazação do ciclo de vida do processo.
     */
    var init = function () {
        _setup();
        _logActivityInformation();
        _control();
    };
    /**
     * @description Função que inicializa as variáveis globais que serão utilizadas ao longo do
     * ciclo de vida do processo.
     */
    var _setup = function () {
        activity = getAtividade();
        modo = getFormMode();
        currentLocation = document.location.origin;
    };
    /**
     * @description Dispara um log da atividade.
     */
    var _logActivityInformation = function () {
        console.log("Activity: ", activity);
        console.log("Modo: ", modo);
    };
    /**
     * @description Controla o ciclo de vida e os eventos do processo
     */
    var _control = function () {     
        /** Início - Life Cycle */
        if (activity == 0 || activity == 4) {

        }
        // Rotinas padronizadas
        if (activity == 12 || activity == 14 || activity == 18 || activity == 22 || activity == 24 ||
            activity == 26 || activity == 30 || activity == 35 || activity == 40) {

            if (activity != 12 && activity != 24) {

            }

            if (activity == 14) {

            }

            if (activity == 18) {

            } 

            if (activity == 22) {

            } 

            if (activity == 26) {

            } 

            if (activity == 30) {

            } 

            if (activity == 35) {

            }

            if (activity > 35) {

            }
        }


        if (activity == 12 || activity == 24) {

        }

        if (activity == 24 || activity == 26 || activity == 30 || activity == 35) {
            if (modo != "VIEW") {

            }

            if (activity == 24) {

            }

        }

        if (activity == 35) {

        }

        if (modo == 'VIEW') {

        }

        /** Fim - Life Cycle */
    
    };

    return {
        init: init
    }
})();