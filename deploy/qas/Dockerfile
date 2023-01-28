FROM nginx:alpine
RUN mkdir -p /app
WORKDIR /app
ADD dist/ /app/
#COPY --from=builder /app/compiled /app/
ADD deploy/qas/default.conf /etc/nginx/conf.d/mvp-webadmin.conf
ADD deploy/qas/nginx.conf /etc/nginx/nginx.conf
#ADD deploy/qas/Default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8888
CMD ["nginx","-g","daemon off;"]
