import axios, { AxiosResponse } from "axios";
import {
  CreatePlayer,
  CreateTeam,
  CreateTournament,
  Player,
  Register,
  Team,
  Tournament,
} from "../../types";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (data: Register) => {
  const response = await instance.post<Register>("auth/register", data);
  return response.data;
};

export const login = async (data: Register) => {
  const response = await instance.post<Register>("auth/login", data);
  return response.data;
};

export const getPlayers = async () => {
  const response = await instance.get<Player[]>("players");
  return response.data;
};

export const createPlayer = async (data: CreatePlayer) => {
  const response = await instance.post<CreatePlayer, AxiosResponse<Player>>(
    "players",
    data
  );
  return response.data;
};

export const deletePlayer = async (id: number) => {
  const response = await instance.delete(`players/${id}`);
  return response.data;
};

export const editPlayer = async (data: Player) => {
  const response = await instance.put(`players`, data);
  return response.data;
};

export const getTeams = async () => {
  const response = await instance.get<Team[]>("teams");
  return response.data;
};

export const createTeam = async (data: CreateTeam) => {
  const response = await instance.post<CreateTeam, AxiosResponse<Team>>(
    "teams",
    data
  );
  return response.data;
};

export const deleteTeam = async (id: number) => {
  const response = await instance.delete(`teams/${id}`);
  return response.data;
};

export const editTeam = async (data: Team) => {
  const response = await instance.put(`teams`, data);
  return response.data;
};

export const getTournaments = async () => {
  const response = await instance.get<Tournament[]>("tournaments");
  return response.data;
};

export const getTournament = async (id: number) => {
  const response = await instance.get<Tournament>(`tournaments/${id}`);
  return response.data;
};

export const createTournament = async (data: CreateTournament) => {
  const response = await instance.post<
    CreateTournament,
    AxiosResponse<Tournament>
  >("tournaments", data);
  return response.data;
};

export const deleteTournament = async (id: number) => {
  const response = await instance.delete(`tournaments/${id}`);
  return response.data;
};

export const editTournament = async (data: Tournament) => {
  const response = await instance.put(`tournaments`, data);
  return response.data;
};

export const initBracket = async (id: number) => {
  const response = await instance.get(`tournaments/${id}/init-bracket`);
  return response.data;
};
