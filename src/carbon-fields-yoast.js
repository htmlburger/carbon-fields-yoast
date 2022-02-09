class CarbonFieldsYoast {
	/**
	 * Plugin name.
	 *
	 * @type {String}
	 */
	name = 'CarbonFieldsYoast';

	/**
	 * Plugin version.
	 *
	 * @type {String}
	 */
	version = '2.0.0-alpha.1';

	/**
	 * Additional content.
	 *
	 * @type {String}
	 */
	additionalContent = '';

	/**
	 * Refresh interval in ms.
	 *
	 * @type {Number}
	 */
	refreshInterval = 300;

	/**
	 * Constructor
	 *
	 * @type {Object} params
	 */
	constructor(params = {}) {
		this.additionalContent = '';

		this.init();
	}

	/**
	 * Initialize.
	 *
	 * @return {void}
	 */
	init() {
		YoastSEO.app.registerPlugin(this.name, {
			status: 'ready'
		});

		YoastSEO.app.registerModification('content', (content) => {
			return content + ' ' + this.additionalContent;
		}, this.name, 5);

		this.invokeUpdate();

		window.cf.vendor['@wordpress/data'].subscribe(() => {
			this.invokeUpdate();
		});
	}

	/**
	 * Refresh content with field updates.
	 *
	 * @return {void}
	 */
	async invokeUpdate() {
		await setTimeout(async () => {
			this.additionalContent = '';

			const fields = window.cf.vendor['@wordpress/data']
				.select('carbon-fields/metaboxes')
				.getFields();

			for (let fieldId in fields) {
				const field = fields[fieldId];

				// Other fields
				this.additionalContent += await this.getFieldContent(field);
			}

			YoastSEO.app.pluginReloaded(this.name);
		}, this.refreshInterval);
	}

	/**
	 * Returns the value of a field.
	 *
	 * @param {Object} field
	 * @return {String}
	 */
	async getFieldContent(field) {
		let content = '';

		// Complex field
		if (field.type === 'complex') {
			// do nothing..
		} else if ((['image', 'media_gallery'].indexOf(field.type) !== -1) && field.value) {
			const attachments = await window.wp.ajax.post( 'query-attachments', {
				query: {
					post__in: field.type === 'media_gallery' ? field.value : [ field.value ]
				}
			} );

			attachments.forEach( ( attachment ) => {
				content += `<img src="${attachment.url}" alt="${attachment.alt}" title="${attachment.title}">`;
			});
		}

		return content;
	}
}

export default CarbonFieldsYoast;
