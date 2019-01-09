(function($) {
	var CarbonYoast = function() {
		YoastSEO.app.registerPlugin('CarbonYoastPlugin', {status: 'ready'});

		this.getData();
	};

	CarbonYoast.prototype.getData = function() {
		var _self = this;
		var additionalContent = '';

		/*
		 * Add types of fields you wish to ignore to this array
		 */
		var fieldsByTypeToExclude = [
			'association',
			'file',
			'map',
			'checkbox',
			'color',
			'date',
			'date_time',
			'gravity_form',
			'hidden',
			'html',
			'image',
			'media_gallery',
			'multiselect',
			'set',
			'separator',
			'select',
			'time'
		];

		/*
		 * Add names of fields you wish to ignore to this array
		 */
		var fieldsByNameToExclude = [
		];

		window.cf.vendor['@wordpress/data'].subscribe(lodash.debounce(function() {
			var fieldsContent = [];

			var fields = window.cf.vendor['@wordpress/data'].select('carbon-fields/metaboxes').getFields();
			$.each(fields, function (index, field) {
				if (fieldsByTypeToExclude.indexOf(field.type) !== -1) {
					return;
				}

				if (fieldsByNameToExclude.indexOf(field.base_name) !== -1) {
					return;
				}

				var fieldContent;
				if ($(field.value).length) {
					fieldContent = $(field.value).text();
				} else {
					fieldContent = field.value;
				}

				fieldsContent.push(fieldContent);
			});

			additionalContent = fieldsContent.join(' ');
		}, 1000));

		setInterval(function () {
			YoastSEO.app.refresh();
		}, 1000);

		YoastSEO.app.pluginReady('CarbonYoastPlugin');
		YoastSEO.app.registerModification('content', function (content) {
			return content + ' ' + additionalContent;
		}, 'CarbonYoastPlugin', 5);
	};

	$(window).on('YoastSEO:ready', function () {
		var wordCount = new CarbonYoast();
	});

})(jQuery);
