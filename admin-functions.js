(function($) {
	var CarbonYoast = function() {
		/*
		 * Change this value to update the frequency at which the readability is checked
		 */
		this.refreshInterval = 2000;

		/*
		 * Add/remove types of fields you wish to ignore to this array
		 */
		this.fieldsByTypeToExclude = [
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
		this.fieldsByNameToExclude = [
		];

		YoastSEO.app.registerPlugin('CarbonYoastPlugin', {status: 'ready'});

		this.init();
	};

	CarbonYoast.prototype.init = function() {
		var _self = this;

		var additionalContent = '';

		setInterval(function () {
			additionalContent = _self.getAdditionalContent();

			YoastSEO.app.refresh();
		}, _self.refreshInterval);

		YoastSEO.app.pluginReady('CarbonYoastPlugin');

		YoastSEO.app.registerModification('content', function (content) {
			return content + ' ' + additionalContent;
		}, 'CarbonYoastPlugin', 5);
	};

	CarbonYoast.prototype.shouldSkipField = function (field) {
		return this.fieldsByTypeToExclude.indexOf(field.type) !== -1 || this.fieldsByNameToExclude.indexOf(field.base_name) !== -1
	};

	CarbonYoast.prototype.getFieldContent = function (field) {
		var fieldContent;

		if (field.type === 'rich_text') {
			fieldContent = $(field.value).text();
		} else {
			fieldContent = field.value;
		}

		return fieldContent;
	};

	CarbonYoast.prototype.getAdditionalContent = function (fields) {
		var _self = this;
		var fieldsContentParts = [];

		var fields;
		if (window.hasOwnProperty('cf')) {
			// Carbon Fields 3.x
			fields = window.cf.vendor['@wordpress/data'].select('carbon-fields/metaboxes').getFields();
		} else {
			// Carbon Fields 2.x
			fields = window.carbonFields.api.store.getState().fields;
		}

		$.each(fields, function (index, field) {
			fieldsContentParts.push(_self.getFieldContent(field));
		});

		return fieldsContentParts.join(' ');
	};

	$(window).on('YoastSEO:ready', function () {
		var carbonYoast = new CarbonYoast();
	});

})(jQuery);
