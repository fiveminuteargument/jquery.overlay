(function($){

	$.fn.extend({

		overlay: function(options) {
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

	$(sel).css({ position: 'relative' });


	//
	// Margin overlay should have negative margins identical to the element's margins
	//

	$(sel).append('<div class="overlay margin-overlay"></div>');

	var sides = [ 'left', 'top', 'right', 'bottom' ];
	var props = {};
	
	var fs = parseInt($(sel).css('font-size'));

	for (s in sides)
	{
		var length = 0 - parseInt($(sel).css('margin-' + sides[s]))
			- parseInt($(sel).css('border-' + sides[s] + '-width'));

		props[sides[s]] = (length / fs) + 'em';
	}

	$('.margin-overlay').css(props);


	//
	// Border overlay
	//

	$(sel).append('<div class="overlay border-overlay"></div>');

	$('.border-overlay').css({
		top:     (0 - parseInt(compStyle.getPropertyValue('border-top-width')) / fs) + 'em',
		right:   (0 - parseInt(compStyle.getPropertyValue('border-right-width')) / fs) + 'em',
		bottom:  (0 - parseInt(compStyle.getPropertyValue('border-bottom-width')) / fs) + 'em',
		left:    (0 - parseInt(compStyle.getPropertyValue('border-left-width')) / fs) + 'em'
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
		props[sides[s]] = (parseInt($(sel).css('padding-' + sides[s])) / fs) + 'em';
	}

	$('.content-overlay').css(props);
}
