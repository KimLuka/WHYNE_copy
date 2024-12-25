"use client";

import instance from "@/api/api";
import { LoginRequest, UpdateMeRequest, User } from "@/types/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthValues {
  user: User | null;
  isPending: boolean;
}

interface AuthContextType extends AuthValues {
  login: (data: LoginRequest) => void;
  logout: () => void;
  updateMe: (data: UpdateMeRequest) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<AuthValues>({
    user: null,
    isPending: true,
  });

  // const pathname = usePathname();

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser: User | null;
    try {
      const res = await instance.get<User>("/users/me");
      nextUser = res.data;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({ email, password }: LoginRequest) {
    const res = await instance.post("/auth/signin", {
      email,
      password,
    });

    const { accessToken, refreshToken } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    await getMe();
  }

  async function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setValues((prevValues) => ({
      ...prevValues,
      user: null,
    }));
  }

  async function updateMe({ image, nickname }: UpdateMeRequest) {
    const res = await instance.patch("/users/me", { image, nickname });
    const nextUser = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
    }));
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        updateMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required?: boolean) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      alert("로그인이 필요합니다.");
      router.push("/signin");
    }
  }, [context.user, context.isPending, router, required]);

  return context;
}
