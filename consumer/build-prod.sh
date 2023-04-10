#!/bin/bash

# change these
export AUTH_API_URL=https://auth-api.kokotuku.jp/v1
export CONSUMER_API_URL=https://consumer-api.kokotuku.jp/v1
export BUSINESS_API_URL=https://business-api.kokotuku.jp/v1
export ADMIN_API_URL=https://admin-api.kokotuku.jp/v1
export YOUR_GMOPG_TEST_ENV=https://stg.static.mul-pay.jp/ext/js/token.js
export YOUR_GMOPG_SHOP_ID=tshop00057451

npm run build
