package BelovAM.service;

import BelovAM.dto.TeamDTO;
import BelovAM.entity.Player;
import BelovAM.entity.Team;
import BelovAM.repository.TeamRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    private final PlayerService playerService;

    public Team create(TeamDTO dto) {
        Team team = Team.builder()
                .name(dto.getName())
                .players(playerService.readByIds(dto.getPlayers()))
                .build();
        return teamRepository.save(team);
    }

    public List<Team> readAll() {
        return teamRepository.findAll();
    }

    public Team readById(Long id) {
        return teamRepository.findById(id).orElseThrow(() -> new RuntimeException("Team not found " + id));
    }

    public List<Team> readByIds(List<Long> ids) {
        return teamRepository.findAllById(ids);
    }

    public Team update(Team team) {
        return teamRepository.save(team);
    }

    public void delete(Long id) {
        teamRepository.deleteById(id);
    }
}
