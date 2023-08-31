const KeyboardEvents = require('src/events/JSKeyboardMap');

/**
 * @module keyboardListener
 * 
 * 
 */

const KeyboardListener = function() {
	let onPressedHandlers = [];
	let onReleasedHandlers = [];
	const pressedKeys = {};
	KeyboardEvents.forEach(function(eventName, key) {
		pressedKeys[key] = false;
	})
	
	function init () {
		document.addEventListener('keydown', function(e) {
//			e.preventDefault();
			if ((e.keyCode >= 0 && e.keyCode <= 31) || (e.keyCode >= 95 && e.keyCode <= 99) || e.keyCode >= 223) 	// something between shift and escape
				return;
			else {
				if (!pressedKeys[e.keyCode]) {
					onPressedHandlers.forEach(function(handler, key) {
						handler(e.originalEvent || e, e.ctrlKey, e.shiftKey, e.altKey, e.keyCode);
					});
					pressedKeys[e.keyCode] = true;
				}
			}
		});
		
		document.addEventListener('keyup', function(e) {
//			e.preventDefault();
			if ((e.keyCode >= 0 && e.keyCode <= 31) || (e.keyCode >= 95 && e.keyCode <= 99) || e.keyCode >= 223) 	// something between shift and escape
				return;
			else {
				pressedKeys[e.keyCode] = false;
				onReleasedHandlers.forEach(function(handler, key) {
					handler(e.originalEvent || e, e.ctrlKey, e.shiftKey, e.altKey, e.keyCode);
				});
			}
		});
	}

	function addOnPressedListener (cb, debug) {
		if (typeof cb !== 'function')
			return;
		onPressedHandlers.push(cb);
	}
	
	function addOnReleasedListener (cb, debug) {
		if (typeof cb !== 'function')
			return;
		onReleasedHandlers.push(cb);
	}

	function removeOnPressedListener (cb) {
		if (typeof cb !== 'function')
			return;
		var keyToRem;
		onPressedHandlers.forEach(function(key, handler) {
			if (handler.prototype === cb.prototype)
				keyToRem = key
		});
		onPressedHandlers.splice(keyToRem, 1);
	}
	
	function removeOnReleasedListener (cb) {
		if (typeof cb !== 'function')
			return;
		var keyToRem;
		onReleasedHandlers.forEach(function(key, handler) {
			if (handler.prototype === cb.prototype)
				keyToRem = key
		});
		onReleasedHandlers.splice(keyToRem, 1);
	}
	
	init();
	
	return {
		addOnPressedListener : addOnPressedListener,
		addOnReleasedListener : addOnReleasedListener,
		removeOnPressedListener : removeOnPressedListener,
		removeOnReleasedListener : removeOnReleasedListener
	};
}



module.exports = KeyboardListener;