<?php
/**
 * Admin Dashboard UI and CSV Export for Divine Lotus Consent Plugin
 */

if (!defined('ABSPATH')) {
    exit;
}

class Divine_Consent_Admin {

    public static function init() {
        add_action('admin_menu', [__CLASS__, 'register_admin_menu']);
        add_action('admin_init', [__CLASS__, 'handle_csv_export']);
    }

    public static function register_admin_menu() {
        add_menu_page(
            'Divine Lotus Consents',
            'Consent Logs',
            'manage_options',
            'divine-consent-logs',
            [__CLASS__, 'render_admin_page'],
            'dashicons-shield',
            26
        );
    }

    public static function handle_csv_export() {
        if (!isset($_GET['page']) || $_GET['page'] !== 'divine-consent-logs' || !isset($_GET['action']) || $_GET['action'] !== 'export_csv') {
            return;
        }

        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized user.');
        }

        check_admin_referer('divine_export_consents_nonce');

        global $wpdb;
        $table = Divine_Consent_DB::get_table_name();
        $results = $wpdb->get_results("SELECT * FROM $table ORDER BY created_at DESC", ARRAY_A);

        $filename = 'divine-lotus-consents-' . date('Y-m-d-His') . '.csv';

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=' . $filename);

        $output = fopen('php://output', 'w');
        fputcsv($output, ['ID', 'UUID', 'Status', 'Essential', 'Analytics', 'Advertising', 'IP Address', 'Device Type', 'Browser', 'OS', 'Screen', 'Page URL', 'Referrer', 'Date']);

        if (!empty($results)) {
            foreach ($results as $row) {
                fputcsv($output, [
                    $row['id'],
                    $row['consent_uuid'],
                    $row['consent_status'],
                    $row['essential'] ? 'Yes' : 'No',
                    $row['analytics'] ? 'Yes' : 'No',
                    $row['advertising'] ? 'Yes' : 'No',
                    $row['ip_address'],
                    $row['device_type'],
                    $row['browser'],
                    $row['operating_system'],
                    $row['screen_resolution'],
                    $row['page_url'],
                    $row['referrer'],
                    $row['created_at'],
                ]);
            }
        }

