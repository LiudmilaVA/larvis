export type MyProfileTypes = {
  user_id: string;
  name: string;
  password: string;
};

export type AcquisitionsTypes = {
  timestamp: number;
  ore_sites: number;
};

export type AuthContextTypes = {
  token: string | null;
  userId: string | null;
  login: (newToken: string, newUserId: string) => void;
  logout: () => void;
};
