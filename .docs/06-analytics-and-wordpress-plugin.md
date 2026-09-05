# 06. Analytics & WordPress Consent Plugin

## 1. Overview
The platform integrates **Google Analytics 4 (GA4)** with **Google Consent Mode v2** and a custom **WordPress Telemetry & Consent Database Plugin** to record practitioner preferences, session telemetry, screen dimensions, and device fingerprints in compliance with GDPR and privacy standards.

---

## 2. Google Tag (GA4) Implementation

- **Measurement ID**: `G-ZSSGEY2MH8`
- **Location**: Injected directly into the SSR `<head>` of `src/app/layout.tsx`.

```tsx
<head>
  {/* Google tag (gtag.js) */}
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-ZSSGEY2MH8"
  />
  <script
    id="google-tag-init"
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ZSSGEY2MH8');
      `,
    }}
  />
...
```

### Consent Mode v2 Synchronization
When practitioners accept or adjust preferences in `CookieBanner.tsx`, dynamic consent events are triggered to Google Tag Manager:

```ts
if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
  (window as any).gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.advertising ? "granted" : "denied",
  });
}
```

---

## 3. WordPress Consent Plugin (`divine-lotus-consent`)

Located in `wordpress-plugin/divine-lotus-consent/`.

### Key Features
1. **REST API Endpoint**: Exposes `/wp-json/divine/v1/consent` (public `POST` with nonces/rate limiting).
2. **Database Schema**: Creates dedicated table `wp_divine_consents` upon plugin activation:
   ```sql
   CREATE TABLE wp_divine_consents (
     id bigint(20) NOT NULL AUTO_INCREMENT,
     consent_uuid varchar(64) NOT NULL,
     ip_address varchar(45) NOT NULL,
     user_agent text NOT NULL,
     device_type varchar(20) NOT NULL,
     os varchar(50) NOT NULL,
     browser varchar(50) NOT NULL,
     screen_resolution varchar(30) DEFAULT NULL,
     page_url text DEFAULT NULL,
     referrer text DEFAULT NULL,
     consent_status varchar(30) NOT NULL,
     preferences_json longtext NOT NULL,
     created_at datetime DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY (id),
     KEY consent_uuid (consent_uuid),
     KEY created_at (created_at)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
   ```
3. **Admin Dashboard**: Adds a WordPress admin menu item under **Divine Lotus Consent** with searchable, paginated logs, filterable by consent status (`accept_all`, `reject_non_essential`, `custom`), and CSV export capabilities.

### Payload Structure Sent from Next.js
```json
{
  "consent_uuid": "usr_8f2a91b4...",
  "consent_status": "accept_all",
  "preferences": {
    "essential": true,
    "analytics": true,
    "advertising": true
  },
  "screen_resolution": "1920x1080",
  "page_url": "https://thedivinelotus.org/",
  "referrer": "https://google.com"
}
```

### Plugin Installation on WordPress
1. A ready-to-upload zip archive is located at: `divine-lotus-consent.zip` in the repository root.
2. In WordPress Admin, navigate to **Plugins → Add New → Upload Plugin**.
3. Select `divine-lotus-consent.zip` and click **Install Now** → **Activate Plugin**.
