/**
 * @file Dom Extension Methods
 * @author signumcrucis
 * @version 0.1.0
 */

/*
    MIT License

    Copyright (c) 2017 SignumCrucis

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
*/

((window, document, nodePrototype, nodeListPrototype) => {
    ///////////////////////////////////////////////////////////////////////////////////////////
    // Private
    /**
     * Creates an html element
     * @private
     * @param {string} html
     * @return {Element}
     */
    function createHtml(html) {
        var tmp = document.implementation.createHTMLDocument();
        tmp.body.innerHTML = html;
        return tmp.body.children[0];
    };

    /**
     * Checks if it's a string or not. Closure compiler treats this like a macro.
     * @private
     * @param {any} s string to be checked
     * @return {boolean}
     */
    function isString (s) { 
        return ''+s===s;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // Node
    /**
     * @param {string} className
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$addClass = function (className) {
        this.classList
            ? this.classList.add(className)
            : this.className += ' ' + className;
        return this;
    };
    /**
     * @param {string} className
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$removeClass = function (className) {
        this.classList
            ? this.classList.remove(className)
            : this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        return this;
    };
    /**
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$show = function () {
        this.style.display = '';
        return this;
    };
    /**
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$hide = function () {
        this.style.display = 'none';
        return this;
    };
    /**
     * @param {string} eventName
     * @param {function} eventHandler
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$on = function (eventName, eventHandler) {
        this.addEventListener(eventName, eventHandler);
        return this;
    };
    /**
     * @param {string} eventName
     * @param {function} eventHandler
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$off = function (eventName, eventHandler) {
        this.removeEventListener(eventName, eventHandler);
        return this;
    };
    /**
     * @param {string} className
     * @return {boolean}
     * @this {Node}
     */
    nodePrototype.$hasClass = function (className) {
        return this.classList
            ? this.classList.contains(className)
            : new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
    };
    /**
     * @param {string} className
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$toggleClass = function (className) {
        this.$hasClass(className)
            ? this.$removeClass(className)
            : this.$addClass(className);
        return this;
    };
    /**
     * @param {string|Element} html
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$after = function(html) {
        if(!isString(html))
            html = html.outerHTML;
        this.insertAdjacentHTML('afterend', html);
        return this;
    };
    /**
     * @param {string|Element} html
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$before = function(html) {
        if(!isString(html))
            html = html.outerHTML;
        this.insertAdjacentHTML('beforebegin', html);
        return this;
    };
    /**
     * @param {string|Element} element
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$prepend = function (element){
        if(isString( element ))
            element = createHtml(element);
        this.insertBefore(element, this.firstChild);
        return this;
    }
    /**
     * 
     * @param {string|Element} element
     * @return {Node} self
     * @this {Node}
     */
    nodePrototype.$append = function (element){
        if(isString( element ))
            element = createHtml(element);
        this.appendChild(element);
        return this;
    }
    /**
     * Removes this element from the Dom
     * @this {Node}
     */
    nodePrototype.$remove = function (){
        this.parentNode.removeChild(this);
        return this;
    };



    ///////////////////////////////////////////////////////////////////////////////////////////
    //NodeList
    /**
     * @method
     */
    nodeListPrototype.$each = Array.prototype.forEach;
    
    /**
     * @param {string} className
     * @return {NodeList} self
     * @this {NodeList}
     */
    nodeListPrototype.$addClass = function (className) {
        this.$each(function(i) {
            i.$addClass(className);
        });
        return this;
    };
    
    /**
     * @param {string} className
     * @return {NodeList} self
     * @this {NodeList}
     */
    nodeListPrototype.$removeClass = function (className) {
        this.$each(function(i) {
            i.$removeClass(className);
        });
        return this;
    };
    /**
     * @param {string} eventName
     * @param {function} eventHandler
     * @return {NodeList} self
     * @this {NodeList}
     */
    nodeListPrototype.$on = function (eventName, eventHandler) {
        this.$each(function(i) {
            i.$on(eventName, eventHandler);
        });
        return this;
    };
    /**
     * @param {string} eventName
     * @param {function} eventHandler
     * @return {NodeList} self
     * @this {NodeList}
     */
    nodeListPrototype.$off = function (eventName, eventHandler) {
        this.$each(function(i) {
            i.$off(eventName, eventHandler);
        });
        return this;
    };
    /**
     * @param {string} className
     * @return {NodeList} self
     * @this {NodeList}
     */
    nodeListPrototype.$toggleClass = function (className) {
        this.$each(function(i) {
            i.$toggleClass(className);
        });
        return this;
    };
    /**
     * @param {string|Element} html
     * @return {NodeList} self
     * @this {NodeList}
     */
    nodeListPrototype.$after = function(html) {
        this.$each(function(i) {
            i.$after(html);
        });
        return this;
    };
    /**
     * @param {string|Element} html
     * @return {NodeList} self
     * @this {NodeList}
     */
    nodeListPrototype.$before = function(html) {
        this.$each(function(i) {
            i.$before(html);
        });
        return this;
    };
    /**
     * @param {string|Element} element
     * @return {NodeList} self
     * @this {NodeList}
     */
    nodeListPrototype.$prepend = function (element){
        this.$each(function(i) {
            i.$prepend(element);
        });
        return this;
    }
    /**
     * @param {string|Element} element
     * @return {NodeList} self
     * @this {NodeList}
     */
    nodeListPrototype.$append = function (element){
        this.$each(function(i) {
            i.$append(element);
        });
        return this;
    }
    /**
     * removes all nodes in list.
     * @this {NodeList}
     */
    nodeListPrototype.$remove = function (){
        this.$each(function(i) {
            i.$remove();
        });
    };



    ///////////////////////////////////////////////////////////////////////////////////////////
    // $

    /**
     * Does one of three things:
     * 1. Selects a set of nodes from the dom and returns a NodeList.
     * 2. Creates a new element.
     * 3. Calls a provided function when the document is ready.
     * @param {string|function} query A selector as a string, an html element as a string, or a function to be called on document ready
     */
    window.$ = function(query) {
        return isString( query ) // if( isString( query ) )
        ?
            query[0] == '<' // If it is an element string
                ? // builds an element
                    createHtml(query) 
                : // If its not an element string, then it's a selector string to be passed to the query selector
                    document.querySelectorAll(query)
        : // else if(typeof query === 'function') // If it's a function, then it will be called on document ready
            // Document ready callbacker
            (
                (document.attachEvent 
                    ? document.readyState === "complete" 
                    : document.readyState !== "loading"
                    )
                        ? query()
                        : document.addEventListener('DOMContentLoaded', query)
            );
    }


    




})(window, document, Node.prototype, NodeList.prototype);



