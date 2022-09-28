# funRide REST API
## Description

This is a the backend repository for the React application `funRide`.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```
- To start the project in development mode, run:
```bash
npm run dev
```
- To seed the database, run:
```bash
npm run seed
```
---

## Models

USER 
PRODUCT

### User

Users in the database have the following properties:

{
  "username": String,
  "email": String,
  "hashedPassword": String,
  "role": String
}
```
### Product

Products in the database have the following properties:

{
  "title": String,
  "description": String,
  "price": Number,
  "details": String,
  "images": String

}

### Cart

Cart in the database have the following properties:

{
  products: [{type: Schema.Types.ObjectId, ref: "Product"}],
  idUser: {type: Schema.Types.ObjectId, ref: "User"}

}

---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { username, email, password }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/me    |   | Private |

---

Useful links

[Presentation slides](https://docs.google.com/presentation/d/1lG9C0JEs70fODM86R0XsyMLSlpFF0aIYjVLaim-VkDI/edit#slide=id.p) 

- [Presentation slides](https://docs.google.com/presentation/d/1lG9C0JEs70fODM86R0XsyMLSlpFF0aIYjVLaim-VkDI/edit#slide=id.p)
- [Backend repository](https://github.com/FlyerBird/backend-myapp-m3)
- [Frontend repository](https://github.com/FlyerBird/frontend-myapp-m3)
- [Frontend deploy](https://master--funride.netlify.app)


