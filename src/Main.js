'use strict';

Ready(Init);

function Ready(interactive, complete) {
    complete = complete || function() {};
    interactive = interactive || function() {};
    document.onreadystatechange = function() {
        if (document.readyState === 'interactive') {
            interactive();
        }
        if (document.readyState === 'complete') {
            complete();
        }
    }
};

function Init() {

}