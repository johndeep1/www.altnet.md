# Public API Documentation

This document covers all unauthenticated endpoints intended for external teams. Use the `/api/v1/public` routes for storefront-style access (slug support, active-only). The `/api/v1` routes are ID-based and expose more raw, admin-style data.

## Base URLs
- Base host: `http://localhost:8080`
- Storefront API: `http://localhost:8080/api/v1/public`
- Core read-only API: `http://localhost:8080/api/v1`
- Health check: `http://localhost:8080/health`

## Conventions
- Pagination (most list endpoints): `limit` (default 50, max 100), `offset` (default 0)
- Responses:
  - Most lists: `{ "data": [...], "meta": { "total": n, "limit": n, "offset": n } }`
  - Some lists: `{ "data": [...], "pagination": { "total": n, "limit": n, "offset": n } }`
- Errors:
  - `/api/v1/public`: `{ "error": "Message", "details": "..." }`
  - `/api/v1`: `{ "error": { "error": "Message", "details": "..." } }`
- IDs:
  - `/api/v1/public` accepts **UUID or slug** in `{identifier}` routes (UUID wins if it parses)
  - `/api/v1` accepts **UUID only**
- Arrays are stored as JSON arrays: `images`, `videos`, `barcodes`, `prices`, `benefits`, `special_benefits`

## Storefront API (Recommended) - `/api/v1/public`

### Products
- `GET /products`
  - Query params:
    - `brand` (slug or UUID), `brand_id` (UUID, legacy)
    - `category` (slug or UUID), `category_id` (UUID, legacy)
    - `search` (name/description/code)
    - `min_price`, `max_price` (legacy range, uses `price_min`/`price_max`)
    - `in_stock=true` (filters stock)
    - `sort_by`: `name_asc`, `name_desc`, `price_high`, `price_low` (price sort uses `price_mdl`)
    - `properties[PropertyName]=Value` (filterable only, case-sensitive)
    - `limit`, `offset`
  - Returns `ProductSummary` objects.
- `GET /products/{id|slug}`
  - Returns `ProductDetail` including brand, category, and properties.

ProductSummary fields (list endpoints):
- `id`, `ultra_id`, `code`, `article`, `name`, `slug`, `description`
- `brand_id`, `brand_name`, `category_id`, `category_name`
- `parent_id`, `source_id`, `source_name`
- `main_image_url`, `images`, `warranty`, `barcodes`
- `price_min`, `price_max`, `prices`, `price_mdl`, `price_eur`, `price_usd`
- `total_stock`, `is_in_stock`, `is_active`, `is_service`
- `name_ru`, `name_ro`
- `manual_discount_percent`, `effective_discount_percent`, `discounted_price_mdl`, `discounted_price_eur`, `discounted_price_usd`
- `active_promotions` (array of Promotion objects)
- `created_at`, `updated_at`

ProductDetail adds:
- `brand`: `{ id, name, slug, logo_url }`
- `category`: `{ id, name, slug, parent_id, name_ru, name_ro }`
- `properties`: array of Property objects (see below)
- `property_count`
- `description_ru`, `description_ro` (nullable)

Example:
```bash
curl "http://localhost:8080/api/v1/public/products?brand=samsung&category=smartphones&in_stock=true"
curl "http://localhost:8080/api/v1/public/products/samsung-galaxy-s24-ultra"
```

### Brands
- `GET /brands`
  - Query params: `search`, `has_products` (`true`/`false`), `sort_by` (`name_asc`, `name_desc`, `products_asc`, `products_desc`), `limit`, `offset`
- `GET /brands/{id|slug}`
- `GET /brands/{id|slug}/products`
  - Query params: `search`, `in_stock`, `sort_by`, `properties[PropertyName]=Value`, `limit`, `offset`

Brand fields:
- `id`, `ultra_id`, `code`, `name`, `slug`, `logo_url`, `is_active`, `product_count`, `created_at`, `updated_at`

### Categories
- `GET /categories`
  - Query params: `parent_id` (UUID), `limit`, `offset`
- `GET /categories/{id|slug}` (includes `subcategories`)
- `GET /categories/{id|slug}/products`
  - Query params: `brand` (slug/UUID), `search`, `in_stock`, `sort_by`, `properties[PropertyName]=Value`, `limit`, `offset`

Category fields:
- `id`, `ultra_id`, `code`, `parent_id`, `name`, `slug`, `sort_order`
- `image_url`, `product_count`, `is_active`, `name_ru`, `name_ro`, `created_at`, `updated_at`

### Filterable Properties
- `GET /properties/filters`
  - Optional: `category` (slug or UUID)

FilterableProperty fields:
- `property_name`, `property_name_ru`, `property_name_ro`, `values` (array), `product_count`

### Service Types and Packages
- `GET /service-types`
  - Query params: `search`, `limit`, `offset`
