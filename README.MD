# Requirements

1. Docker
2. Docker Compose 3.8

# How to Run

1. create .env with required config
2. run docker-compose up --build on root dir
3. wait for all services to run

## example env

create a .env file and copy the contents update email and smtp if required

```env

NODE_ENV=production
AMQP_HOST=rabbitmq
QUEUE_NAME=newsletter
USER_NAME=root
PASSWORD=pass
HOST=mysql
PARKING_LOT_QUEUE=parkingLotQueue
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
EMAIL=adrain.murphy@ethereal.email
EMAIL_PASSWORD=sTDA7eJrqXD2jPnmwR

```

# Run without Docker

1. copy .env to both api and emailPublisher
2. update env as required with mysql and rabbitmq config as well as email config
3. run with npm run start-prod (start api server 1st)

#APIS

-   [POST] /users - add new user

    ```JSON
    sample body
    {
    "firstName":"name",
    "lastName":"lastName",
    "email":"randomEmailId2@random.com",
    "age":30
    }
    ```

-   [GET] /users - get all added users

-   [POST] /news-letters - upload csv for processing

    ```JSON
        Upload as Form-data
        {
            "csv_file": file
        }
    ```

## notes

-   DB exposed on 3306
-   API exposed on 3000
-   https://ethereal.email/ for testing email
-   if https://ethereal.email/ then message will not actually be sent by can be viewed on the messages tab https://ethereal.email/messages
