# Carbon Fields Yoast

__Carbon Fields Yoast__ is an addon to Carbon Fields that allows developers to choose which fields from Carbon Fields to include in the Yoast readability score meter.

## How to use?

Install via composer:

```bash
composer require htmlburger/carbon-fields-yoast
```

In `functions.php`, add the following:

```php
add_action( 'after_setup_theme', 'crb_setup_theme' );
function crb_setup_theme() {
	include_once __DIR__ . '/vendor/autoload.php';

	new \Carbon_Fields_Yoast\Carbon_Fields_Yoast;
}

add_action( 'admin_enqueue_scripts', 'crb_enqueue_admin_scripts' );
function crb_enqueue_admin_scripts() {
	wp_enqueue_script( 'crb-admin', get_stylesheet_directory_uri() . '/js/admin.js', array( 'carbon-fields-yoast' ) );
}
```

In `js/admin.js` in your theme, add the following:

```js
var $doc = $(document);
var $win = $(window);

$doc.ready(function () {
	$win.on('YoastSEO:ready', function () {
		new CarbonFieldsYoast();
	});
});
```

This will initialize the Carbon Fields Yoast addon. The `CarbonFieldsYoast` object accepts the following arguments:

`[Number] refreshInterval - Defaults to 300ms`

This is the time interval on which the meta fields are being parsed.

`[Array] fieldsByTypeToExclude`

This contains the type of fields that shouldn't be parsed. By default, only text, textarea and rich text fields are being parsed.

`[Array] fieldsByNameToExclude`

This contains the name of the fields that shouldn't be parsed. By default, there aren't excluded fields.
