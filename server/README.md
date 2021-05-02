CRUD Operations

Create
POST /api/product/

Read
GET /api/product/:id
{
    "id": INTEGER,
    "name": VARCHAR,
    "price": INTEGER,
    "description": LONGBLOB,
    "shortDescription": BLOB,
    "developer": VARCHAR,
    "publisher": VARCHAR,
    "releaseDate": BIGINT,
    "genres": [
        VARCHAR
    ]
}

Update
PUT /api/product/:id

Delete
DELETE /api/product/:id
{
    "sucess": true,
    "data": {}
}