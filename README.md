this project is done using postman and what are all the steps you need to follow in order to run this project.
at first you need to install the postman. and then run the index.js code with the command 'nodemon index.js' then wait
until it establishes the connection then go to postman and open my worksapces in the postman in that 
API to add products to the database
URL [post]: /products/create
add in the json format in the body for eg.
{
    "name":"ranjan",
    "quantity":20
}

API to list products
URL [GET] : /products

API to delete products
URL [DELETE] : /products/:id

API to update quantity of a product 
URL [POST] : /products/:id/update_quantity/?number=10
