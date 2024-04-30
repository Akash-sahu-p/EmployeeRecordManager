const {getAllEmployees,addEmployee,deleteEmployee}= require('../in-memory-DB/emplyoees');



async function addEmployeeController(req, res) {

    console.log(req.body.record);
    const { name, salary, currency, department, sub_department, on_contract } = req.body.record;

    try{
        if (!name || !salary || !currency || !department || !sub_department) {
            return res.status(400).json({ error: "Missing required parameters. Please provide name, salary, currency, department, and sub_department." });
        }

        
        if (typeof salary !== 'number') {
            return res.status(400).json({ error: "Salary must be a number." });
        }

        
        const isOnContract = on_contract !== undefined ? on_contract : false;

        // Add the employee
        let status = await addEmployee({ name, salary, currency, department, sub_department, on_contract: isOnContract });


        if(!status){

            return res.status(400).json({ error: "this employee records already exist" });


        }

        return res.status(200).json({ message: "Employee added successfully." });
    }

    catch(e){
        res.status(400).json({ error: error.message });

    }
}


async function deleteEmployeeController(req, res) {
    try {
        const { name } = req.body.record;

        console.log(name);

        
        if (!name) {
            return res.status(400).json({ error: "Missing 'name' parameter." });
        }

        
        deleteEmployee(name);

        return res.status(200).json({ message: `Employee '${name}' deleted (if was there in the record) successfully. ` });
    } catch (error) {
        // console.error('Error deleting employee:', error);
        return res.status(500).json({ error: "An error occurred while deleting the employee." });
    }
}




async function fetchSalaryStatsController(req, res) {
    try {
        const { currency } = req.params;

        
        const employees = getAllEmployees();

        // console.log(employees);

        

        
        let filteredEmployees;
        if (typeof currency !== 'undefined') {
            filteredEmployees = employees.filter(employee => employee.currency === currency.toUpperCase());
        } else {
            filteredEmployees = employees;
        }


        // console.log(filteredEmployees);
        // console.log(filteredEmployees.length());

        if(filteredEmployees.length === 0){

            // console.log(" not here")
                res.status(404).json({ error: "no record in database have this currency" });
    
    
        }

        // console.log(" here ________________");
        
        const salaries = filteredEmployees.map((employee )=> employee.salary);

        // let salaries ;

        // filteredEmployees.forEach((emp) =>{

        //     console.log(emp.salary);
        //     salaries.push(emp.salary);
        // })

        console.log(salaries);
        const meanSalary = salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length;
        const minSalary = Math.min(...salaries);
        const maxSalary = Math.max(...salaries);

        res.status(200).json({ meanSalary, minSalary, maxSalary });
    } catch (error) {
        // console.error('Error fetching salary statistics:', error);
         res.status(500).json({ error: "An error occurred while fetching the salary statistics." });
    }
}

async function fetchContractSalaryStatsController(req, res) {
    try {
        
        const employees = getAllEmployees();

        
        const contractEmployees = employees.filter(employee => employee.on_contract === true);

        
        if (contractEmployees.length === 0) {
            return res.status(404).json({ message: "No employees on contract found." });
        }

        
        const salaries = contractEmployees.map(employee => employee.salary);
        const meanSalary = salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length;
        const minSalary = Math.min(...salaries);
        const maxSalary = Math.max(...salaries);

        return res.status(200).json({ meanSalary, minSalary, maxSalary });
    } catch (error) {
        // console.error('Error fetching contract salary statistics:', error);
        return res.status(500).json({ error: "An error occurred while fetching the contract salary statistics." });
    }
}

async function fetchDepartmentSalaryStatsController(req, res) {
    try {
        
        const employees = getAllEmployees();

        
        const departments = {};
        employees.forEach(employee => {
            if (!departments[employee.department]) {
                departments[employee.department] = [];
            }
            departments[employee.department].push(employee.salary);
        });

        
        const departmentStats = {};
        for (const department in departments) {
            const salaries = departments[department];
            const meanSalary = salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length;
            const minSalary = Math.min(...salaries);
            const maxSalary = Math.max(...salaries);
            departmentStats[department] = { meanSalary, minSalary, maxSalary };
        }

        return res.status(200).json(departmentStats);
    } catch (error) {
        // console.error('Error fetching department salary statistics:', error);
        return res.status(500).json({ error: "An error occurred while fetching the department salary statistics." });
    }
}




async function fetchSubDepartmentSalaryStatsController(req, res) {
    try {
        
        const employees = getAllEmployees();

        
        const departments = {};
        employees.forEach(employee => {
            const key = `${employee.department}-${employee.sub_department}`;
            if (!departments[key]) {
                departments[key] = [];
            }
            departments[key].push(employee.salary);
        });

        
        const departmentSubDepartmentStats = {};
        for (const key in departments) {
            const [department, subDepartment] = key.split('-');
            const salaries = departments[key];
            const meanSalary = salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length;
            const minSalary = Math.min(...salaries);
            const maxSalary = Math.max(...salaries);
            departmentSubDepartmentStats[key] = { meanSalary, minSalary, maxSalary };
        }

        return res.status(200).json(departmentSubDepartmentStats);
    } catch (error) {
        // console.error('Error fetching department-sub-department salary statistics:', error);
        return res.status(500).json({ error: "An error occurred while fetching the department-sub-department salary statistics." });
    }
}




module.exports = {

    addEmployeeController,
    deleteEmployeeController,
    fetchSalaryStatsController,
    fetchContractSalaryStatsController,
    fetchDepartmentSalaryStatsController,
    fetchSubDepartmentSalaryStatsController



}