- `GET /service-types/{id|slug}`
- `GET /service-types/{id|slug}/packages`
- `GET /service-packages`
  - Query params: `type` (slug/UUID), `search`, `limit`, `offset`
- `GET /service-packages/{id}`

ServicePackageType fields:
- `id`, `name`, `name_ru`, `name_ro`, `slug`, `sort_order`, `is_active`, `created_at`, `updated_at`

ServicePackage fields:
- `id`, `type_id`, `type_name`, `name`, `name_ru`, `name_ro`
- `price`, `network_speed`, `benefits` (array), `special_benefits` (array)
- `sort_order`, `is_active`, `created_at`, `updated_at`

### Orders and Stores
- `POST /orders`
  - Request body:
    - `full_name` (required)
    - `phone_number` (required)
    - `email` (optional, validated)
    - `delivery_type` (required: `pickup` or `delivery`)
    - `store_id` (required for `pickup`)
    - `delivery_address` (required for `delivery`)
    - `payment_method` (required: `card`, `bank_transfer`, `cash`)
    - `notes`, `user_id`, `user_name`, `user_pfp` (optional)
    - `items`: array of `{ product_id, quantity }` (1..100 items)
  - Response: `OrderWithItems` (status is always `pending` on create)
- `GET /orders/{order_number}`
  - Returns `OrderWithItems`
- `GET /stores`
  - Query params: `search`, `limit`, `offset`
- `GET /stores/{id}`

OrderWithItems fields:
- Order: `id`, `order_number`, `full_name`, `phone_number`, `email`, `delivery_type`, `delivery_address`, `store_id`, `store_name`, `payment_method`, `total_amount`, `currency`, `status`, `notes`, `user_id`, `user_name`, `user_pfp`, `created_at`, `updated_at`
- Items: `id`, `order_id`, `product_id`, `product_name`, `product_sku`, `product_image`, `quantity`, `unit_price`, `total_price`, `created_at`

Example checkout:
```bash
curl -X POST "http://localhost:8080/api/v1/public/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Alex Doe",
    "phone_number": "+37360000000",
    "delivery_type": "delivery",
    "delivery_address": "Chisinau, Stefan cel Mare 1",
    "payment_method": "cash",
    "items": [
      { "product_id": "550e8400-e29b-41d4-a716-446655440000", "quantity": 2 }
    ]
  }'
```

## Public Service Orders (Non-Storefront)
- `POST /api/v1/service-orders`
  - Request body:
    - `package_id` (UUID, required)
    - `customer_name` (required)
    - `customer_phone` (required)
    - `customer_email` (optional, validated)
    - `customer_address` (optional)
  - Response: `ServiceOrder`

ServiceOrder fields:
- `id`, `package_id`, `package_name`, `customer_name`, `customer_phone`, `customer_email`, `customer_address`, `status`, `notes`, `created_at`, `updated_at`

Example:
```bash
curl -X POST "http://localhost:8080/api/v1/service-orders" \
  -H "Content-Type: application/json" \
  -d '{
    "package_id": "cc0e8400-e29b-41d4-a716-446655440003",
    "customer_name": "Dana Ionescu",
    "customer_phone": "+37369000000",
    "customer_email": "dana@example.com",
    "customer_address": "Balti, str. Decebal 10"
  }'
```

## Core Read-Only API (ID-Based) - `/api/v1`
These endpoints do not require auth but are more raw. Use `/api/v1/public` when you need slug routing and active-only filtering.

### Products
- `GET /products`
  - Query params:
    - `brand_id`, `category_id`, `source_id` (UUID)
    - `price_filter`: `all`, `with_price`, `no_price`
    - `stock_filter`: `all`, `in_stock`, `out_stock`, `low_stock`
    - `status_filter`: `all`, `active`, `inactive` (default `all`)
    - `sort_by`: `name_asc`, `name_desc`, `price_high`, `price_low`, `stock_high`, `stock_low`
    - Legacy: `in_stock=true`, `min_price`, `max_price`
- `GET /products/{id}` (returns `ProductWithDetails`)
- `GET /products/{id}/properties` (returns Property list)
- `GET /products/{id}/variants`
  - Returns `ProductWithVariantProperties[]` and `meta.variant_group_id`

ProductWithDetails adds:
- `brand`, `category`, `properties`, `property_count`, `variant_properties` (Color/Storage/RAM)

### Brands and Categories
- Brands: `GET /brands`, `/brands/all`, `/brands/{id}`, `/brands/{id}/stats`, `/brands/{id}/products`
- Categories: `GET /categories`, `/categories/all`, `/categories/{id}`, `/categories/{id}/stats`, `/categories/{id}/products`, `/categories/{id}/subcategories`

