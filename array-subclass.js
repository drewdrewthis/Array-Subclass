var newProps = {
	info: {
		value: {
			min: 0
		}
	},
	min_stack: {
		value: [],
		writable: true,
		min: 0
	},
	setMin: {
		value: function() {
			this.info.min = this.min_stack[this.min_stack.length - 1]
		}
	},
	getMin: {
		value: function() {
			return this.info.min;
		}
	},
	push: {
		value: function(num) {
			if (this.getMin() > num) {
				this.min_stack.push(num);
				this.setMin();
			}
			Array.prototype.push.call(this,num);
			return this.length;
		}
	},
	pop: {
		value: function() {
			var current_stack = this;
			var current_min = this.getMin()
			var value_to_pop = current_stack[current_stack.length-1];
			if(current_min === value_to_pop) {
				this.min_stack.pop();
			}
			Array.prototype.pop.call(this);
			this.setMin();
		}
	}
}

function SetOfStacks(value) {
	var arr = [];
	Array.prototype.push.apply(arr, arguments);
	Object.setPrototypeOf(arr, SetOfStacks.prototype);
	for(var i = 0; i < arguments.length; i++) {
		if (!arr.getMin() || arr.getMin() > arguments[i]) {
			arr.min_stack.push(arguments[i]);
			arr.setMin();
		}
	}
	return arr;
}

// subclass extends superclass
SetOfStacks.prototype = Object.create(Array.prototype, newProps);

var stack = new SetOfStacks(1,2,3);
