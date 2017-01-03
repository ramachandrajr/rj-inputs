/*
	MIT License
	------------
	Copyright (c) [2016] [Ramachandr Junior]

	Author: Ramachandra Junior,
	Website: http://ramachandrajr.github.io,
	email: ramachandrajr3@gmail.com

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

	Cheers,
	Rj

*/



/* 
 * Input Class.
 */
var Input = function(element, text) {
	this.element = element;
	this.text = text;
};

Input.prototype.isValid = function(regex, cb, cbArgs) {
	// Checking input data.
	try {
		if ( !(Array.isArray(regex) && regex.length === 2) && typeof regex !== "string" )
			throw new Error("The First Argument has to be an array of length 2 or a regex compatible string!");
		else if ( typeof regex[0] !== "string" || typeof regex[1] !== "string" )
			throw new Error("Elements of the Regex array must be strings!");
		else if ( !(cb === undefined || typeof cb === "function") )
			throw new Error("The Second Argument has to be a callback function!");
		else if ( !(cbArgs === undefined || Array.isArray(cbArgs) || typeof cbArgs === "string") ) 
			throw new Error("The third Argument has to be an Array or a String of callback Argument/s!")
	} catch (exception) {
		console.error(exception);
		return null;
	}

	// Setting regex arguments
	if (Array.isArray(regex)) {
		var regArg1 = regex[0],
			regArg2 = regex[1];
	} else {
		var regArg1 = regex,
			regArg2 = "g";
	}

	// If pattern is regexp usable.
	var pattern = new RegExp(regArg1, regArg2);
	if (this.text.match(pattern) === null) {
		cb(cbArgs);
		return false;
	}

	return this.element;
};


/*
 * InputList class.
 */

var InputList = function(nodeList) {
	this.elements = nodeList;
	this.values = null;
};

InputList.prototype.getValues = function() {
	this.values = [];
	for (let i = 0; i < this.elements.length; i++) {
		this.values.push(this.elements[i].value);
	}
	return this.values;
};

InputList.prototype.isValid = function()



/*
 * This function is the name space creator for our library ,
 * it creates a new object with all the given methods on it.
 *
 * @param {Object} window - This parameter holds global window object. 
 * @param {Object} document - This parameter holds global document object. 
 * @param {Object} e - Element Node reference. 
 */

window.$input = function(window, document, id) {

	// No 'id' given.
	if (id === undefined) {
		throw new Error("$input() function needs an 'id' string as argument!");
	}
	// 'id' is a String.
	else if (typeof id === "string") {
	 	var node = document.getElementById(id);
	}
	// 'id' is an Array.
	else if (Array.isArray(id) === true) {
		var ids = id,
			id = null,
			nodeList = [];
		ids.forEach(function(id) {
			nodeList.push(document.getElementById(id));
		});
	}

	try {
		// Can't find node in DOM.
		if (node === null) {
			throw new Error("A node with the following 'id' does not exist!");
		} 
		// If the input was a list.
		else if (node === undefined) {
			return new InputList(nodeList);
		} else { 
			return new Input(node, node.value);
		}

	} catch (exception) {
		console.error(exception);
		return null;
	}

}.bind(null, window, document);

