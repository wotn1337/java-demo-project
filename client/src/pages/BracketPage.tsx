import { useEffect, useState } from "react";
import { Bracket, IRoundProps, ISeedProps } from "react-brackets";
import { useParams } from "react-router-dom";
import { Team, Tournament } from "../../types";
import { getTournament } from "../api";

// const rounds: IRoundProps[] = [
//   {
//     title: "Round one",
//     seeds: [
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team A" }, { name: "Team B" }],
//       },
//       {
//         id: 2,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team C" }, { name: "Team D" }],
//       },
//     ],
//   },
//   {
//     title: "Round one",
//     seeds: [
//       {
//         id: 3,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team A" }, { name: "Team C" }],
//       },
//     ],
//   },
// ];

export const BracketPage = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState<Tournament>();
  const [rounds, setRounds] = useState<IRoundProps[]>([]);

  const initBracket = () => {
    const matches: ISeedProps[] = [];
    let teams: Team[] = [];
    tournament?.teams.forEach((team, index) => {
      teams.push(team);
      if (teams.length === 2 || index === tournament.teams.length - 1) {
        matches.push({
          id: teams[0].id + "_" + teams[1]?.id,
          date: new Date().toLocaleDateString("ru"),
          teams,
        });
        teams = [];
      }
    });
    const rounds = [{ title: "Round 1", seeds: matches }];
    let nextRoundLen = matches.length / 2;
    while (nextRoundLen >= 1) {
      rounds.push({
        title: "Round n",
        seeds: Array(
          Math.round(nextRoundLen) === 0 ? 1 : Math.round(nextRoundLen)
        ).fill({
          id: nextRoundLen,
          date: new Date().toLocaleDateString(),
          teams: [],
        }),
      });
      nextRoundLen = nextRoundLen / 2;
    }

    setRounds(rounds);
  };

  useEffect(() => {
    if (id) {
      getTournament(Number(id)).then((data) => setTournament(data));
      // initBracket(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (tournament) {
      initBracket();
    }
  }, [tournament]);

  return <Bracket rounds={rounds} />;
};
