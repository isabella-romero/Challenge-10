class Database {
    constructor(client) {
        this.client = client; // Assume 'client' is a PostgreSQL client (e.g., pg module)
    }

    async insertDepartment(name) {
        const result = await this.client.query(
            "INSERT INTO department (name) VALUES ($1) RETURNING id, name",
            [name]
        );
        return result.rows[0];
    }

    async insertRole(title, salary, departmentId) {
        const result = await this.client.query(
            "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING id, title, salary",
            [title, salary, departmentId]
        );
        return result.rows[0];
    }

    async insertEmployee(firstName, lastName, roleId, managerId = null) {
        const result = await this.client.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name",
            [firstName, lastName, roleId, managerId]
        );
        return result.rows[0];
    }
}

const db = new Database(client);
await db.insertDepartment('Engineering');
await db.insertRole('Software Engineer', 80000, 1);
await db.insertEmployee('Alice', 'Smith', 1);