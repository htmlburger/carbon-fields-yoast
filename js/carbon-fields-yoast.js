var CarbonFieldsYoast = (function($) {

	var CarbonFieldsYoast = function(params) {
		params = params || {};

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

		/**
		 * Change this value to update the frequency at which the readability is checked
		 */
		this.refreshInterval = params.refreshInterval || 300;

		/**
		 * Add/remove types of fields you wish to ignore to this array
		 */
		this.fieldsByTypeToExclude = params.fieldsByTypeToExclude || [
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

		/**
		 * Add names of fields you wish to ignore to this array
		 */
		this.fieldsByNameToExclude = params.fieldsByNameToExclude || [];

		YoastSEO.app.registerPlugin('CarbonFieldsYoastPlugin', {
			status: 'ready'
		});

		this.init();
	}

	CarbonFieldsYoast.prototype.init = function() {
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

		YoastSEO.app.pluginReady('CarbonFieldsYoastPlugin');

		YoastSEO.app.registerModification('content', function (content) {
			return content + ' ' + _self.additionalContent;
		}, 'CarbonFieldsYoastPlugin', 5);
	};

	CarbonFieldsYoast.prototype.shouldSkipField = function (field) {
		return this.fieldsByTypeToExclude.indexOf(field.type) !== -1 || this.fieldsByNameToExclude.indexOf(field.base_name) !== -1
	};

	CarbonFieldsYoast.prototype.getFieldContent = function (field) {
		return field.value;
	};

	CarbonFieldsYoast.prototype.invokeUpdate = function () {
		this.additionalContent = this.getAdditionalContent();

		YoastSEO.app.refresh();
	};

	CarbonFieldsYoast.prototype.getAdditionalContent = function () {
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
			// we can skip complex fields, as their children are
			// already present in the main fields array
			if (field.type === 'complex') {
				return;
			}

			fieldsContentParts.push(_self.getFieldContent(field));
		});

		return fieldsContentParts.join(' ');
	};

	return CarbonFieldsYoast;

})(jQuery);
