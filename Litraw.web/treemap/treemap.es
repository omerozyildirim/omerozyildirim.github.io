
var root = document.documentElement;
var anim = root.getElementById('anim');
var currentNode = root.getElementById('start');
var currentBox = root.getAttribute('viewBox');

function startAnimation () {
  var viewBox = printViewBox(evt.target);
  var fromBox = currentBox;
  var splines;
  if (evt.target == currentNode) {
    splines = '.75 0 1 0.25';
    currentNode = evt.target.parentNode.parentNode.parentNode.getElementsByTagName('rect').item(0);
    currentBox = printViewBox(currentNode);
  } else {
    splines = '0 1 0 1';
    currentBox = viewBox;
    currentNode = evt.target;
  }
  anim.setAttribute('keySplines', splines);
  anim.setAttribute('values', fromBox + ';' + currentBox);
  anim.setAttribute('dur', getSpeed(evt) + 's');
  anim.beginElement();
}

function printViewBox (node) {
  if (node.parentNode.parentNode.tagName == 'g') {
    var box = getBoundingBox(node);
    return box.x + ' ' + box.y + ' ' + box.width + ' ' + box.height;
  } else {
    return root.getAttribute('viewBox');
  }
}


function getSpeed (evt) {
  var speed = 0.75;
  if(evt.button == 2) {
    evt.preventDefault();
    speed /= 2;
  }
  return speed;
}
