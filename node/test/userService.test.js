// ChatGPT Code

const bcrypt = require("bcrypt");
const UserService = require("../src/service/userService");
const customError = require("../src/module/customError");

// Mock Dependencies
const mockUserRepository = {
  findUserById: jest.fn(),
  create: jest.fn(),
};

const mockJwtUtil = {
  generateToken: jest.fn(),
};

describe("UserService 테스트", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService({
      jwtUtil: mockJwtUtil,
      userRepository: mockUserRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 🔹 Password Hashing
  test("hashPw() - 비밀번호 해싱", async () => {
    const password = "mypassword";
    const hashedPw = await userService.hashPw(password);
    
    expect(hashedPw).toBeDefined();
    expect(typeof hashedPw).toBe("string");
  });

  // 🔹 Password 비교
  test("comparePw() - 비밀번호 비교 성공", async () => {
    const password = "mypassword";
    const hashedPw = await bcrypt.hash(password, 10);
    
    const isMatch = await userService.comparePw(password, hashedPw);
    
    expect(isMatch).toBe(true);
  });

  test("comparePw() - 비밀번호 비교 실패", async () => {
    const password = "mypassword";
    const wrongPassword = "wrongpassword";
    const hashedPw = await bcrypt.hash(password, 10);
    
    const isMatch = await userService.comparePw(wrongPassword, hashedPw);
    
    expect(isMatch).toBe(false);
  });

  // 🔹 getAccessToken()
  test("getAccessToken() - 올바른 ID, 비밀번호로 토큰 반환", async () => {
    // Given (Mock 데이터 설정)
    const mockUser = {
      id: "user123",
      password: await bcrypt.hash("mypassword", 10),
      nickname: "John",
      role_id: 1,
      role: "admin",
    };

    mockUserRepository.findUserById.mockResolvedValue(mockUser);
    mockJwtUtil.generateToken.mockResolvedValue("mockToken");

    // When
    const token = await userService.getAccessToken("user123", "mypassword");

    // Then
    expect(mockUserRepository.findUserById).toHaveBeenCalledWith("user123");
    expect(mockJwtUtil.generateToken).toHaveBeenCalledWith({
      id: mockUser.id,
      nickname: mockUser.nickname,
      role_id: mockUser.role_id,
      role: mockUser.role,
    });
    expect(token).toBe("mockToken");
  });

  test("getAccessToken() - 잘못된 ID 입력 시 예외 발생", async () => {
    mockUserRepository.findUserById.mockResolvedValue(null);

    await expect(userService.getAccessToken("invalidID", "mypassword"))
      .rejects.toThrow(new customError(404, "Not Found", "Wrong pswd or id"));
  });

  test("getAccessToken() - 잘못된 비밀번호 입력 시 예외 발생", async () => {
    const mockUser = {
      id: "user123",
      password: await bcrypt.hash("mypassword", 10),
    };

    mockUserRepository.findUserById.mockResolvedValue(mockUser);

    await expect(userService.getAccessToken("user123", "wrongpassword"))
      .rejects.toThrow(new customError(404, "Not Found", "Wrong pswd or id"));
  });

  // 🔹 getUser()
  test("getUser() - 존재하는 사용자 조회", async () => {
    const mockUser = {
      id: "user123",
      nickname: "John",
    };

    mockUserRepository.findUserById.mockResolvedValue(mockUser);

    const user = await userService.getUser("user123");

    expect(mockUserRepository.findUserById).toHaveBeenCalledWith("user123");
    expect(user).toEqual(mockUser);
  });

  test("getUser() - 존재하지 않는 사용자 조회 시 예외 발생", async () => {
    mockUserRepository.findUserById.mockResolvedValue(null);

    await expect(userService.getUser("invalidID"))
      .rejects.toThrow(new customError(404, "Not Found", "User with this ID not found"));
  });

  // 🔹 register()
  test("register() - 새로운 사용자 등록", async () => {
    mockUserRepository.create.mockResolvedValue(true);

    await userService.register("user123", "mypassword", "John");

    expect(mockUserRepository.create).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      "John"
    );
  });
});
