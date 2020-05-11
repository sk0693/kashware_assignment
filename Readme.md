# Introduction

This project is build for handling the files operation and storage. The apis is build by which `User` can upload the file(s) and see the all upload files with authorization. Also it can generate the `tiny url` by which user can give access the upload files to public.

## Installing

1. Clone the repository using :

```bash
git clone https://github.com/sk0693/crud-operation-on-file.git
```

2. Change the repository directory :

```bash
cd crud-operation-on-file
```

3. Install the needed node packges/modules :

```bash
npm install
```

4. Start the development server :

```bash
npm start
```

## Featuring

- Authorization
- User Authentication
- File Uploading
- File Storage
- Compressing
- Uncompressing
- Tiny Url
- File Serve

## Authorization

All API requests require the use of a generated Authorization Token `(JWT)`. You have to register and then login the application using `register` and `login` routes respectively. These APIs is not required the jwt token.

To authenticate an API request, you should provide your API key in the `Authorization` header.

Alternatively, you may use cookies in the browser for the `GET` requests to authorize yourself to the API. But note that this is likely to leave traces in things like your history, if accessing the API through a browser.

Using below Api route.

```http
GET :  /v1/auth/loginUsingGetAPI?email=[email]&password=[password]
```

### In headers

```http
jwt :  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI4NGQ2YzNmOGIwMDc1ZGRmYzhmYTAiLCJpYXQiOjE1ODkxMzY3NjJ9.
```

<!-- | Parameter | Type | Description |
| :--- | :--- | :--- |
| `jwt` | `string` | **Required**. JWT Token | -->

## Availaible Routes

### register

```http
POST /v1/auth/register
```

| Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `email`    | `string` | **Required**. The valid email address |
| `password` | `string` | **Required**. 8 digit password        |
| `name`     | `string` | **Optional**. The Name                |

#### Responses

```javascript
{
    "_id": String,
    "email": String,
    "name": String,
    "createdAt": Date,
    "updatedAt": Date,
}
```

### login

```http
POST /v1/auth/login
```

| Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `email`    | `String` | **Required**. The valid email address |
| `password` | `String` | **Required**. 8 digit password        |

#### Response

```javascript
{
    "user": {
        "id": String,
        "email": String,
        "name": String
    },
    "token": String
}
```

### file/upload

```http
POST /v1/file/upload
```

| Parameter | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `file`    | `FILE`   | **Required**. Any file |
| `title`   | `String` | **Optional**.          |
| `title`   | `String` | **Optional**.          |

While uploading, there is a compression algo applied on some kind of file. I have applied this algo on only files which has file `.txt` file extension else remains the same.

#### Response

```javascript
{
    "result": "File uploaded succesfully with named `[file name]`"
}
```

### file

```http
GET /v1/file
```

To get the all files which is uploaded by the user

<!-- | Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `email`    | `string` | **Required**. The valid email address |
| `password` | `string` | **Required**. 8 digit password        | -->

#### Response

```javascript
{
    "result": [
        {
            "isDeleted": Boolean,
            "isCompressed": Boolean,
            "_id": String,
            "userId": String,
            "title": String,
            "description": String,
            "fileUrl": String,
            "meta": {
                "filepath": String,
                "filename": String,
                "size": Number,
                "originalname": String,
                "mimeType": String
            },
            "createdAt": Date,
            "updatedAt": Date,
        }
        ...
    ]
}
```

### file/:[fileId]

```http
GET /v1/file/5eb97457f2130e4060365dd4
```

To get the single file using `[fileId]` params which is uploaded by the user

<!-- | Parameter  | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `email`    | `string` | **Required**. The valid email address |
| `password` | `string` | **Required**. 8 digit password        | -->

#### Response

```javascript
{
    "result":
        {
            "isDeleted": Boolean,
            "isCompressed": Boolean,
            "_id": String,
            "userId": String,
            "title": String,
            "description": String,
            "fileUrl": String,
            "meta": {
                "filepath": String,
                "filename": String,
                "size": Number,
                "originalname": String,
                "mimeType": String
            },
            "createdAt": Date,
            "updatedAt": Date,
        }
}
```

### file/:[fileId]

```http
DELETE /v1/file/5eb97457f2130e4060365dd4
```

Delete the selected file using `[fileId]` params

### user/

```http
GET /v1/user/
```

Getting the user details.

#### Response

```javascript
{
    "result": {
        "id": String,
        "email": String,
        "name": String
    }
}
```

### user/share/:[fileId]

```http
GET /v1/user/shareFile/5eb97457f2130e4060365dd4
```

When user wants to share the file to publically, then in response the server will give the `tiny url`

#### Response

```javascript
{
    "result": String [`the tiny url in return`]
}
```

### tiny/:[tinyUrl]

```http
GET /v1/tiny/nkqYrhi
```

When user wants to share the file to publically, then in response the server will give the `tiny url`

#### Response

The file will be served on the browser. And if the uploaded file has `.txt` extension then it will be uncompressed before served.