        fclose($output);
        exit;
    }

    public static function render_admin_page() {
        $stats = Divine_Consent_DB::get_statistics();

        $page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
        $limit = 25;
        $offset = ($page - 1) * $limit;
        $search = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
        $status = isset($_GET['consent_status']) ? sanitize_text_field($_GET['consent_status']) : '';

        $logs_data = Divine_Consent_DB::get_logs($limit, $offset, $search, $status);
        $total_items = $logs_data['total'];
        $total_pages = ceil($total_items / $limit);
        $items = $logs_data['items'];

        $export_url = wp_nonce_url(admin_url('admin.php?page=divine-consent-logs&action=export_csv'), 'divine_export_consents_nonce');
        ?>
        <div class="wrap" style="max-width: 1300px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 18px; margin-bottom: 22px;">
                <div>
                    <h1 style="font-size: 24px; font-weight: 700; color: #1E140D; display: flex; align-items: center; gap: 8px;">
                        <span class="dashicons dashicons-shield" style="font-size: 28px; width: 28px; height: 28px; color: #876540;"></span>
                        Divine Lotus  - User Consent & Device Logs
                    </h1>
                    <p style="color: #666; font-size: 13px; margin: 4px 0 0 0;">Audit logs of user privacy consent decisions, IP addresses, and device signatures.</p>
                </div>
                <a href="<?php echo esc_url($export_url); ?>" class="button button-primary" style="background: #876540; border-color: #725232; padding: 4px 14px; height: auto; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">
                    <span class="dashicons dashicons-download" style="font-size: 16px; width: 16px; height: 16px; margin-top: 1px;"></span>
                    Export CSV Audit
                </a>
            </div>

            <!-- Stats Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px;">
                <div style="background: #fff; border: 1px solid #e2e4e7; border-radius: 10px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #876540; letter-spacing: 0.05em;">Total Consents</div>
                    <div style="font-size: 28px; font-weight: 700; color: #1E140D; margin-top: 6px;"><?php echo number_format($stats['total']); ?></div>
                </div>
                <div style="background: #fff; border: 1px solid #e2e4e7; border-radius: 10px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #2e7d32; letter-spacing: 0.05em;">Accepted All</div>
                    <div style="font-size: 28px; font-weight: 700; color: #2e7d32; margin-top: 6px;">
                        <?php echo number_format($stats['accepted_all']); ?>
                        <span style="font-size: 13px; font-weight: 500; color: #666;">(<?php echo $stats['total'] > 0 ? round(($stats['accepted_all'] / $stats['total']) * 100) : 0; ?>%)</span>
                    </div>
                </div>
                <div style="background: #fff; border: 1px solid #e2e4e7; border-radius: 10px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #c62828; letter-spacing: 0.05em;">Rejected Non-Essential</div>
                    <div style="font-size: 28px; font-weight: 700; color: #c62828; margin-top: 6px;">
                        <?php echo number_format($stats['rejected']); ?>
                        <span style="font-size: 13px; font-weight: 500; color: #666;">(<?php echo $stats['total'] > 0 ? round(($stats['rejected'] / $stats['total']) * 100) : 0; ?>%)</span>
                    </div>
                </div>
                <div style="background: #fff; border: 1px solid #e2e4e7; border-radius: 10px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #1565c0; letter-spacing: 0.05em;">Device Split</div>
                    <div style="font-size: 15px; font-weight: 600; color: #333; margin-top: 10px;">
                        🖥️ Desktop: <strong><?php echo number_format($stats['desktop']); ?></strong> &nbsp;|&nbsp; 📱 Mobile: <strong><?php echo number_format($stats['mobile']); ?></strong>
                    </div>
                </div>
            </div>

            <!-- Filter / Search Form -->
            <form method="get" style="margin-bottom: 14px; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                <input type="hidden" name="page" value="divine-consent-logs" />
                <input type="search" name="s" value="<?php echo esc_attr($search); ?>" placeholder="Search IP, Browser, OS, UUID..." style="width: 280px; height: 32px;" />
                <select name="consent_status" style="height: 32px;">
                    <option value="">All Statuses</option>
                    <option value="accept_all" <?php selected($status, 'accept_all'); ?>>Accepted All</option>
                    <option value="reject_non_essential" <?php selected($status, 'reject_non_essential'); ?>>Rejected Non-Essential</option>
                    <option value="custom" <?php selected($status, 'custom'); ?>>Custom Settings</option>
                </select>
                <input type="submit" class="button" value="Filter Logs" />
                <?php if (!empty($search) || !empty($status)) : ?>
                    <a href="<?php echo admin_url('admin.php?page=divine-consent-logs'); ?>" class="button button-link">Reset</a>
                <?php endif; ?>
            </form>

            <!-- Table -->
            <table class="wp-list-table widefat fixed striped table-view-list" style="border-radius: 8px; overflow: hidden; border: 1px solid #ccd0d4;">
                <thead>
                    <tr>
                        <th style="width: 140px;">Date & Time</th>
                        <th style="width: 140px;">IP Address</th>
                        <th style="width: 160px;">Decision</th>
                        <th style="width: 150px;">Permissions</th>
                        <th style="width: 180px;">Device & OS</th>
                        <th style="width: 140px;">Browser</th>
                        <th>Page / Referrer</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($items)) : ?>
                        <?php foreach ($items as $item) : ?>
                            <tr>
                                <td style="font-size: 12px; color: #555;">
                                    <strong><?php echo esc_html(date('M j, Y', strtotime($item->created_at))); ?></strong><br />
                                    <span style="color: #888; font-size: 11px;"><?php echo esc_html(date('H:i:s', strtotime($item->created_at))); ?> UTC</span>
                                </td>
                                <td>
                                    <code style="font-size: 11px; background: #f0f0f1; padding: 2px 5px; border-radius: 4px;"><?php echo esc_html($item->ip_address); ?></code>
                                </td>
                                <td>
                                    <?php if ($item->consent_status === 'accept_all') : ?>
                                        <span style="background: #e8f5e9; color: #2e7d32; font-weight: 600; padding: 3px 8px; border-radius: 12px; font-size: 11px; display: inline-block;">Accepted All</span>
                                    <?php elseif ($item->consent_status === 'reject_non_essential') : ?>
                                        <span style="background: #ffebee; color: #c62828; font-weight: 600; padding: 3px 8px; border-radius: 12px; font-size: 11px; display: inline-block;">Rejected Non-Ess.</span>
                                    <?php else : ?>
                                        <span style="background: #fff8e1; color: #f57f17; font-weight: 600; padding: 3px 8px; border-radius: 12px; font-size: 11px; display: inline-block;">Customized</span>
                                    <?php endif; ?>
                                </td>
                                <td style="font-size: 11.5px;">
                                    <span title="Essential" style="color: #2e7d32;">● Essential</span><br />
                                    <span title="Analytics" style="color: <?php echo $item->analytics ? '#2e7d32' : '#999'; ?>;">
                                        <?php echo $item->analytics ? '● Analytics' : '○ Analytics'; ?>
                                    </span><br />
                                    <span title="Advertising" style="color: <?php echo $item->advertising ? '#2e7d32' : '#999'; ?>;">
                                        <?php echo $item->advertising ? '● Ads' : '○ Ads'; ?>
                                    </span>
                                </td>
                                <td style="font-size: 12px;">
                                    <strong><?php echo ucfirst(esc_html($item->device_type)); ?></strong><br />
                                    <span style="color: #666; font-size: 11px;"><?php echo esc_html($item->operating_system); ?></span>
                                </td>
                                <td style="font-size: 12px;">
                                    <?php echo esc_html($item->browser); ?>
                                    <?php if (!empty($item->screen_resolution)) : ?>
                                        <br /><span style="font-size: 10px; color: #888;"><?php echo esc_html($item->screen_resolution); ?></span>
                                    <?php endif; ?>
                                </td>
                                <td style="font-size: 11px; word-break: break-all; color: #666;">
                                    <?php if (!empty($item->page_url)) : ?>
                                        <a href="<?php echo esc_url($item->page_url); ?>" target="_blank" rel="noopener" style="color: #876540; text-decoration: none;">
                                            <?php echo esc_html(wp_trim_words($item->page_url, 6, '...')); ?>
                                        </a>
                                    <?php else : ?>
                                        &mdash;
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <tr>
                            <td colspan="7" style="text-align: center; padding: 24px; color: #888;">
                                No consent records recorded yet. As visitors accept or customize cookies, entries will populate here automatically.
                            </td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>

            <!-- Pagination -->
            <?php if ($total_pages > 1) : ?>
                <div class="tablenav" style="margin-top: 14px;">
                    <div class="tablenav-pages">
                        <span class="displaying-num"><?php echo number_format($total_items); ?> records</span>
                        <?php
                        echo paginate_links([
                            'base'      => add_query_arg('paged', '%#%'),
                            'format'    => '',
                            'prev_text' => '&laquo;',
                            'next_text' => '&raquo;',
                            'total'     => $total_pages,
                            'current'   => $page,
                        ]);
                        ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }
}
