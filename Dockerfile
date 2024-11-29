FROM nginx:alpine

COPY dist/to-do-list/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
