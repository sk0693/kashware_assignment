# Introduction

This project is build for handling the files operation and storage. The apis is build by which `User` can upload the file(s) and see the all upload files with authorization. Also it can generate the `tiny url` by which user can give access the upload files to public.

## Installing

1. Clone the repository using :

```bash
git clone https://github.com/sk0693/kashware_backend.git
```

2. Change the repository directory :

```bash
cd kashware_backend
```

3. Install the needed node packges/modules :

```bash
npm install
```

4. Start the development server :

```bash
npm start
```

OR with Docker.

```bash
docker build -t kashware_backend . && docker run kashware_backend
```

## Featuring

- Authentication
- JSON patching
- Image Thumbnail Generation

## Authentication

All API requests require the use of a generated Authentication Token `(JWT)`. You have to register and then login the application using `register` and `login` routes respectively. These APIs is not required the jwt token.

To authenticate an API request, you should provide your API key in the `Authorization` header.

### In headers

```http
jwt :  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI4NGQ2YzNmOGIwMDc1ZGRmYzhmYTAiLCJpYXQiOjE1ODkxMzY3NjJ9.
```

## Availaible Routes

### register

```http
POST api/v1/auth/register
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
POST api/v1/auth/login
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

### createThumbnail

```http
POST api/v1/file/createThumbnail
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `image_url` | `String` | **Required**. |

#### Response

```javascript
{
  ("The thumbnail of 50x50 pixels.");
}
```

### applyPatch

```http
POST api/v1/patch/applyPatch
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `json_obj`  | `Object` | **Required**. |
| `patch_arr` | `Array`  | **Required**. |

#### Response

```javascript
{
    "result": {
        "baz": "boo",
        "foo": "bar"
    }
}
```

## Authors

- **Sourabh Khurana**

* [GitHub](https://github.com/sk0693)
* [LinkedIn](https://linkedin.com/sk0693)
* [Portfolio](https://sourabhkhurana.com/resume.html)
