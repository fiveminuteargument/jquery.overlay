(function($){
	$.fn.extend({

		overlay: function(options) {
			var defaults = {};

			var options = $.extend(defaults, options);

			return this.each(function() {
				$(this).hover(
					function() {
						$(this).add_overlay();
					},

					function() {
						$(this).find('.overlay').remove();
					}
				);
			});
		},
		
		add_overlay: function(options) {
			var sides = [ 'left', 'top', 'right', 'bottom' ];

			var defaults = { padding: true, margin: true, border: true, content: true };

			var options = $.extend(defaults, options);

			return this.each(function() {
				var compStyle = document.defaultView.getComputedStyle(this, null);

				$(this).css({ position: 'relative' });

				var props = {};
				var fs = parseInt($(this).css('font-size'));


				//
				// Margin overlay should have negative margins identical to the element's margins
				//

				if (options.margin)
				{
					$(this).append('<div class="overlay margin-overlay"></div>');

					for (s in sides)
					{
						var length = 0 - parseInt($(this).css('margin-' + sides[s]))
							- parseInt($(this).css('border-' + sides[s] + '-width'));

						props[sides[s]] = (length / fs) + 'em';
					}

					$(this).find('.margin-overlay').css(props);
				}


				//
				// Border overlay
				//

				if (options.border)
				{
					$(this).append('<div class="overlay border-overlay"></div>');

					$(this).find('.border-overlay').css({
						top:     (0 - parseInt(compStyle.getPropertyValue('border-top-width')) / fs) + 'em',
						right:   (0 - parseInt(compStyle.getPropertyValue('border-right-width')) / fs) + 'em',
						bottom:  (0 - parseInt(compStyle.getPropertyValue('border-bottom-width')) / fs) + 'em',
						left:    (0 - parseInt(compStyle.getPropertyValue('border-left-width')) / fs) + 'em'
					});
				}


				//
				// Padding overlay is easy - it just sits inside the element
				//

				if (options.padding)
				{
					$(this).append('<div class="overlay padding-overlay"></div>');
				}


				//
				// Content overlay
				//

				if (options.content)
				{
					$(this).append('<div class="overlay content-overlay"></div>');

					props = {};

					for (s in sides)
					{
						props[sides[s]] = (parseInt($(this).css('padding-' + sides[s])) / fs) + 'em';
					}

					$(this).find('.content-overlay').css(props);
				}

			});
		}
	});
})(jQuery);