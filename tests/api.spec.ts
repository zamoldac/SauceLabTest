import { test, expect } from '@playwright/test';

test('api test for response on /breeds category', async ({ request }) => {
const response = await request.get('https://dogapi.dog/api/v2/breeds');
const responseObject = await response.json();
console.log(responseObject);
});

test('api test for adding a new pet', async ({ request }) => {
const response = await request.post('https://petstore.swagger.io/v2/pet',{
  data: {
  "id": 1337,
  "category": {
    "id": 1338,
    "name": "string"
  },
  "name": "nateDOG",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 3,
      "name": "string"
    }
  ],
  "status": "available"
}
});
const responseObject = await response.json();
console.log(responseObject);
});

test('api test to check response for  existent ID (expected)', async ({ request }) => {
const response = await request.get('https://petstore.swagger.io/v2/pet/1337');
const responseObject = await response.json();
console.log(responseObject);
expect (responseObject.name).toEqual('nateDOG');
});

test('api test to check delete for existent ID (expected)', async ({ request }) => {
const response = await request.delete('https://petstore.swagger.io/v2/pet/1337');
expect(response.ok()).toBeTruthy();
const responseCheck = await request.get('https://petstore.swagger.io/v2/pet/1337');
const responseObject = await responseCheck.json();
console.log(responseObject);
expect (responseObject.message).toEqual('Pet not found');
});

test('api test to check response for non existent ID', async ({ request }) => {
const response = await request.get('https://petstore.swagger.io/v2/pet/9337');
const responseObject = await response.json();
console.log(responseObject);
expect (responseObject.message).toEqual('Pet not found');
});

test('api test for response different site', async ({ request }) => {
const response = await request.get('https://reqbin.com/api/v1/account/userinfo');
const responseObject = await response.json();
console.log(responseObject);
});