### Properties and Hierarchy
- `GET /properties`, `/properties/{id}`, `/properties/groups`, `/properties/stats`
- Hierarchy (read-only):
  - `/properties/hierarchy/groups`
  - `/properties/hierarchy/groups/{group_name}`
  - `/properties/hierarchy/groups/{group_name}/impact`
  - `/properties/hierarchy/groups/{group_name}/properties`
  - `/properties/hierarchy/groups/{group_name}/properties/{property_name}`
  - `/properties/hierarchy/groups/{group_name}/properties/{property_name}/impact`
  - `/properties/hierarchy/groups/{group_name}/properties/{property_name}/values`

Property fields:
- `id`, `product_id`, `property_name`, `value`, `group_name`, `sort_order`, `is_filter`, `is_modification`
- `property_name_ru`, `property_name_ro`, `group_name_ru`, `group_name_ro`

### Search
- `GET /search?q=...`
  - Returns `ProductWithDetails[]` plus `meta` and `query`

### Catalog
- `GET /catalog` (full hierarchy)
- `GET /catalog/{slug}` (one section with groups/items)
- `GET /catalog/items/{id}/products` (only for `custom_filter` items)

CatalogSectionWithGroups fields:
- Section: `id`, `name_ro`, `name_ru`, `name_en`, `icon`, `slug`, `sort_order`, `is_active`
- Group: `id`, `section_id`, `name_ro`, `name_ru`, `name_en`, `column_position`, `sort_order`, `filter_config`, `is_active`
- Item: `id`, `group_id`, `name_ro`, `name_ru`, `name_en`, `sort_order`, `item_type`, `category_id`, `filter_config`, `is_active`, `category`
- `filter_config`: `{ category_ids, brand_ids, price_min, price_max, in_stock_only }`

### Promotions
- `GET /promotions` (filters: `search`, `is_active`, `limit`, `offset`)
- `GET /promotions/{id}`
- `GET /promotions/{id}/products`

Promotion fields:
- `id`, `name`, `description`, `discount_type`, `discount_value`, `start_date`, `end_date`, `is_active`, `priority`, `created_at`, `updated_at`, `product_count`

### Variants
- `GET /variants/status`
- `GET /variants/stats`
- `GET /variants/jobs`, `GET /variants/jobs/{id}`
- `GET /variants/groups`, `GET /variants/groups/{id}`
- `GET /variants/stream/{id}` (SSE stream)

VariantGenerationJob fields:
- `id`, `status`, `total_products`, `processed_products`, `groups_created`, `started_at`, `completed_at`, `error`, `created_at`, `updated_at`

VariantGroupWithDetails fields:
- Group: `id`, `base_name`, `base_name_normalized`, `member_count`, `created_at`, `updated_at`
- Members: `id`, `name`, `article`, `main_image_url`, `images`, `price_min`, `is_in_stock`, `brand_name`, `category_name`
- Properties: `id`, `group_id`, `property_name`, `property_values`, `parent_property`, `parent_value`, `product_count`, `created_at`
- Matrix: `columns[]`, `rows[]` (when available)

### Service Types and Packages (ID-based)
- `GET /service-types`, `GET /service-types/{id}`
- `GET /service-packages`, `GET /service-packages/{id}`

### Smart Search (only if Meilisearch is configured)
- `GET /smart-search`
  - Query params: `q`, `limit`, `offset`, `brand_id`, `category_id`, `in_stock`, `product_type`, `min_price`, `max_price`, `sort` (e.g. `price_mdl:asc`)
- `GET /smart-search/autocomplete?q=...&limit=5`
- `GET /smart-search/compare?q=...&limit=10`
- `GET /smart-search/status`

### Exports
- `GET /export/products?format=json|csv&brand_id=...&category_id=...&in_stock=true`
- `GET /export/brands?format=json|csv`
- `GET /export/categories?format=json|csv`

### Config, Sources, Files, Health
- `GET /config` (returns exchange rates and limits)
- `GET /sources`, `/sources/default`, `/sources/{id}` (product sources)
- `GET /uploads/images/{uuid}.{ext}` and `/uploads/videos/{uuid}.{ext}`
- `GET /health`

## Promotion and Discount Logic (Products)
- `manual_discount_percent` is set on a product.
- `active_promotions` may apply percentage or fixed discounts.
- `effective_discount_percent` is the max of manual vs promotion discount.
- Discounted prices are computed per currency:
  - `discounted_price = original_price * (1 - effective_discount_percent / 100)`

## Quick Usage Examples
```bash
# Public product list with property filters
curl "http://localhost:8080/api/v1/public/products?properties[RAM]=8GB&properties[Color]=Black"

# Track an order
curl "http://localhost:8080/api/v1/public/orders/ORD-2025-000123"

# Smart search (if enabled)
curl "http://localhost:8080/api/v1/smart-search?q=samsung&limit=10&sort=price_mdl:asc"

# Export brands as CSV
curl -L "http://localhost:8080/api/v1/export/brands?format=csv" -o brands.csv
```
