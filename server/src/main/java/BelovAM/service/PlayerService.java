package BelovAM.service;

import BelovAM.dto.PlayerDTO;
import BelovAM.entity.Player;
import BelovAM.repository.PlayerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PlayerService {
    private final PlayerRepository playerRepository;

    public Player create(PlayerDTO dto) {
        Player player = Player.builder()
                .name(dto.getName())
                .build();
        return playerRepository.save(player);
    }

    public List<Player> readAll() {
        return playerRepository.findAll();
    }

//    public List<Player> readByTeamId(Long id) {
//        return playerRepository.findByTeamId(id);
//    }

    public List<Player> readByIds(List<Long> ids) {
        return playerRepository.findAllById(ids);
    }

    public Player update(Player player) {
        return playerRepository.save(player);
    }

    public void delete(Long id) {
        playerRepository.deleteById(id);
    }
}
