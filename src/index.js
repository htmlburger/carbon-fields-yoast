/**
 * Internal dependencies
 */
import CarbonFieldsYoast from './carbon-fields-yoast';

/**
 * Initialize module
 */
if ( window.hasOwnProperty( 'cf' ) ) {
	if (
		typeof YoastSEO !== 'undefined'
		&& typeof YoastSEO.app !== 'undefined'
	) {
		new CarbonFieldsYoast();
	} else {
		jQuery( window ).on( 'YoastSEO:ready', () => {
			new CarbonFieldsYoast();
		} );
	}
}
