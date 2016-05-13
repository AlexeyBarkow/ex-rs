function ListNode (prev, next, value) {
		this.next = next;
		this.prev = prev;
		this.value = value;
}
function DoublyLinkedList () {
	//private data
	var INCORRECT_INDEX_MESSAGE = "error: Incorrect index",
		listData = {
			head : null,
			tail : null
		};

	this.head = function () {
		return listData.head ? listData.head.value : null;
	};

	this.tail = function () {
		return listData.tail ? listData.tail.value : null;
	};

	this.append = function (data) {
		var res = new ListNode(null, null, data);
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
		var res = findAt(index);
		if (!res) {
			throw INCORRECT_INDEX_MESSAGE;
		}
		return res.value;
	};
	//private function
	function findAt(index) {
		if (index < 0 || typeof index !== "number") {
			throw INCORRECT_INDEX_MESSAGE;
		}
		var curr = listData.head;
		for (var i = 0; i < index && curr != null; i++) {
			curr = curr.next;
		}

		if (!curr && i < index) {
			throw INCORRECT_INDEX_MESSAGE;
		}
		return curr;
	}

	this.insertAt = function (index, data) {
		var curr = findAt(index),
			prev,
			res = new ListNode(null, null, data);
		if (curr === null) {
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
			throw INCORRECT_INDEX_MESSAGE;
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
}
