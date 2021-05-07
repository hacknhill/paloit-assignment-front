# PALO IT eCommerce Assignment

This is an eCommerce application to upload CSV bulk orders to newly migrated target system.

## Installations

### Backend - Spring Boot

1. Refer to the source code in github [here](https://github.com/hacknhill/paloit-assignment.git).
2. Get the docker image from dockerhub [here](hacknhill/containers:paloit-ecommerce). Run inside docker expose port 8080.

```cmd
docker run -itd -p 8080:8080 paloit/ecommerce
```

### Front-end - React

1. Refer to the source code in github [here](https://github.com/hacknhill/paloit-assignment-front.git).
2. Get the docker image from dockerhub [here](hacknhill/containers:paloit-ecommerce-front). Run inside docker expose port 3000.

```cmd
docker run -itd -p 3000:3000 paloit/ecommerce-front
```

