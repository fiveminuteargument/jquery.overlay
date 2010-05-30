(function($){

	$.fn.extend({

		overlay: function(options) {
			var defaults = {
				maxItems: 5,
				duration: 1500,
				animRatio: 5
			};

			var options = $.extend(defaults, options);

			return this.each(function() {
				$(this).hover(
					function() {
						add_overlay(this);
					},

					function() {
						$(this).find('.overlay').remove();
					}
				);
			});

		}
	});
})(jQuery);


function add_overlay(sel)
{
	var compStyle = document.defaultView.getComputedStyle($(sel)[0], null);

	$(sel).css('position', 'relative');


	//
	// Margin overlay should have negative margins identical to the element's margins
	//

	$(sel).append('<div class="overlay margin-overlay"></div>');

	var sides = [ 'left', 'top', 'right', 'bottom' ];
	var props = {};

	for (s in sides)
	{
		/*
		var length = 0
			- parseInt(compStyle.getPropertyValue('margin-' + sides[s]))
			- parseInt(compStyle.getPropertyValue('border-' + sides[s] + '-width'));
		*/

		var length = 0 - parseInt($(sel).css('margin-' + sides[s]))
			- parseInt($(sel).css('border-' + sides[s] + '-width'));

		props[sides[s]] = length + 'px';
	}

	$('.margin-overlay').css(props);


	//
	// Border overlay
	//

	$(sel).append('<div class="overlay border-overlay"></div>');

	$('.border-overlay').css({
		top:     0 - parseInt(compStyle.getPropertyValue('border-top-width')) + 'px',
		right:   0 - parseInt(compStyle.getPropertyValue('border-right-width')) + 'px',
		bottom:  0 - parseInt(compStyle.getPropertyValue('border-bottom-width')) + 'px',
		left:    0 - parseInt(compStyle.getPropertyValue('border-left-width')) + 'px'
	});


	//
	// Padding overlay is easy - it just sits inside the element
	//

	$(sel).append('<div class="overlay padding-overlay"></div>');


	//
	// Content overlay
	//

	$(sel).append('<div class="overlay content-overlay"></div>');

	props = {};

	for (s in sides)
	{
		props[sides[s]] = parseInt($(sel).css('padding-' + sides[s]));
	}

	$('.content-overlay').css(props);
}
