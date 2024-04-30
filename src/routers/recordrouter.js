const express = require('express');




const router = express.Router();

const authMiddleware= require('../middleware/auth')



const {addEmployeeController,
    deleteEmployeeController,
    fetchSalaryStatsController,
    fetchContractSalaryStatsController,
    fetchDepartmentSalaryStatsController,
    fetchSubDepartmentSalaryStatsController} = require('../controllers/recordcontroller');



// require auth for all workout routes
router.use(authMiddleware);


// to add a new record 

router.post('/addnew', addEmployeeController);

// to delete a record

router.delete('/remove', deleteEmployeeController);




// to get the salary statics of all the records 
router.get('/getall/:currency?', fetchSalaryStatsController);

//to get statics fot the on contract people


router.get('/getallcontract', fetchContractSalaryStatsController);

// to get statics for department


router.get('/getalldepartment', fetchDepartmentSalaryStatsController)

// to get statics for subdepartment

router.get('/getallsubdepartment', fetchSubDepartmentSalaryStatsController)



module.exports = router;







