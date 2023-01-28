#!/bin/bash
kubectl delete -f prd-yifu-app-mvp-webmvp-deployment.yaml
kubectl create -f prd-yifu-app-mvp-webmvp-deployment.yaml
kubectl get pods -n prd-mvp -w
