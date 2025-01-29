--------------------------------- Authentication -------------------------------------
post: localhost:8000/users/register
body:
{
  "email": "123@gmail.com",
  "password": "1234"
}
response:
{
    "message": "User registered successfully"
}

post: localhost:8000/users/login
body: 
{
  "email": "testuser@example.com",
  "password": "password123"
}
response: 
{
    "userId": "67953f893f9de5294e446a44",
    "email": "testuser@example.com"
}
-------------------------------------- Tasks ----------------------------------------

Get : localhost:8000/tasks/userId
body: { "userId" : <userId> }
response: Array of objects [{id, title, userId}]

post: localhost:8000/tasks
body : 
{
    "_id": "1234567890",
    "title": "test task",
    "status": "pending",
    "userId": "67953f893f9de5294e446a44"
}  
response: 
{
    "_id": "1234567890",
    "title": "test task",
    "status": "pending",
    "userId": "67953f893f9de5294e446a44"
} 

put: localhost:8000/tasks/taskId
body:
{
  "title": "updated task",
  "userId": "67953f893f9de5294e446a44"
}
response: 
{
  "title": "updated task",
  "userId": "67953f893f9de5294e446a44"
}

delete: localhost:8000/tasks/taskId/userId
body: ---
response: 
{
    "message": "Task deleted successfully"
}

patch: localhost:8000/tasks/taskId/complete/userId
body: ---
response:
{
    "_id": "679692b3fb6d94cb8b08ace4",
    "title": "ashish",
    "status": "completed",
    "userId": "67953f893f9de5294e446a44",
    "__v": 0
}