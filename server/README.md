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

{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
    "protocol41": true,
    "changedRows": 1
}


Delete
DELETE /api/product/:id

{
    "sucess": true,
    "data": {}
}