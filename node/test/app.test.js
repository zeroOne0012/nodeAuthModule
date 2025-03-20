const request = require("supertest");
const app = require("../src/app");

describe("API 테스트", ()=>{
    it("GET / 응답 확인", async ()=>{
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        // expect(response.body).toHaveProperty("");
    });
    
    it("잘못된 경로 접근 시 404 응답", async () => {
        const response = await request(app).get("/invalid-route");
        expect(response.status).toBe(404);
    });
});