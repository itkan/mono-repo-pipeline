const request = require('supertest');
const express = require('express');
const router = require('./employees');
const employeeRepository = require('../employees/employeeRepository');

jest.mock('../employees/employeeRepository');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Employee Router', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('should return all employees', async () => {
            const employees = [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }];
            employeeRepository.prototype.getAll.mockResolvedValue(employees);

            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(employees);
        });

        it('should handle errors', async () => {
            employeeRepository.prototype.getAll.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/');
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('GET /:id', () => {
        it('should return an employee by ID', async () => {
            const employee = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
            employeeRepository.prototype.getById.mockResolvedValue(employee);

            const response = await request(app).get('/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(employee);
        });

        it('should handle employee not found', async () => {
            employeeRepository.prototype.getById.mockResolvedValue(new Error('Employee not found'));

            const response = await request(app).get('/1');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Employee not found');
        });

        it('should handle errors', async () => {
            employeeRepository.prototype.getById.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/1');
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('POST /', () => {
        it('should add a new employee', async () => {
            const newEmployee = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
            employeeRepository.prototype.add.mockResolvedValue(newEmployee);

            const response = await request(app).post('/').send(newEmployee);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(newEmployee);
        });

        it('should handle errors', async () => {
            employeeRepository.prototype.add.mockRejectedValue(new Error('Database error'));

            const newEmployee = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
            const response = await request(app).post('/').send(newEmployee);
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('PUT /:id', () => {
        it('should update an existing employee', async () => {
            const updatedEmployee = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
            employeeRepository.prototype.getById.mockResolvedValue(updatedEmployee);
            employeeRepository.prototype.update.mockResolvedValue(updatedEmployee);

            const response = await request(app).put('/1').send(updatedEmployee);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedEmployee);
        });

        it('should handle employee not found', async () => {
            employeeRepository.prototype.getById.mockResolvedValue(new Error('Employee not found'));

            const response = await request(app).put('/1').send({ id: 1 });
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Employee not found');
        });

        it('should handle errors', async () => {
            employeeRepository.prototype.getById.mockRejectedValue(new Error('Database error'));

            const response = await request(app).put('/1').send({ id: 1 });
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('DELETE /:id', () => {
        it('should delete an employee by ID', async () => {
            employeeRepository.prototype.deleteById.mockResolvedValue();

            const response = await request(app).delete('/1');
            expect(response.status).toBe(204);
            expect(response.body).toEqual({});
        });

        it('should handle errors', async () => {
            employeeRepository.prototype.deleteById.mockRejectedValue(new Error('Database error'));

            const response = await request(app).delete('/1');
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Database error');
        });
    });
});
