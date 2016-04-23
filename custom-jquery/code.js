

function jQueryArray(array) {
    this.length = 0;
    var that = this;
    Array.prototype.forEach.call(array, (curr,i,arr) => {
        that[i] = curr; 
        that.length++;
    });
	//make our jQuery array interpretate as array
    this.splice = function () {};
}
jQueryArray.prototype.addClass = function(classToAdd) {
    if (typeof classToAdd === 'string') {
        Array.prototype.forEach.call(this, (curr) => {
            curr.className += ' ' + classToAdd;
        });
    }
    
    if (typeof classToAdd === 'function') {
        Array.prototype.forEach.call(this, (curr, index) => {
            curr.className += ' ' + classToAdd(index, curr.className);
        });
    }
    return this;
}


//ToDo: my append function adds elements uncorrectly if we have the same elements on JQueryArray and child
jQueryArray.prototype.append = function(child) {
    if (typeof child === 'string') {
        Array.prototype.forEach.call(this, (curr) => {
            curr.innerHTML += child;
        });
    }
    if(child instanceof Node) {
        Array.prototype.forEach.call(this, (curr, index, arr) => {
            curr.appendChild(child.cloneNode(true));
        });

        //If child instanceof Element
        if (child.remove) {
            child.remove();
        }
    }
    if (child instanceof jQueryArray) {
        var that = this;
        Array.prototype.forEach.call(child, curr => {
            if (Array.prototype.indexOf.call(that, curr) == -1) {
                that.append(curr);
            }
        });
    }
    
    if (typeof child === 'function') {
        Array.prototype.forEach.call(this, (curr, index) => {
            curr.innerHTML += child(index, curr.innerHTML);
        });
    }
    return this;
}


jQueryArray.prototype.html = function(htmlSomething) {
    if (arguments.length == 0) {
        if (this[0]) {
            return this[0].innerHTML;
        } 
    } else {
        if (typeof htmlSomething === 'string') {
            Array.prototype.forEach.call(this, curr => {
                curr.innerHTML = htmlSomething;
            });
        }
        if (typeof htmlSomething === 'function') {
            Array.prototype.forEach.call(this, (curr, index) => {
                curr.innerHTML = htmlSomething(index, curr.innerHTML);
            });
        }
        return this;
    }
}

jQueryArray.prototype.attr = function(attributeName, value) {
    if (typeof attributeName === 'string') {
        if (arguments.length == 1) {
            if (this[0]) {
                return this[0].getAttribute(attributeName);
            } 
        } else {
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'null') {
                Array.prototype.forEach.call(this, curr => {
                    curr.setAttribute(attributeName, value);
                });
            }
            if (typeof value === 'function') {
                Array.prototype.forEach.call(this, (curr, index) => {
                    curr.setAttribute(attributeName, value(index, curr.getAttribute(attributeName)));
                });
            }
        }
    } else {
        //ToDo: attr with PlaneObject as parameter
    }
    return this;
}

jQueryArray.prototype.children = function() {

}

jQueryArray.prototype.css = function() {

}

jQueryArray.prototype.data = function() {

}

jQueryArray.prototype.on = function() {

}

jQueryArray.prototype.each = function() {

}


function $(selector, context) {
	context = context || document;
    if(!selector) {
        return new jQueryArray([context]);
    }
    if (typeof selector === 'string') {
  
        if (selector.trim()[0] == '<') {
            var div = context.createElement('div');
            div.innerHTML = selector;
            return new jQueryArray(div.childNodes);
        } else {
            return new jQueryArray(context.querySelectorAll(selector));
        }
    }
    
    if (selector instanceof Element) {
        return new JQueryArray([selector]);
    }
    return selector;
}
window.$ = $;
