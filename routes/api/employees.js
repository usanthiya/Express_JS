const express = require('express');
const router = express.Router();
const employeeController = require('../../controller/employeeController');

router.route('/all').get(employeeController.getAllEmployees);
router.route('/:id').get(employeeController.getEmployeeById);
router.route('/create').post(employeeController.createEmployee);
router.route('/update').put(employeeController.updateEmployee);
router.route('/delete').delete(employeeController.deleteEmployee);

module.exports= router;