$.fn.animateRotate = function(angle, duration, easing, complete) {
    var endAngle = $.extend({
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0
    }, $.type(angle) === 'object' ? angle : {rotateZ: angle});

    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {

        var domObj = this;

        // set context for all callbacks
        var callbacks = ['progress', 'complete', 'start', 'done', 'fail', 'always'];
        $.each(callbacks, function(index, value) {
            if (args[value]) {
                var callback = args[value];
                args[value] = function() {
                    return callback.apply(domObj, arguments);
                };
            }
        });

        // when setting 'transform', all values get replaced
        // save all properties so they don't get overwritten
        var rotateX = 0,
            rotateY = 0,
            rotateZ = 0;

        args.step = function(now, fx) {
            switch (fx.prop) {
                case 'rotateX':
                    rotateX = now;
                    break;
                case 'rotateY':
                    rotateY = now;
                    break;
                case 'rotateZ':
                    rotateZ = now;
                    break;
            }
            $.style(e, 'transform',
                    'rotateX(' + rotateX + 'deg) ' +
                    'rotateY(' + rotateY + 'deg) ' +
                    'rotateZ(' + rotateZ + 'deg)');
            if (step) return step.apply(domObj, arguments);
        };

        $({
            rotateZ: 0,
            rotateX: 0,
            rotateY: 0
        }).animate(endAngle, args);
    });
};
$(function() {
  //init storage
	for(var i=1;i<5;i++){
		if(window.localStorage.getItem("stock" + i) != null)
			$("#stock" + i).val(window.localStorage.getItem("stock" + i));
		else
			window.localStorage.setItem("stock" + i, $("#stock" + i).val());
	}
	
	$(".luckyDrawPanel").click(function() {
	  for(var i=1;i<5;i++){
	  $("#g"+i).text($("#stock"+i).val());
	  }
	});
});

function updateAllStocks(){
	for(var i=1;i<5;i++){
		window.localStorage.setItem("stock" + i, $("#stock" + i).val());
	}
}

function availableDegByStock(){
  var degSet = [360, 315, 270, 225, 180, 135, 90, 45];
	var removeValFromIndex = [];
	for(var i=1;i<5;i++){
			if(window.localStorage.getItem("stock" + i) <= 0){
        removeValFromIndex.push((i+4)-1);
        removeValFromIndex.push(i-1);
      }
	}
  removeValFromIndex.sort();
	for (var i = removeValFromIndex.length -1; i >= 0; i--)
		degSet.splice(removeValFromIndex[i],1);
	return degSet;
}
var drawFlag = false;
function draw(){
  if(!drawFlag){
    drawFlag = true;
  	var degSet = availableDegByStock();
  	if(degSet.length > 0){
  		var randIndex = Math.floor(Math.random() * degSet.length)
  		var randDeg = degSet[randIndex];

  		var rotatePower = 1440;
  		var duration = 1500;
  		$(".luckyDrawPanel").animateRotate(randDeg + rotatePower, duration, "linear", function() {
  			console.log(this); //this is now the correct DOM node
  		});
  		//update stock display & storage
  		updateDisplay(randDeg);
  		updateAllStocks();
      setTimeout(function(){
        $("#giftModal" + getGiftIndex(randDeg)).modal();
        drawFlag=false;
      }, duration+500);
  	} else{
  		alert("No available stocks");
      drawFlag=false;
    }
  }else {
    return false;
  }
}
function updateDisplay(randDeg){
  var degSet = [360, 315, 270, 225, 180, 135, 90, 45];
  for(var i=1;i<5;i++){
		if(degSet[i-1] == randDeg || degSet[(i+4)-1] == randDeg)
			$("#stock" + i).val(window.localStorage.getItem("stock" + i) - 1);
	}
}
function getGiftIndex(deg){
  var degSet = [360, 315, 270, 225, 180, 135, 90, 45];
  var index = 0;
  for(var i=0;i<degSet.length;i++){
    if(deg == degSet[i]){
      index = (i+1)%4;
    }
  }
  if(index ==0)
    index = 4;
  return index;
}
