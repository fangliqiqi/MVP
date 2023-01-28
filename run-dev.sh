git pull origin dev
docker rmi -f mvp-webadmin
docker rmi -f localhost:5000/mvp-webadmin:1.0.0
docker build -f ./deploy/qas/Dockerfile -t mvp-webadmin .
docker tag mvp-webadmin localhost:5000/mvp-webadmin:1.0.0
docker push localhost:5000/mvp-webadmin:1.0.0
cd /data/yifu/mvp/code
k delete -f t.yaml
k create -f t.yaml
kubectl get pods -n qas-mvp -w