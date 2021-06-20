# Requirements

1. Docker
2. Docker Compose 3.8

# How to Run

1. create .env with required config
2. run docker-compose up --build on root dir
3. wait for all services to run

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

## example env

create a .env file and copy the contents

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

## notes

-   DB exposed on 3306
-   API exposed on 3000
-   https://ethereal.email/ for testing email
