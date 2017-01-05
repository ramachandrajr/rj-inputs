/*
 * InputList is 
 */
var InputList = function() {
	this.name = "InputList";
};



/*
 * $input is a name space creator function for this library.
 */

window.$input = function(window, document, cssSelector) {

	try {
		// 'cssSelector' VALIDATION.
		if ( !(cssSelector && String.prototype.toLowerCase.call(typeof cssSelector) === "string") && !(cssSelector && Array.isArray(cssSelector) === true) && cssSelector !== undefined ) throw new Error("Invalid argument to '$input'");

	} catch(e) {
		console.warn(e);
	}

	return new InputList();

}.bind(null, window, document);