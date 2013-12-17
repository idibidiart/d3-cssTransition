;(function() {

    function simulateTransitionEnd(duration) {
        var     el = this
            ,   callback = function() {
                // don't simulate if naturally triggered
                if (!triggered) {
                    $(el).trigger(vendorEndEvent);
                }
            }
        setTimeout(callback, duration + 17)
    }

    d3.vendorStyle = function(prop) {
        var     vendorPrefixes = ['Moz','Webkit','O', 'ms']
            ,   style     = document.createElement('div').style
            ,   upper     = prop.charAt(0).toUpperCase() + prop.slice(1)
            ,   pref, len = vendorPrefixes.length;

        while (len--) {
            if ((vendorPrefixes[len] + upper) in style) {
                pref = (vendorPrefixes[len])
            }
        }
        if (!pref && prop in style) {
            pref = prop
            return perf
        }
        if (pref) {
            return pref + upper
        }
        return ''
    }

    var     endEvent = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition'    : 'transitionend',
            'OTransition'      : 'oTransitionEnd otransitionend',
            'msTransition'     : 'MSTransitionEnd',
            'transition'       : 'transitionend'
        }
        ,   vendorEndEvent = endEvent[d3.vendorStyle('transition')]
        ,   defaults = {
            duration: 400,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)' /* easeOutQuad */
        }
        ,   triggered = false

    d3.selection.prototype.cssTransition = function(props, opts) {

        var options = $.extend({}, defaults, opts);
        var vendorTransition = d3.vendorStyle('transition')
        props[vendorTransition] = 'all ' + options.duration + 'ms ' + options.easing;

        $(this[0]).one(vendorEndEvent, options.complete || function(){});
        $(this[0]).one(vendorEndEvent, function() {
            triggered = true
        })
        simulateTransitionEnd.bind(this[0])(options.duration);

        $(this).each(function(i, el) {
            $(el).css(props);
        })
        return this
    }

})();