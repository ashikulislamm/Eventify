import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  university: string;
  department: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface Club {
  id: string;
  club_name: string;
  nickname?: string;
  email: string;
  phone: string;
  university: string;
  description: string;
  president_name: string;
  president_email: string;
  logo?: string;
  website?: string;
  address?: string;
  is_verified: boolean;
}

interface AuthState {
  user: User | null;
  club: Club | null;
  userType: "user" | "club" | null;
  token: string | null;
  loading: boolean;
  initialized: boolean;
  loginUser: (user: User, token: string) => void;
  loginClub: (club: Club, token: string) => void;
  logout: () => void;
  updateUser: (userUpdates: Partial<User>) => void;
  updateClub: (clubUpdates: Partial<Club>) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  club: null,
  userType: null,
  token: null,
  loading: true,
  initialized: false,

  loginUser: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("userType", "user");
    set({ user, club: null, userType: "user", token, loading: false });
  },

  loginClub: (club, token) => {
    localStorage.setItem("club", JSON.stringify(club));
    localStorage.setItem("clubToken", token);
    localStorage.setItem("userType", "club");
    set({ club, user: null, userType: "club", token, loading: false });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("club");
    localStorage.removeItem("clubToken");
    localStorage.removeItem("userType");
    set({ user: null, club: null, userType: null, token: null, loading: false });
  },

  updateUser: (userUpdates) => {
    set((state) => {
      if (!state.user) return state;
      const updated = { ...state.user, ...userUpdates };
      localStorage.setItem("user", JSON.stringify(updated));
      return { user: updated };
    });
  },

  updateClub: (clubUpdates) => {
    set((state) => {
      if (!state.club) return state;
      const updated = { ...state.club, ...clubUpdates };
      localStorage.setItem("club", JSON.stringify(updated));
      return { club: updated };
    });
  },

  initialize: () => {
    if (typeof window === "undefined") return;

    try {
      const userType = localStorage.getItem("userType") as "user" | "club" | null;
      if (userType === "user") {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (userStr && token) {
          set({
            user: JSON.parse(userStr),
            club: null,
            userType: "user",
            token,
            loading: false,
            initialized: true,
          });
          return;
        }
      } else if (userType === "club") {
        const clubStr = localStorage.getItem("club");
        const token = localStorage.getItem("clubToken");
        if (clubStr && token) {
          set({
            club: JSON.parse(clubStr),
            user: null,
            userType: "club",
            token,
            loading: false,
            initialized: true,
          });
          return;
        }
      }
    } catch (e) {
      console.error("Error initializing auth store:", e);
    }

    set({ user: null, club: null, userType: null, token: null, loading: false, initialized: true });
  },
}));

export default useAuthStore;
