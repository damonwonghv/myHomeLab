# Base Image 
FROM nginx:alpine
#Copy the index.html file /usr/share/nginx/html/
COPY dist /usr/share/nginx/html/
#Expose Nginx Port
EXPOSE 8081
#Start NginxService 
CMD ["nginx", "-g", "daemon off;"]