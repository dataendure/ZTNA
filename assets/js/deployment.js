'use strict';

$(function() {
	var showhideSelector = '.edge-deployment';
	var dataAttribute = 'edge-deployment';
	var collapseSelector = '#description-';
	var accordionSelector = '#heading-';	
	var $globalEdgeButton = $('#global-edge');
	var $privateEdgeButton = $('#private-edge');

	// set deployment model upon page load - global or private
	function init(dep) {
  		// show/hide elems with .edge-deployment and `data-edge-deployment` attr
  		$(showhideSelector).each(function() {
  			var elem = $(this);
  			if (elem.data(dataAttribute) === dep) {
				elem.removeClass('bnn-hide');
  			} else {
				elem.addClass('bnn-hide');
  			}
  		});

  		['1', '2', '3'].forEach(function(idx) {
  			var $desc_elem = $(collapseSelector + idx);
			var $arch_elem = $(`[data-edge-deployment="${dep}"] #arch-${idx}`);  			
			var $arch_main = $(`[data-edge-deployment="${dep}"] #arch`);
        	var $accordionBtn = $(accordionSelector + idx).find('button');

  			// reset accordion so they are all collapsed
        	if (!$accordionBtn.hasClass('collapsed')) {
	        	$accordionBtn.trigger('click');
	        }

  			// logic to swap out img when accordion is clicked
			$desc_elem.on('shown.bs.collapse', function () {
				// show arch_elem
				$arch_main.addClass('bnn-hide');
				$arch_elem.removeClass('bnn-hide');
			});

			$desc_elem.on('hidden.bs.collapse', function () {
				// show arch_main
				$arch_main.removeClass('bnn-hide');
				$arch_elem.addClass('bnn-hide');
			});

  		});
	}

	$globalEdgeButton.on('click', function(e) {
  		$globalEdgeButton.addClass('active');
  		$privateEdgeButton.removeClass('active');
  		init('global');
	});

	$privateEdgeButton.on('click', function(e) {
  		$globalEdgeButton.removeClass('active');
  		$privateEdgeButton.addClass('active');
  		init('private');
	});

	init('private');

});


// hovering over SVG image triggers accordion
$(function() {
	var $svgImage = $('.arch-img');
	var accordionSelector = '#heading-';
	// assuming img is 760px wide, 416px wide
	var ranges = [
		{
			idx: '1', // Conn1
			center: [515,105], 
			radius: 25
		}, {
			idx: '1', // Conn2
			center: [515,215], 
			radius: 25
		}, {
			idx: '1', // Conn3
			center: [515,325], 
			radius: 25
		}, {	
			idx: '1', // GEN
			center: [355,125], 
			radius: 50
		}, {
			idx: '2', // CC
			center: [270,245], 
			radius: 50
		}, {
			idx: '3', // APP
			center: [115,130], 
			radius: 75
		}
	];	

	// open/close accordion based on mouse location
	var debounce = false;
	$svgImage.on('mousemove', function(e) {
    	// simple debounce
		if (debounce) {
			console.log('--> debounce')
			return;
		} else {
	    	debounce = true;
	        setTimeout(function() {
	            debounce = false;
	        }, 1); 			
		}
 		
		// mouse position over img
		var $this = $(this);
		var width = $this.width();
		var height = $this.height();
        var offset = $this.offset();
        var x_img = (e.pageX - offset.left);
        var y_img = (e.pageY - offset.top);
        // console.log(x_img,y_img);
        var x = x_img * (760/width);
        var y = y_img * (416/height);
        // console.log(x,y);

        // find match in ranges
        var idx;
        for (var i = 0; i < ranges.length; i++) {
        	var r = ranges[i];

        	if (((x - r.center[0])**2 + (y-r.center[1])**2) < (r.radius**2)) {
        		idx = r.idx;
        		// console.log(idx);
        		break;
        	}
        }

        // mouse is in ranges
        if (idx) {
        	// if accordion is collapsed, expand it
        	var $accordionBtn = $(accordionSelector + idx).find('button');
        	if ($accordionBtn.hasClass('collapsed')) {
	        	$accordionBtn.trigger('click');	        	
        	}
        } else {
        	// reset accordion so they are all collapsed
	  		['1', '2', '3'].forEach(function(idx) {
	        	var $accordionBtn = $(accordionSelector + idx).find('button');
	        	if (!$accordionBtn.hasClass('collapsed')) {
		        	$accordionBtn.trigger('click');
		        } 
		     });       	
        }      
    });

});