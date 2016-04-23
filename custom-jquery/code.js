function jQueryArray(array) {
    this.length = 0;
    // var that = this;
    Array.prototype.push.apply(this, array);
    // Array.prototype.forEach.call(array, (curr,i,arr) => {
    //     that[i] = curr; 
    //     that.length++;
    // });
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


//ToDo: if one of selected elements metches the selector, its child will be added twice
jQueryArray.prototype.children = function(selector) {
    var res = new jQueryArray([]);
    Array.prototype.forEach.call(this, (curr, index) => {
        //ToDo: Change Array.push to my own concat method
        Array.prototype.push.apply(res, $(selector === undefined ? "*" : selector, curr));
    });
    return res;
}

jQueryArray.prototype.css = function(propertyName, value) {
    if (arguments.length == 1) {
        if (this[0]) {
            if (typeof propertyName === 'string') {
                return this[0].style[propertyName];
            } 
            if (Array.isArray(propertyName)) {
                var that = this;
                return propertyName.map(curr => {
                    return that[0].style[curr];
                });
            }
            for (var style in propertyName) {
                Array.prototype.forEach.call(this, curr => {
                    curr.style[style] = propertyName[style];
                });
            }
        }
    } else {
        if (typeof propertyName === 'string') {
            if (typeof value === 'string' || typeof value === 'number') {
                Array.prototype.forEach.call(this, curr => {
                    curr.style[propertyName] = value;
                });
            };
            if (typeof value === 'function') {
                Array.prototype.forEach.call(this, (curr, index) => {
                    curr.style[propertyName] = value(index, curr.style[propertyName]);
                });
            }
        }
    } 
    return this;  
}

jQueryArray.prototype.data = function(key, value) {
    if (this[0]) {
        if (arguments.length === 0) {
            return this[0].dataset;
        }
        if (arguments.length === 1 && typeof key === 'string') {
            return this[0].dataset[key];
        }
    }

    if (arguments.length === 1) {
        for (var data in key) {
            Array.prototype.forEach.call(this, curr => {
                curr.dataset[data] = key[data];
            }); 
        }
    }

    if (arguments.length === 2) {
        Array.prototype.forEach.call(this, curr => {
            curr.dataset[key] = value;
        });
    }
    return this;
}

jQueryArray.prototype.on = function() {

}

jQueryArray.prototype.one = function() {

}

jQueryArray.prototype.each = function() {

}


function $(selector, context) {
	context = context || document;
    if (!selector) {
        return new jQueryArray([]);
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
