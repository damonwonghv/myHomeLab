#!/bin/bash

# 部署腳本 - 用於重新部署 myhomelab 應用

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 開始部署 myhomelab..."

# 應用 Deployment 和 Service
echo "📦 應用 Deployment 和 Service..."
kubectl apply -f "${SCRIPT_DIR}/app-deployment.yaml"

# 應用 Ingress（如果存在）
if [ -f "${SCRIPT_DIR}/app-ingress.yaml" ]; then
    echo "🌐 應用 Ingress..."
    kubectl apply -f "${SCRIPT_DIR}/app-ingress.yaml"
fi

# 等待 Deployment 就緒
echo "⏳ 等待 Deployment 就緒..."
kubectl rollout status deployment/myhomelab --timeout=120s

# 顯示部署狀態
echo ""
echo "✅ 部署完成！"
echo ""
echo "📊 當前狀態："
kubectl get pods -l app=myhomelab
echo ""
kubectl get svc myhomelab
echo ""

if kubectl get ingress myhomelab-ingress &>/dev/null; then
    kubectl get ingress myhomelab-ingress
fi

