import axios, { AxiosError, AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

// 요청 인터셉터 추가: 요청 전에 액세스 토큰 확인
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가: 401 Unauthorized 오류 처리
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 액세스 토큰 만료 시
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const refreshResponse = await instance.post("/auth/refresh", {
            refreshToken,
          });
          const newAccessToken = refreshResponse.data.accessToken;

          // 새 액세스 토큰을 로컬 스토리지에 저장
          localStorage.setItem("accessToken", newAccessToken);

          // 실패한 요청을 새 액세스 토큰으로 다시 시도
          const originalConfig = error.config as AxiosRequestConfig;
          originalConfig.headers = {
            ...originalConfig.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
          return instance(originalConfig); // 재시도
        } catch (refreshError) {
          // 리프레시 토큰도 만료된 경우 로그아웃 처리
          console.error("리프레시 토큰 만료", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/signin";
        }
      } else {
        console.error("리프레시 토큰 없음");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  },
);

// 요청 파라미터 및 응답 타입 정의
type RequestParam = { wineId?: number }; // wineId는 선택적 파라미터
type GetWinesResponse = { title: string; desc: string }; // 응답 구조에 맞게 수정
type LoginRequest = { email: string; password: string };
type LoginResponse = { token: string; user: { id: number; name: string } };
type RefreshTokenRequest = { refreshToken: string };
type RefreshTokenResponse = { token: string; expiresIn: number };

// 와인 정보 가져오기 함수
export const getWines = async (params: RequestParam) => {
  try {
    // GET 요청 보내기 (params는 객체로 전달)
    const response = await instance.get<GetWinesResponse>("/wines", { params });
    return response; // 인터셉터에서 이미 데이터만 반환하므로 그대로 리턴
  } catch (error) {
    console.error("와인 정보 가져오기 오류:", error);
    throw error; // 오류를 다시 던져서 호출한 곳에서 처리하게끔
  }
};

// POST요청 로그인 함수
export const loginUser = async (data: LoginRequest) => {
  try {
    const response = await instance.post<LoginResponse>("/auth/signIn", data);
    return response;
  } catch (error) {
    console.error("로그인 오류", error);
    throw error;
  }
};

// 토큰 갱신 함수
export const refreshToken = async (data: RefreshTokenRequest) => {
  try {
    const response = await instance.post<RefreshTokenResponse>(
      "/auth/refresh-token",
      data,
    );
    return response;
  } catch (error) {
    console.error("토큰 갱신 오류", error);
    throw error;
  }
};
