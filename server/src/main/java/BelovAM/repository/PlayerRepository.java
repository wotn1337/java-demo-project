package BelovAM.repository;

import BelovAM.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {
//    List<Player> findByTeamId(Long id);
}