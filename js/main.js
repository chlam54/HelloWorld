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
	for(var i=1;i<=9;i++){
		if(window.localStorage.getItem("stock" + i) != null)
			$("#stock" + i).val(window.localStorage.getItem("stock" + i));
		else
			window.localStorage.setItem("stock" + i, $("#stock" + i).val());
	}
});
function updateAllStocks(){
	for(var i=1;i<=9;i++){
		window.localStorage.setItem("stock" + i, $("#stock" + i).val());
	}
}

var degSet = [360, 315, 270, 225, 180, 135, 90, 45];
function availableDegByStock(){
	var removeValFromIndex = [];
	for(var i=1;i<=9;i++){
			if(window.localStorage.getItem("stock" + i) <= 0)
				removeValFromIndex.push(i-1);
	}
	for (var i = removeValFromIndex.length -1; i >= 0; i--)
		degSet.splice(removeValFromIndex[i],1);
	return degSet;
}
function draw(){
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
	} else{
		alert("No available stocks");
	}
}
function updateDisplay(randDeg){
	for(var i=1;i<=9;i++){
		if(degSet[i-1] == randDeg)
			$("#stock" + i).val(window.localStorage.getItem("stock" + i) - 1);
	}
}
