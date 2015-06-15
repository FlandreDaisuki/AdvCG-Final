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
    scene = new Scene();
    var yuka = [new Vector3(300, 0, 300), new Vector3(300, 0, -300), new Vector3(-300, 0, -300), new Vector3(-300, 0, 300)];

    var t1 = new Triangle(yuka[0], yuka[1], yuka[2]);
    var t2 = new Triangle(yuka[3], yuka[0], yuka[2]);

    scene.children.push(t1, t2);
}
var scene;
