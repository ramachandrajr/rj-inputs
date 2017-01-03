/*
 * Input constructor function.
 */
var Input = function(node) {
	this.node = node;
	this.value = this.node.value;
};



/*
 * InputList constructor function. The objects with this constructor hold
 * all the methods necessary for user accessing variables inside a node list.
 *
 * @params inputsArr {Array} An array of list objects
 */
var InputList = function(nodes, inputsArr) {
	this.nodes = nodes;
	this.inputs = inputsArr;
	this.values = [];
	this.length = this.nodes.length;
};


// PROTOTYPES

/*
 * This method executes the given callback once per array element.
 * 
 * @params cb {function} Callback to execute per array element.
 * return {Array} An array containing all elements of the given array.
 */
InputList.prototype.each = function(cb) {
	for (let i = 0; i < this.nodes.length; i++) {
		// Execute the callback with inputs[i], index, and the whole
		// array as arguments. 
		cb(this.inputs[i], i, this.inputs);
		return this.inputs;
	}
};


/*
 * This method returns an Array with the values of all elements.
 * 
 * return {Array} An array containing valuesof all inputs. 
 */
InputList.prototype.getValues = function() {
	this.values = [];
	for (let i = 0; i < this.nodes.length; i++) {
		this.values.push(this.nodes[i].value);
	}	
	return this.values;
};

/*
 * This method tries to match given regex with the selector 
 * matched elements. 
 *
 * @params regex {String, Array} A single regex or multiple regexes
 * that input values will be compared to.
 * @params cb {Function} A function to be called on a failed match.
 * @params cbArgs {Array, String} An Array of arguments to be passed
 * to the callback function.
 *
 * return {InputList} An Input list containing all the inputs that 
 * matched regex.
 */
InputList.prototype.isValid = function(regex, cb, cbArgs) {
	let arr = [];
	try {
		// GIVEN STRING.
		if (typeof regex === "string") {
			let regexp = new RegExp(regex, "g");
			for (let i = 0; i < this.length; i++) {
				// MATCH SUCCESSFUL.
				if (this.nodes[i].value.match(regexp) !== null) {
					arr.push(this.nodes[i]);
				}
				// FAILED MATCH.
				else {
					// cbArgs IS A 'TWO-DIMENSIONAL ARRAY'.
					if (cbArgs && Array.isArray(cbArgs[0]) && cbArgs.length === this.length) {
						cb(cbArgs[i]);
						false;
					} // cbArgs IS A NORMAL 'ARRAY'.
					else if (cbArgs && Array.isArray(cbArgs) && cbArgs.length === this.length) {
						cb(cbArgs[i]);
						false;
					} // cbArgs IS A 'STRING'.
					else if (cbArgs && typeof cbArgs === "string") {
						cb(cbArgs);
						false;
					} // NO cbArgs
					else if (cbArgs === undefined) {
						cb();
						false;
					} // INVALID
					else {
						throw new Error("Invalid Call back Arguments!");
					}
				}
			}
			return new InputList(arr);
		} // GIVEN ARRAY.
		else if ( Array.isArray(regex) === true && this.length === regex.length ) {
			for (let i = 0; i < this.length; i++) {

				// Make a regexp.
				let regexp = new RegExp(regex[i], "g");
				// MATCH SUCCESSFUL
				if (this.nodes[i].value.match(regexp) !== null) {
					arr.push(this.nodes[i])	
				}
				// FAILED TO MATCH
				else {
					// cbArgs IS A 'TWO-DIMENSIONAL ARRAY'.
					if (cbArgs && Array.isArray(cbArgs[0]) && cbArgs.length === this.length) {
						cb(cbArgs[i]);
						false;
					} // cbArgs IS A NORMAL 'ARRAY'.
					else if (cbArgs && Array.isArray(cbArgs) && cbArgs.length === this.length) {
						cb(cbArgs[i]);
						false;
					} // cbArgs IS A 'STRING'.
					else if (cbArgs && typeof cbArgs === "string") {
						cb(cbArgs);
						false;
					} // NO cbArgs
					else if (cbArgs === undefined) {
						cb();
						false;
					} // INVALID
					else {
						throw new Error("Invalid Call back Arguments!");
					}	
				}

			}
			return new InputList(arr);
		} // Invalid Argument.
		else {
			throw new Error("Invalid Regular Expression given!");
		}
	} catch (e) {
		console.error(e);
		return null;
	}

};




/*
 * Name Space creator function.
 * @params window {object} Global window object.
 * @params document {object} Global document object.
 * @params document {object} Global document object.
 *
 * return {InputList} Returns all the inputs as inputlist that match the criterion.
 */

window.$input = function(window, document, selector) {
	"use strict";

	// Select specific nodes.
	var nodes = document.querySelectorAll(selector),
		inputList = [];

	// Iterate on nodes.
	nodes.forEach(function(node) {
		// Only select input element nodes.
		if (node.nodeType === 1 && node.nodeName.toLowerCase() === "input") {
			inputList.push(new Input(node));
		}		
	});
	return new InputList(nodes, inputList);
}.bind(null, window, document); 