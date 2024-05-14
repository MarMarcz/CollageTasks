const axios = require('axios');
const baseURL = 'http://my-express-app-container:3000';


describe("API tests", () => {
    it("should fetch all people", async () => {
        const response = await axios.get(`${baseURL}/people`);
        expect(response.status).toBe(200);
        expect(response.data.length).toBe(5); 
    });

    it("should fetch the first person", async () => {
        const response = await axios.get(`${baseURL}/people/1`);
        expect(response.status).toBe(200);
        expect(response.data.name).toBe('Alice');
        expect(response.data.age).toBe(30);
    });

    it("should calculate the average age", async () => {
        const response = await axios.get(`${baseURL}/average`);
        expect(response.status).toBe(200);
        const avgAge = parseFloat(response.data.avg_age);
        const expectedAvgAge = (30 + 25 + 35 + 28 + 40) / 5; 
        expect(avgAge).toBeCloseTo(expectedAvgAge); 
    });
});

