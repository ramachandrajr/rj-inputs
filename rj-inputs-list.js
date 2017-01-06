/*
 * InputList Object constructor function.
 */

var InputList = function(n) {
	this.nodeList = n;
	this.values = [];
	this.length = this.nodeList.length;

	// Populate values.
	for (let i = 0; i < this.length; i++) {
		this.values.push(this.nodeList[i].value);
	}

	
};

/*
 * This functions compares the values with regexes and 
 * returns false even if one of those regex fail.
 *
 * @params o {Object} Contains all required data for validation
 */


/*
	o = {
		regex: RegExp,
		cb: undefined || Function,
		arg: String,
		multiArgs: Array
	}
*/

InputList.prototype.validate = function(o) {
	try {

		/* Dealing with the object param */
		// FAILURE CHECK
		// regex
		if ( o === undefined || 
			 o.regex === undefined ||
			 (
			 	!(o.regex && Array.isArray(o.regex) && o.regex.length === this.length) &&
			 	!(o.regex && (typeof o.regex).toLowerCase() === "string")
			 ) 
	 	   ) throw new Error("Invalid arguments at method 'validate'!");
		// cb
		if (o.cb !== undefined && o.cb !== null && typeof o.cb !== "function") throw new Error("Invalid callback function at 'validate' method!");
		// arg
		if (o.arg !== undefined && o.arg !== null && typeof o.arg !== "string") throw new Error("Invalid 'arg' value at 'validate'!")
		// singleArgs
		if (o.multiArgs !== undefined && o.multiArgs !== null && !(Array.isArray(o.multiArgs) === true && o.multiArgs.length === this.length)) throw new Error("Length of 'singleArgs' not equal to number of selected inputs"); 
		/* object param check end */

		// SINGLE REGEX
		if (typeof o.regex === "string") {
			for (let i = 0; i < this.length; i++) {
				let pattern = new RegExp(o.regex);
				if (pattern.test(this.values[i]) === false) {
					// arg
					if (o.cb !== undefined && o.arg !== undefined && o.arg !== null) {
						o.cb(o.arg);
					}
					// multiArgs
					else if (o.cb !== undefined && o.multiArgs !== undefined && o.multiArgs !== null && Array.isArray(o.multiArgs)) {
						o.cb(o.multiArgs[i]);
					}
					throw new Error("One of the input's validated to false!");
				}
			}
			return this;
		} 
		// MULTI REGEX
		else if (Array.isArray(o.regex) === true) {
			for (let i = 0; i < this.length; i++) {
				let pattern = new RegExp(o.regex[i]);
				if (pattern.test(this.values[i]) === false) {
					// arg
					if (o.cb !== undefined && o.arg !== undefined && o.arg !== null) {
						o.cb(o.arg);
					}
					// multiArgs
					else if (o.cb !== undefined && o.multiArgs !== undefined && o.multiArgs !== null && Array.isArray(o.multiArgs)) {
						o.cb(o.multiArgs[i]);
					}
					throw new Error("One of the input's validated to false!");
				}
			}
			return this;
		}


	} catch(e) {
		console.error(e);
		return false;
	}
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

	return new InputList(document.querySelectorAll(cssSelector));

}.bind(null, window, document);