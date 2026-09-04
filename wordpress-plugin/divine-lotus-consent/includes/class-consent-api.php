<?php
/**
 * REST API Endpoint & Device/IP detection for Divine Lotus Consent Plugin
 */

if (!defined('ABSPATH')) {
    exit;
}

class Divine_Consent_API {

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_routes']);
        add_action('init', [__CLASS__, 'handle_cors_preflight']);
    }

    /**
     * Handle CORS preflight requests
     */
    public static function handle_cors_preflight() {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' && strpos($_SERVER['REQUEST_URI'] ?? '', '/wp-json/divine/v1/') !== false) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: POST, OPTIONS, GET');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
            header('Access-Control-Max-Age: 86400');
            status_header(200);
            exit;
        }
    }

    /**
     * Register REST API routes
     */
    public static function register_routes() {
        register_rest_route('divine/v1', '/consent', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_record_consent'],
            'permission_callback' => '__return_true', // Public consent logging endpoint
        ]);

        register_rest_route('divine/v1', '/consent/stats', [
            'methods'             => 'GET',
            'callback'            => [__CLASS__, 'handle_get_stats'],
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
        ]);
    }

    /**
     * Handle POST /wp-json/divine/v1/consent
     */
    public static function handle_record_consent($request) {
        // Send CORS headers
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

        $params = $request->get_json_params();
        if (empty($params)) {
            $params = $request->get_params();
        }

        $ip = self::get_client_ip();
        $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? ($params['user_agent'] ?? '');
        $device_info = self::parse_device_info($user_agent);

        $consent_data = [
            'consent_uuid'      => $params['consent_uuid'] ?? '',
            'consent_status'    => $params['consent_status'] ?? 'custom',
            'essential'         => $params['preferences']['essential'] ?? ($params['essential'] ?? 1),
            'analytics'         => $params['preferences']['analytics'] ?? ($params['analytics'] ?? 0),
            'advertising'       => $params['preferences']['advertising'] ?? ($params['advertising'] ?? 0),
            'ip_address'        => $ip,
            'device_type'       => $params['device_type'] ?? $device_info['device_type'],
            'browser'           => $params['browser'] ?? $device_info['browser'],
            'operating_system'  => $params['operating_system'] ?? $device_info['os'],
            'screen_resolution' => $params['screen_resolution'] ?? '',
            'page_url'          => $params['page_url'] ?? ($_SERVER['HTTP_REFERER'] ?? ''),
            'referrer'          => $params['referrer'] ?? '',
            'user_agent'        => $user_agent,
        ];

        $result = Divine_Consent_DB::save_consent($consent_data);

        return new WP_REST_Response([
            'success'      => true,
            'message'      => 'Consent preferences recorded successfully.',
            'consent_uuid' => $result['uuid'],
            'action'       => $result['action'],
        ], 200);
    }

    /**
     * Handle GET /wp-json/divine/v1/consent/stats
     */
    public static function handle_get_stats() {
        $stats = Divine_Consent_DB::get_statistics();
        return new WP_REST_Response([
            'success' => true,
            'data'    => $stats,
        ], 200);
    }

    /**
     * Accurate client IP extraction supporting proxies, Cloudflare, etc.
     */
    public static function get_client_ip() {
        $ip_keys = [
            'HTTP_CF_CONNECTING_IP', // Cloudflare
            'HTTP_X_REAL_IP',        // Nginx proxy
            'HTTP_X_FORWARDED_FOR',  // Standard proxy chain
            'HTTP_CLIENT_IP',
            'REMOTE_ADDR'
        ];

        foreach ($ip_keys as $key) {
            if (!empty($_SERVER[$key])) {
                $ips = explode(',', $_SERVER[$key]);
                $ip = trim($ips[0]);
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }

        return '127.0.0.1';
    }

    /**
     * Parse User Agent into Device Type, Browser, and OS
     */
    public static function parse_device_info($user_agent) {
        $ua = strtolower($user_agent);

        // 1. Device Type
        $device_type = 'desktop';
        if (preg_match('/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i', $user_agent)) {
            $device_type = 'tablet';
        } elseif (preg_match('/(mobile|iphone|ipod|blackberry|android|iemobile|opera mini|webos)/i', $user_agent)) {
            $device_type = 'mobile';
        }

        // 2. Operating System
        $os = 'Unknown OS';
        if (strpos($ua, 'windows') !== false) {
            $os = 'Windows';
        } elseif (strpos($ua, 'macintosh') !== false || strpos($ua, 'mac os x') !== false) {
            $os = 'macOS';
        } elseif (strpos($ua, 'iphone') !== false || strpos($ua, 'ipad') !== false) {
            $os = 'iOS';
        } elseif (strpos($ua, 'android') !== false) {
            $os = 'Android';
        } elseif (strpos($ua, 'linux') !== false) {
            $os = 'Linux';
        }

        // 3. Browser
        $browser = 'Unknown Browser';
        if (strpos($ua, 'edg') !== false) {
            $browser = 'Microsoft Edge';
        } elseif (strpos($ua, 'chrome') !== false && strpos($ua, 'edg') === false) {
            $browser = 'Google Chrome';
        } elseif (strpos($ua, 'safari') !== false && strpos($ua, 'chrome') === false) {
            $browser = 'Apple Safari';
        } elseif (strpos($ua, 'firefox') !== false) {
            $browser = 'Mozilla Firefox';
        } elseif (strpos($ua, 'opera') !== false || strpos($ua, 'opr') !== false) {
            $browser = 'Opera';
        }

        return [
            'device_type' => $device_type,
            'os'          => $os,
            'browser'     => $browser,
        ];
    }
}
