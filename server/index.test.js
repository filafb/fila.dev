const request = require('supertest');
const server = require('./index');
const client = request(server);
const fs = require('fs-extra');
const paths = require('../config/paths');
const html = fs.readFileSync(paths.appHtml, 'utf8');


function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    //filter: file => file !== paths.appHtml,
  });
}

beforeAll(() => {
  fs.emptyDirSync(paths.appBuild);
  copyPublicFolder();
});

describe('Users accessing the website', () => {

  test('gets the main HTML file when accessing / and a 200 status', async () => {
    const response = await client.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe(html);
  });

  test('gets the main HTML for any other invalid URI and a 200 status', async () => {
    const response = await client.get('/any-other-invalid-route');
    expect(response.status).toBe(200);
    expect(response.text).toBe(html);
  });

  test('gets an 404 trying any other method (POST, PUT, DELETE) to the main page', async () => {
    const responses = await Promise.all(
      [client.post('/'), client.put('/'), client.delete('/')]
    )
    responses.forEach(response => {
      expect(response.status).toBe(404);
    })

  })
})
