"use strict";
// IIFE - Immediately Invoked Function Expression
(function (init) {

	init(window.jQuery, window, document);

}(function ($, window, document) {
	//  DOM Ready!
	$(lifecycle.init);

}));

/**
 * @description Função externa que faz interface com o módulo de zoomfields, é executada a cada
 * interação com qualquer campo zoom do formulário.
 * @param selectedItem objeto zoom que foi modificado no formulário
 */
/*function setSelectedZoomItem(selectedItem) {
	manipulateDOM.zoomFields.eventZoom(selectedItem);
}*/