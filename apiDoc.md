# API Documentation (Brand Showcase)

## Models

_User_
- username : string (optional)
- email: string (required, uniq, email format)
- password: string (required, length min 5, length max 20)
- role: string
- phoneNumber: string
- address: string

_Category_
- name: string (required)

## List of available endpoints:

- `GET /client/product` - aman
- `GET /client/category` - aman
- `GET /client/images` - aman
- `GET /client/product/:id`- aman
- `POST /admin/login`- aman

## Routes below need authentication

- `POST /admin/register`- aman
- `GET /admin/product`- aman
- `GET /admin/category`- aman
- `POST /admin/product`- aman
- `POST /admin/category`- aman
- `GET /admin/images`- aman
- `GET /admin/images/:productId`- aman

## Routes below need authentication & authorization
- `PUT /admin/product/:id`- aman
- `DELETE /admin/product/:id`- aman
- `DELETE /admin/category/:id`- aman

&nbsp;