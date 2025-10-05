/**
 * 
 * MVC stands for Model–View–Controller — a software design pattern used to structure applications logically and cleanly.
   It separates the application into three layers
   Layer	   Responsibility	                                             Example (Restaurant Analogy)
   Model	   Handles data & logic (talks to the database, business rules)	 The kitchen that prepares the food
   View	       Handles UI / presentation (what the user sees)	             The menu or waiter showing food to customer
   Controller  Handles requests & responses, connects View ↔ Model           The waiter who takes orders and delivers food

   How They Work Together: 
    ->  User sends request
       e.g., GET /users/123
    -> Controller handles the request
        Finds which Model to use
        Calls a function in the Model to get data
    -> Model interacts with the database
    -> View displays the data

    Request Flow Diagram:
    User → Route → Controller → Model → Controller → View → User

 */

data={};
data.employees= require('../model/employees.json');

const getAllEmployees = (req,res)=>{
    res.json(data.employees)
}

const createEmployee = (req,res)=>{
    res.json({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName
    })
}

const updateEmployee = (req,res)=>{
    res.json({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName
    })
}

const deleteEmployee = (req,res)=>{
    res.json({
        "id": req.body.id,
    })
}

const getEmployeeById = (req,res)=>{
    res.json({"id": req.params.id})
}

module.exports= {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
}