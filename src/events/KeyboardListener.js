/**
 * @module keyboardListener
 * 
 * 
 */

var KeyboardListener = function() {
	var handlers = [];
	
	function init () {
		document.addEventListener('keydown', function(e) {
//			e.preventDefault();
			if ((e.keyCode >= 0 && e.keyCode <= 31) || (e.keyCode >= 95 && e.keyCode <= 99) || e.keyCode >= 223) 	// something between shift and escape
				return;
			else {
				handlers.forEach(function(handler, key) {
					handler(e.originalEvent || e, e.ctrlKey, e.shiftKey, e.altKey, e.keyCode);
				});
			}
		});
	}

	function addEventListener (cb, debug) {
		if (typeof cb !== 'function')
			return;
		handlers.push(cb);
	}

	function removeEventListener (cb) {
		if (typeof cb !== 'function')
			return;
		var keyToRem;
		$.each(handlers, function(key, handler) {
			if (handler.prototype === cb.prototype)
				keyToRem = key
		});
		handlers.splice(keyToRem, 1);
	}
	
	init();
	
	return {
		addEventListener : addEventListener,
		removeEventListener : removeEventListener
	};
}



module.exports = KeyboardListener;