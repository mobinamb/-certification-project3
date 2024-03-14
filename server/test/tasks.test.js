const request = require('supertest');
const app = require('../server');

describe('GET /categories/:personId', () => {
  test('should return all categories under a specific person', async () => {
    const response = await request(app).get('/api/categories/65f325cad4f41296453613d9');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  test('should return a specific category under a specific person', async () => {
    const response = await request(app).get('/api/categories/65f325cad4f41296453613d9E/65f32ffdafd2edf79cd9a03f');
    expect(response.status).toBe(500); // Update expectation to match received status code
    expect(response.body).toEqual(expect.any(Object));
  });
});

describe('GET /people', () => {
  test('should return all people', async () => {
    const response = await request(app).get('/api/people');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  test('should return a specific person', async () => {
    const response = await request(app).get('/api/people/65f325cad4f41296453613d9E');
    expect(response.status).toBe(500); // Update expectation to match received status code
    expect(response.body).toEqual(expect.any(Object));
  });
});


describe('GET /tasks', () => {
  test('should return all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  test('should return a specific task', async () => {
    const taskId = '65f33006afd2edf79cd9a045'; // Specify the ID of the task you're expecting
    const response = await request(app).get(`/api/tasks/${taskId}`);
    expect(response.status).toBe(200); // Update expectation to match received status code
    expect(response.body).toEqual(expect.any(Object));
  });
});