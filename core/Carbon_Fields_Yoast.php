<?php

namespace Carbon_Fields_Yoast;

class Carbon_Fields_Yoast {
	/**
	 * Constructor.
	 *
	 * @access public
	 *
	 * @return void
	 */
	public function __construct() {
		if ( ! class_exists( 'Carbon_Fields\\Carbon_Fields' ) ) {
			return;
		}

		require_once dirname(__DIR__) . '/config.php';

		add_action( 'admin_print_footer_scripts', array( $this, 'enqueue_assets' ), 8 );
	}

	/**
	 * Enqueues the assets.
	 *
	 * @access public
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		$isDevelopment = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG;

		wp_enqueue_script(
			'carbon-fields-yoast',
			\Carbon_Fields_Yoast\URL . '/dist/carbon-fields-yoast' . ($isDevelopment ? '' : '.min') . '.js',
			array( 'carbon-fields-core' ),
			\Carbon_Fields_Yoast\VERSION,
			true
		);
	}
}
