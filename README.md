# Office Queue Management System - Demo project for Group 9
## SE2 Course - Politecnico di Torino, academic year 2023-24

## Students:
- ### 320213 Barbato Luca
- ### 321607 Beltrán Juan Carlos
- ### 314796 De Rossi Daniele
- ### 318771 Husanu Diana Alexandra
- ### 321529 Ladrat Mattéo
- ### 318952 Molinatto Sylvie
- ### 319355 Schiavone Michele

## React Client Application Routes

- Route `/`:
    - Homepage of the website where you have to select your role (client, officer, monitor)
- Route `/Client`:
    - Client view where he can select a service type to obtain a ticket
- Route `/Officer/:id` 
    - Officer view where he can signal that he has termined to serve a client and he can call a new customer, if exists.
- Route `/Monitor` (NOT IMPLEMENTED):
    - Monitor view where there is the list of the tickets assigned to the respective queue 



## API SERVER

### Retrieve all services
- HTTP Method: `GET` URL `/api/services`
- Description: Retrieve the list of the services
- Request body: _None_
- Response: `200 OK` (success)
- Response body: An array of objects, each one containing information on a service
```
    [
        {
            "code": "A01",
            "label": "Service A01",
            "description": ""
        },
        {
            "code": "A02",
            "label": "Service A02",
            "description": ""
        }, ...
    ]
```

### Add a user/ticket to the queue of a service identified by its code
- HTTP Method: `POST` URL `/api/services/:code/queue`
- Description: Add a ticket to the queue of the service identified by 'code'
- Request body: _None_
- Response: `200 OK` (success)
- Response body: 

    ```
    {
        "id": 28,
        "serviceCode": "A01",
        "creationDate": "2023-10-26 19:45:57",
        "counterId": null,
        "servingDate": null,
        "completionDate": null
    }
    ```
- Error Response: `404 Not Found` (The service targeted by the request is unknown.)

### Retrieve all counters
- HTTP Method: `GET` URL `/api/counters`
- Description: Retrieve all counters.
- Request body: _None_
- Response: `200 OK` (success)
- Response body: 

    
    ```
    [
        {
            "id": 1,
            "available": true
        },
        {
            "id": 2,
            "available": true
        }, ...
    ]
    ```

### Get counter by id
- HTTP Method: `GET` URL `/api/counters/:id`
- Description: Retrieve the counter info, the current ticket served and the services offered using the 'id' as param`.
- Request body: _None_
- Response: `200 OK` (success)
- Response body: 

    ```
    {
        "id": 1,
        "available": true,
        "currentTicket": null,
        "services": [
            {
                "code": "A01",
                "label": "Service A01",
                "description": ""
            },
            {
                "code": "A02",
                "label": "Service A02",
                "description": ""
            },
            {
                "code": "A03",
                "label": "Service A03",
                "description": ""
            }
        ]
    }
    
    ```
- Error Response: `404 Not Found` ("Unknown counter")

### Indicate that the counter served the current ticket
- HTTP Method: `POST` URL `/api/counters/:id/ticket-served`
- Description: update the completion date for the ticket
- Request body: _None_
- Response: `200 OK` (success)
- Response body: 

    ```
    {
        "id": 26,
        "serviceCode": "A01",
        "creationDate": "2023-10-26 19:30:28",
        "counterId": 1,
        "servingDate": "26/10/2023",
        "completionDate": "2023-10-26 20:26:03"
    }
    
    ```
- Error Response: `400 Bad Request` (The counter is not serving a ticket.), `404 Not Found` (Unknown counter)

### Request a new customer (ticket)
- HTTP Method: `POST` URL `/api/counters/:id/request-customer`
- Description: Request a new customer for a counter given its id as param
- Request body: _None_
- Response: `200 OK` (success)
- Response body: 

    ```
    
    
    ```
- Error Response: `400 Bad Request` (No customer waiting for the counter), `404 Not Found` (Unknown counter)


## Database Tables

- Table `TICKETS` - contains **PK** id `(integer)` , service_code `(text)` , counter_id `(integer)`, creation_date `(text)`, serving_date `(text)`, completion_date `(text)` 
    - Table to store the tickets
- Table `COUNTERS` - contains **PK** id `(integer)`, available `(integer)`
    - Table to store counters and if they are available     
- Table `COUNTER_SERVICES` - contains **PK** COUNTER_ID `(integer)`, **PK** SERVICE_CODE `(text)`
    - Table to store counters and their services
- Table `SERVICES` - contains **PK** code `(text)`, label `(text)`, descripton `(text)`
    - Table to store services


