<?php
/**
 * Database schema and operations for Divine Lotus Consent Plugin
 */

if (!defined('ABSPATH')) {
    exit;
}

class Divine_Consent_DB {

    public static function get_table_name() {
        global $wpdb;
        return $wpdb->prefix . 'divine_consent_logs';
    }

    /**
     * Create the database table upon plugin activation
     */
    public static function create_table() {
        global $wpdb;
        $table_name = self::get_table_name();
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            consent_uuid VARCHAR(64) NOT NULL,
            consent_status VARCHAR(32) NOT NULL DEFAULT 'custom',
            essential TINYINT(1) NOT NULL DEFAULT 1,
            analytics TINYINT(1) NOT NULL DEFAULT 0,
            advertising TINYINT(1) NOT NULL DEFAULT 0,
            ip_address VARCHAR(45) NOT NULL DEFAULT '',
            device_type VARCHAR(32) NOT NULL DEFAULT 'desktop',
            browser VARCHAR(64) NOT NULL DEFAULT '',
            operating_system VARCHAR(64) NOT NULL DEFAULT '',
            screen_resolution VARCHAR(32) NULL,
            page_url VARCHAR(255) NULL,
            referrer VARCHAR(255) NULL,
            user_agent TEXT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (id),
            KEY idx_uuid (consent_uuid),
            KEY idx_ip (ip_address),
            KEY idx_status (consent_status),
            KEY idx_created (created_at)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    /**
     * Insert or update a consent log
     */
    public static function save_consent($data) {
        global $wpdb;
        $table = self::get_table_name();
        $now = current_time('mysql');

        $consent_uuid = sanitize_text_field($data['consent_uuid'] ?? '');
        if (empty($consent_uuid)) {
            $consent_uuid = wp_generate_uuid4();
        }

        $row_data = [
            'consent_uuid'      => $consent_uuid,
            'consent_status'    => sanitize_text_field($data['consent_status'] ?? 'custom'),
            'essential'         => !empty($data['essential']) ? 1 : 0,
            'analytics'         => !empty($data['analytics']) ? 1 : 0,
            'advertising'       => !empty($data['advertising']) ? 1 : 0,
            'ip_address'        => sanitize_text_field($data['ip_address'] ?? ''),
            'device_type'       => sanitize_text_field($data['device_type'] ?? 'desktop'),
            'browser'           => sanitize_text_field($data['browser'] ?? 'Unknown'),
            'operating_system'  => sanitize_text_field($data['operating_system'] ?? 'Unknown'),
            'screen_resolution' => sanitize_text_field($data['screen_resolution'] ?? ''),
            'page_url'          => esc_url_raw($data['page_url'] ?? ''),
            'referrer'          => esc_url_raw($data['referrer'] ?? ''),
            'user_agent'        => sanitize_textarea_field($data['user_agent'] ?? ''),
            'updated_at'        => $now,
        ];

        // Check if existing record exists for this UUID
        $existing = $wpdb->get_var($wpdb->prepare(
            "SELECT id FROM $table WHERE consent_uuid = %s LIMIT 1",
            $consent_uuid
        ));

        if ($existing) {
            $wpdb->update($table, $row_data, ['id' => $existing]);
            return ['id' => $existing, 'uuid' => $consent_uuid, 'action' => 'updated'];
        } else {
            $row_data['created_at'] = $now;
            $wpdb->insert($table, $row_data);
            return ['id' => $wpdb->insert_id, 'uuid' => $consent_uuid, 'action' => 'inserted'];
        }
    }

    /**
     * Get paginated logs for admin table
     */
    public static function get_logs($limit = 50, $offset = 0, $search = '', $status = '') {
        global $wpdb;
        $table = self::get_table_name();

        $where = [];
        $params = [];

        if (!empty($search)) {
            $where[] = "(ip_address LIKE %s OR consent_uuid LIKE %s OR browser LIKE %s OR operating_system LIKE %s)";
            $wildcard = '%' . $wpdb->esc_like($search) . '%';
            $params[] = $wildcard;
            $params[] = $wildcard;
            $params[] = $wildcard;
            $params[] = $wildcard;
        }

        if (!empty($status)) {
            $where[] = "consent_status = %s";
            $params[] = $status;
        }

        $where_sql = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

        $total_sql = "SELECT COUNT(*) FROM $table $where_sql";
        $total = !empty($params) ? $wpdb->get_var($wpdb->prepare($total_sql, ...$params)) : $wpdb->get_var($total_sql);

        $data_sql = "SELECT * FROM $table $where_sql ORDER BY created_at DESC LIMIT %d OFFSET %d";
        $params[] = $limit;
        $params[] = $offset;

        $items = $wpdb->get_results($wpdb->prepare($data_sql, ...$params));

        return [
            'total' => (int) $total,
            'items' => $items,
        ];
    }

    /**
     * Get aggregate statistics
     */
    public static function get_statistics() {
        global $wpdb;
        $table = self::get_table_name();

        // Check if table exists
        if ($wpdb->get_var("SHOW TABLES LIKE '$table'") !== $table) {
            return [
                'total' => 0,
                'accepted_all' => 0,
                'rejected' => 0,
                'custom' => 0,
                'mobile' => 0,
                'desktop' => 0,
            ];
        }

        $total = (int) $wpdb->get_var("SELECT COUNT(*) FROM $table");
        $accepted = (int) $wpdb->get_var("SELECT COUNT(*) FROM $table WHERE consent_status = 'accept_all'");
        $rejected = (int) $wpdb->get_var("SELECT COUNT(*) FROM $table WHERE consent_status = 'reject_non_essential'");
        $custom = (int) $wpdb->get_var("SELECT COUNT(*) FROM $table WHERE consent_status = 'custom'");
        $mobile = (int) $wpdb->get_var("SELECT COUNT(*) FROM $table WHERE device_type IN ('mobile', 'tablet')");
        $desktop = (int) $wpdb->get_var("SELECT COUNT(*) FROM $table WHERE device_type = 'desktop'");

        return [
            'total' => $total,
            'accepted_all' => $accepted,
            'rejected' => $rejected,
            'custom' => $custom,
            'mobile' => $mobile,
            'desktop' => $desktop,
        ];
    }
}
