import axios, { AxiosRequestConfig } from "axios";

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

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const res = await instance.post("/auth/refresh-token", {
          refreshToken,
        });

        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);

        // originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        originalRequest._retry = true;

        // 원래의 요청을 새로운 토큰으로 다시 보냄
        return instance(originalRequest);
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

// OAuth 앱 등록 함수
export const registerOAuthApp = async (provider: string) => {
  try {
    // 환경변수에서 appKey를 가져옵니다.
    const appKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 API 키 (혹은 구글 API 키로 수정 가능)

    if (!appKey) {
      throw new Error("appKey가 설정되지 않았습니다. 환경변수를 확인해주세요.");
    }

    // POST요청
    const data = {
      appKey, // 카카오 또는 구글 API 키
      provider, // 'KAKAO' 또는 'GOOGLE'
    };

    // POST 요청을 보내어 OAuth 앱 등록
    const response = await instance.post("/oauthApps", data); // 여기서 "/oauthApps" 사용

    // 응답 반환
    return response;
  } catch (error) {
    console.error("OAuth 앱 등록 오류:", error);
    throw error;
  }
};

// 카카오 로그인 후 토큰 발급 요청 함수
export const signInWithKakao = async (data: {
  redirectUri: string;
  token: string;
}) => {
  try {
    // /auth/signIn/KAKAO 엔드포인트로 POST 요청
    const response = await instance.post("/auth/signIn/KAKAO", data);
    return response; // 응답 반환
  } catch (error) {
    console.error("카카오 로그인 오류", error);
    throw error; // 오류를 다시 던져서 호출한 곳에서 처리하게끔
  }
};
