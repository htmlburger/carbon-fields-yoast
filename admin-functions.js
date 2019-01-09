(function($) {
	var CarbonYoast = function() {
		this.carbonFieldsVersion;

		if (window.hasOwnProperty('cf')) {
			this.carbonFieldsVersion = 3;
		} else if (window.hasOwnProperty('carbonFields')) {
			this.carbonFieldsVersion = 2;
		}

		// carbon fields probably isn't loaded
		if (this.carbonFieldsVersion === undefined) {
			return;
		}

		this.additionalContent = '';

		/*
		 * Change this value to update the frequency at which the readability is checked
		 */
		this.refreshInterval = 300;

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

		_self.invokeUpdate();

		if (_self.carbonFieldsVersion === 3) {

			window.cf.vendor['@wordpress/data'].subscribe(lodash.debounce(function () {

				_self.invokeUpdate();

			}, this.refreshInterval));

		} else if (_self.carbonFieldsVersion === 2) {

			$(document).on('carbonFields.fieldUpdated', lodash.debounce(function () {

				_self.invokeUpdate();

			}, this.refreshInterval));

		}

		YoastSEO.app.pluginReady('CarbonYoastPlugin');

		YoastSEO.app.registerModification('content', function (content) {
			return content + ' ' + _self.additionalContent;
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

	CarbonYoast.prototype.invokeUpdate = function () {
		this.additionalContent = this.getAdditionalContent();

		YoastSEO.app.refresh();
	};

	CarbonYoast.prototype.getAdditionalContent = function () {
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
