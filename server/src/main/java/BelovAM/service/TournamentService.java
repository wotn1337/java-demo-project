package BelovAM.service;

import BelovAM.dto.TeamDTO;
import BelovAM.dto.TournamentDTO;
import BelovAM.entity.*;
import BelovAM.repository.TeamRepository;
import BelovAM.repository.TournamentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class TournamentService {
    private final TournamentRepository tournamentRepository;
    private final TeamService teamService;

    public Tournament create(TournamentDTO dto) {
        Tournament team = Tournament.builder()
                .name(dto.getName())
                .teams(teamService.readByIds(dto.getTeams()))
                .build();
        return tournamentRepository.save(team);
    }

    public List<Tournament> readAll() {
        return tournamentRepository.findAll();
    }

    public Tournament readById(Long id) {
        return tournamentRepository.findById(id).orElseThrow(() -> new RuntimeException("Tournament not found " + id));
    }

    public Tournament update(Tournament team) {
        return tournamentRepository.save(team);
    }

    public void delete(Long id) {
        tournamentRepository.deleteById(id);
    }

    public Bracket initBracket(Long id) {
        Tournament tournament = readById(id);
        List<Team> teams = tournament.getTeams();
        List<Match> matches = new ArrayList<Match>();
        for (int i = 0; i < teams.size() - 1; i += 2) {
            Team current = teams.get(i);
            Team next = null;
            if (i + 1 < teams.size()) {
                next = teams.get(i + 1);
            }
            List<Team> participants = new ArrayList<Team>();
            participants.add(current);
            participants.add(next);
            Match match = Match.builder()
                    .teams(participants)
                    .date(new Date().toString())
                    .build();
            matches.add(match);
        }
        var round = Round.builder().title("Round one").matches(matches).build();
        var rounds = new ArrayList<Round>();
        rounds.add(round);

        Bracket bracket = Bracket.builder().rounds(rounds).build();
        tournament.setBracket(bracket);
        return tournamentRepository.save(tournament).getBracket();
    }
}
