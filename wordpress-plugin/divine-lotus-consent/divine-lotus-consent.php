<?php
/**
 * Plugin Name: Divine Lotus  - Privacy Consent & Device Logger
 * Plugin URI:  https://thedivinelotus.org
 * Description: Captures user cookie consent choices, device details (OS, browser, screen, device type), and IP addresses with a searchable admin audit log and CSV export for GDPR/ePrivacy compliance.
 * Version:     1.0.0
 * Author:      Divine Lotus
 * Author URI:  https://thedivinelotus.org
 * License:     GPL-2.0+
 * Text Domain: divine-lotus-consent
 */

if (!defined('ABSPATH')) {
    exit;
}

define('DIVINE_CONSENT_VERSION', '1.0.0');
define('DIVINE_CONSENT_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DIVINE_CONSENT_PLUGIN_URL', plugin_dir_url(__FILE__));

// Load Classes
require_once DIVINE_CONSENT_PLUGIN_DIR . 'includes/class-consent-db.php';
require_once DIVINE_CONSENT_PLUGIN_DIR . 'includes/class-consent-api.php';
require_once DIVINE_CONSENT_PLUGIN_DIR . 'includes/class-consent-admin.php';

// Activation Hook: Create DB table
register_activation_hook(__FILE__, function() {
    Divine_Consent_DB::create_table();
});

// Initialize Components
add_action('plugins_loaded', function() {
    Divine_Consent_API::init();
    if (is_admin()) {
        Divine_Consent_Admin::init();
    }
});
