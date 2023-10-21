# Office Queue Management System - DEMO
## SE2 Course - Politecnico di Torino, academic year 2023-24
Demo project for Group 9



## Database Tables

- Table `users` - _id_ (int), _name_ (text), _email_ (text), _salt_ (text), _password_ (text), _role_ (text)
- Table `services` - _id_ (int), _name_ (text), _description_ (text), _queueCount_ (int)
- Table `counters` - _id_ (int), _serviceId_ (text), _officerId_ (int), _available_ (int used as boolean)


## Users Credentials

### Admin

- sofia@system.com : sofia

### Officer

- carlo@system.com : carlo
- andrea@system.com : andrea