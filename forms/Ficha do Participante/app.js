"use strict";
// IIFE - Immediately Invoked Function Expression
(function ($, window, document) {
	/** The $ is now locally scoped 
	Listen for the jQuery ready event on the document */
	$(lifecycle.init);

}(window.jQuery, window, document));


/**
 * @description Função externa que faz interface com o módulo de zoomfields, é executada a cada
 * interação com qualquer campo zoom do formulário.
 * @param selectedItem objeto zoom que foi modificado no formulário
 */
function setSelectedZoomItem(selectedItem) {
	manipulateDOM.zoomFields.eventZoom(selectedItem);
}
