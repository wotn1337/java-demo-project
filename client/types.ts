export type Register = {
  username: string;
  password: string;
};

export type Player = {
  id: number;
  name: string;
};

export type CreatePlayer = {
  name: string;
};

export type Team = {
  id: number;
  name: string;
  players: Player[];
};

export type CreateTeam = {
  name: string;
  players?: number[];
};

export type CreateTournament = {
  name: string;
  teams?: number[];
};

export type Tournament = {
  id: number;
  name: string;
  teams: Team[];
};
