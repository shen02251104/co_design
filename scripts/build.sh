#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Installing main app dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

echo "Building the Nuxt.js project..."
pnpm nuxt build

# 构建设计器子应用
echo "Building design-editor..."
cd "${COZE_WORKSPACE_PATH}/design-editor"
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only || npm install
pnpm run build || npm run build

# 将设计器构建产物复制到 Nuxt public 目录
echo "Copying design-editor to public..."
mkdir -p "${COZE_WORKSPACE_PATH}/.output/public/design"
cp -r "${COZE_WORKSPACE_PATH}/design-editor/dist/*" "${COZE_WORKSPACE_PATH}/.output/public/design/" || true

echo "Build completed successfully!"
