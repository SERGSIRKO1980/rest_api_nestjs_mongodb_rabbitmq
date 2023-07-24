npm install

npm run start:dev

Open Postman -> https://web.postman.co/

POST http://localhost:3000/api/users
Body -> raw -> JSON

---

{
"id":1,
"email":"george.bluth@reqres.in",
"first_name":"George",
"last_name":"Bluth",
"avatar":"https://reqres.in/img/faces/1-image.jpg"
}

---

result(json): Postman -> Response -> Body

result(json file): -> mongodb

result(massage email): -> https://www.mailinator.com/v4/public/inboxes.jsp?to=serhii_test_email_to

result(massage rabbitmq): -> http://localhost:15672/#/queues
( Username: guest, Password: guest )

Queues -> 👉 serhii_test_rmq -> Get Massage(s)

---

GET http://localhost:3000/api/user/2

result(json): Postman -> Response -> Body

---

GET http://localhost:3000/api/user/3/avatar

result(base64 link image): Postman -> Response -> Body

result(json file): -> mongodb

result(file image): -> ./src/user/avatars

---

DELETE http://localhost:3000/api/user/3/avatar

result(no json file): -> mongodb

result(no file image): -> ./src/user/avatars
