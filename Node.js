

export class Database {
    constructor(client) {
        this.client = client; // Assume 'client' is a PostgreSQL client (e.g., pg module)
    }

    async insertDepartment(name) {
        console.log("Entering department")
        const result = await this.client.query(
            "INSERT INTO department (name) VALUES ($1) RETURNING id, name",
            [name]
        );
        return result.rows[0];
    }

    async insertRole(title, department, salary) {
        const result = await this.client.query(
            "INSERT INTO role (title, department, salary) VALUES ($1, $2 ,$3) RETURNING id, title, department, salary",
            [title, department, salary]
        );
        return result.rows[0];
    }

    async insertEmployee(firstName, lastName, roleId, managerId) {
        const result = await this.client.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, role_id, manager_id",
          [firstName, lastName, roleId, managerId]
        );
        return result.rows[0];
      }

      async updateEmployeeRole(employeeId, newRoleId) {
        const result = await this.client.query(
            `UPDATE employee 
             SET role_id = $1 
             WHERE id = $2 
             RETURNING id, first_name, last_name, role_id, manager_id`,
            [newRoleId, employeeId]
        );
        return result.rows[0]; 
    }
    
}

