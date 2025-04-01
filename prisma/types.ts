// Tipos que reflejan los modelos de Prisma
export interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
  genre: string[];
  age: string;
  duration: string;
  trailerVideo: string;
  movieVideo: string;
  createdAt: Date;
}

export interface PopularMovie {
  id: string;
  title: string;
  thumbnailUrl: string;
  genre: string[];
  age: string;
  duration: string;
  trailerVideo: string;
  movieVideo: string;
  ranking: number;
}

export interface User {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserNetflix {
  id: string;
  profileName: string;
  avatarUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
