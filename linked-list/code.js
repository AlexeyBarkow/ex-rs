function DoublyLinkedList () {
	//private data
	var listData = {
		'head' : null,
		'tail' : null
	}, that = {};
	this.head = function () {
		return listData.head.value;
	};

	this.tail = function () {
		return listData.tail.value;
	};

	this.append = function (data) {
		var res = {
			'value' : data,
			'next' : null,
			'prev' : null
		};
		if (listData.head == null) {
			listData.head = res;
			listData.tail = res;
		} else {
			listData.tail.next = res;
			res.prev = listData.tail;
			listData.tail = res;
		}
		return this;	
	};

	this.at = function (index) {
		if (index < 0) {
			return undefined;
		}
		var curr = listData.head;
		for (var i = 0; i < index && curr != null; i++) {
			curr = curr.next;
		}
		return curr ? curr.value : undefined;
	};
	//private function
	function findAt(index) {
		if (index < 0) {
			return null;
		}
		var curr = listData.head;
		for (var i = 0; i < index && curr != null; i++) {
			curr = curr.next;
		}
		return curr;
	}

	this.insertAt = function (index, data) {
		if (index < 0) {
			return this;
		}
		var curr = findAt(index), 
			prev,
			res = {
				'value' : data,
				'next' : null,
				'prev' : null
			};
		// console.log(curr); 	
		if (curr == null) {
			return this.append(data);
		}
		prev = curr.prev;
		if (prev == null) {
			listData.head.prev = res;
			listData.head = res;
			res.next = curr;
		} else {
			prev.next = res;
			res.prev = prev;
			res.next = curr;
		}
		curr.prev = res;

		return this;
	};

	this.deleteAt = function (index) {
		var curr = findAt(index),
			prev,
			next;
		if (curr == null) {
			return this;
		}
		prev = curr.prev;
		next = curr.next;
		if (prev != null) {
			prev.next = next;
		} else {
			listData.head = next;
		}
		if (next != null) {
			next.prev = prev;
		} else {
			listData.tail = prev;
		}
		return this;
	};

	this.reverse = function () {
		var curr = listData.head, 
			tmp;
		if (curr == null) {
			return this;
		}
		while (curr.next != null) {
			tmp = curr.next;
			curr.next = curr.prev;
			curr.prev = tmp;
			curr = tmp;
		}
		curr.next = curr.prev;
		curr.prev = null;
		tmp = listData.head;
		listData.head = listData.tail;
		listData.tail = tmp;
		return this;

	};

	this.each = function (callback) {
		var curr = listData.head;
		while (curr != null) {
			curr.value = callback.call(null, curr.value);
			curr = curr.next;
		}
		return this;
	};

	this.indexOf = function (data) {
		var curr = listData.head, index = 0;
		while (curr != null) {
			if (curr.value === data) {
				return index;
			}
			index++;
			curr = curr.next;
		}
		return -1;
	};
	//function for testing
	// this.getList = function () {
	// 	return listData;
	// };
}

// var a = new DoublyLinkedList();
// console.log(a.append(2).head());