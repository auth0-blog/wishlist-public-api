# WishList API: Public Sample

## Quick Setup

### 1. Create a Quick Live Server

Open this Glitch project:

[https://glitch.com/edit/#!/wishlist-public-api](https://glitch.com/edit/#!/wishlist-public-api)

Click on the "Remix to Edit" button in the top-right corner.

### 2. Test the Live Server

In your Glitch project, click on the "Share" button, which you can find under the project name in the top-left corner.

Locate the "Project links" sections.

Copy the "Live Site" link. This is the root URL of your live server, which you can use to make requests:

```bash
https://<random-long-string>.glitch.me
```

Open your terminal application (or any other application that you can use to make HTTP Requests, such as Postman).

Test if the server is working by making the following request to get all the wishlist items:

```bash
curl https://<random-long-string>.glitch.me/api/wishlist/items
```

You should the following response from the server (the `id`'s will vary):

```json
[
  {
    "id": "K@MyH58Ej",
    "name": "Apple iPhone 12",
    "description": "128GB, White",
    "url": "https://www.amazon.com/dp/B08L5Q1L2Q/"
  },
  {
    "id": "oss94d7YUZ",
    "name": "PlayStation 5 Console",
    "description": "Ultra-high speed SSD and 3D Audio",
    "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
  },
  {
    "id": "7ovKgpue7a",
    "name": "Xbox Series S Console",
    "description": "Smallest, sleekest Xbox console ever",
    "url": "https://www.amazon.com/Xbox-S/dp/B08G9J44ZN"
  }
]
```

Try calling any of the API endpoints outlined in the next section.

## API Endpoints

### 🔓 List Items

Lists all items from the wishlist.

```bash
GET /api/wishlist/items
```

#### Response

```bash
Status: 200 OK
```

```json
[
  {
    "id": "ep9EVXNoCz",
    "name": "PlayStation 5 Console",
    "description": "Ultra-high speed SSD and 3D Audio",
    "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
  }
]
```

### 🔓 Get an item

Provides information an item from the wishlist.

```bash
GET /api/wishlist/items/:id
```

#### Response

##### If item is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 200 OK
```

```json
{
  "id": "oss94d7YUZ",
  "name": "PlayStation 5 Console",
  "description": "Ultra-high speed SSD and 3D Audio",
  "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
}
```

### 🔓 Create an item for the authenticated user

Creates an item in the wishlist for the authenticated user.

```bash
POST /api/wishlist/items
```

#### Input

| Name          | Type     | Description                                       |
| ------------- | :------- | :------------------------------------------------ |
| `name`        | `string` | **Required**. The name of the item.               |
| `description` | `string` | **Required**. The description of the item.        |
| `url`         | `string` | **Required**. The URL where you can buy the item. |

##### Example

```json
{
  "name": "Apple iPhone 12",
  "description": "128GB, White",
  "url": "https://www.amazon.com/dp/B08L5Q1L2Q/"
}
```

#### Response

```bash
Status: 201 Created
```

```json
{
  "id": "QvcDfWMwg",
  "name": "Apple iPhone 12",
  "description": "128GB, White",
  "url": "https://www.amazon.com/dp/B08L5Q1L2Q/"
}
```

### 🔓 Update an item

Update an item from the wishlist.

```bash
PUT /api/wishlist/items/:id
```

#### Input

| Name          | Type     | Description                                       |
| ------------- | :------- | :------------------------------------------------ |
| `name`        | `string` | **Required**. The name of the item.               |
| `description` | `string` | **Required**. The description of the item.        |
| `url`         | `string` | **Required**. The URL where you can buy the item. |

If you only need to update some of the item properties, leave the other values as they are.

##### Example

Take the following item as an example:

```json
{
  "name": "PlayStation 5 Console",
  "description": "Ultra-high speed SSD and 3D Audio",
  "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
}
```

If you want to update the description only, you'll send a request body like the following:

```json
{
  "name": "PlayStation 5",
  "description": "Ultra-high speed SSD and 3D Audio",
  "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
}
```

#### Response

##### If item is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 200 OK
```

```bash
{
    "id": "zAvIQGhn$b",
    "name": "PlayStation 5",
    "description": "Ultra-high speed SSD and 3D Audio",
    "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
}
```

### 🔓 Remove all items

Remove all items from the wishlist.

```bash
DELETE /api/wishlist/items
```

#### Response

```bash
Status: 204 No Content
```

### 🔓 Remove an item

Remove an item from the wishlist.

```
DELETE /api/wishlist/items/:id
```

#### Response

##### If item is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 204 No Content
```

### 🔓 Reset the list

Reset the wishlist database to its default values.

```bash
GET /api/wishlist/reset
```

#### Response

```bash
Status: 200 OK
```

```json
[
  {
    "id": "K@MyH58Ej",
    "name": "Apple iPhone 12",
    "description": "128GB, White",
    "url": "https://www.amazon.com/dp/B08L5Q1L2Q/"
  },
  {
    "id": "oss94d7YUZ",
    "name": "PlayStation 5 Console",
    "description": "Ultra-high speed SSD and 3D Audio",
    "url": "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG"
  },
  {
    "id": "7ovKgpue7a",
    "name": "Xbox Series S Console",
    "description": "Smallest, sleekest Xbox console ever",
    "url": "https://www.amazon.com/Xbox-S/dp/B08G9J44ZN"
  }
]
```
