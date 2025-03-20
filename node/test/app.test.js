import app from "../src/app.js";
import request from "supertest";

describe("API 테스트", ()=>{
    test("GET / 응답 확인", async ()=>{
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        // expect(response.body).toHaveProperty("");
    });
    
    test("잘못된 경로 접근 시 404 응답", async () => {
        const response = await request(app).get("/invalid-route");
        expect(response.status).toBe(404);
    });
});