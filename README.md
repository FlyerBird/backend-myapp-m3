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
### User

Users in the database have the following properties:
```js
{
  "username": String,
  "email": String,
  "hashedPassword": String,
  "role": String
}
```
### Product

Products in the database have the following properties:
```js
{
  "title": String,
  "description": String,
  "price": Number,
  "details": String,
  "images": String

}
```
### Cart

Cart in the database have the following properties:
```js
{
  products: [{type: Schema.Types.ObjectId, ref: "Product"}],
  idUser: {type: Schema.Types.ObjectId, ref: "User"}

}
```
---

## API endpoints and usage 

| Action               | Method    | Endpoint                | Req.body                                       | Private/Public  |
|----------------------|-----------|-------------------------|------------------------------------------------|-----------------|
| UPLOAD picture       | POST      | /api/v1/auth/upload     |                                                |    Public       | 
| SIGN UP user         | POST      | /api/v1/auth/signup     | { username, email, password, imageProfile }    |    Public       |                 
| LOG IN user          | POST      | /api/v1/auth/login      | { email, password }                            |    Public       |                  
| GET logged in user   | GET       | /api/v1/auth/me         |                                                |    Private      |
| GET all products     | GET       | /api/v1/products/       |                                                |    Public       |
| GET single product   | GET       | /api/v1/product/:id     |                                                |    Public       |
| UPLOAD picture       | POST      | /api/v1/product/upload  |                                                |    Private      |
| CREATE product       | POST      | /api/v1/create-product  | { title, description, price, details, images } |    Private      |
| EDIT   product       | POST      | /api/v1/edit/:id        | { title, description, price, details }         |    Private      |
| DELETE product       | DELETE    | /api/v1/products/:id    |                                                |    Private      |
| DELETE user          | DELETE    | /api/v1/user/:id        |                                                |    Private      |
| GET Cart             | GET       | /api/v1/products-cart   |                                                |    Private      |
| CREATE cart          | POST      | /api/v1/cart            | { productId }                                  |    Private      |
| DELETE cart          | DELETE    |/api/v1/products-cart/:id|                                                |    Private      |


---

<<<<<<< HEAD
## Useful links

=======
Useful links

[Presentation slides](https://docs.google.com/presentation/d/1lG9C0JEs70fODM86R0XsyMLSlpFF0aIYjVLaim-VkDI/edit#slide=id.p) 
[Backend repository](https://github.com/FlyerBird/backend-myapp-m3)
>>>>>>> 2a50db10753dfdfbea9248c78f4acc92c0238f3a
- [Presentation slides](https://docs.google.com/presentation/d/1lG9C0JEs70fODM86R0XsyMLSlpFF0aIYjVLaim-VkDI/edit#slide=id.p)
- [Backend repository](https://github.com/FlyerBird/backend-myapp-m3)
- [Frontend repository](https://github.com/FlyerBird/frontend-myapp-m3)
- [Frontend deploy](https://master--funride.netlify.app)


