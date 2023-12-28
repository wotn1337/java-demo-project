package BelovAM.controller;

import BelovAM.dto.PlayerDTO;
import BelovAM.entity.Player;
import BelovAM.service.PlayerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/players")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {
    private final PlayerService playerService;

    @PostMapping
    public ResponseEntity<Player> create(@RequestBody PlayerDTO dto) {
        return new ResponseEntity<>(playerService.create(dto), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Player>> readAll() {
        return new ResponseEntity<>(playerService.readAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Player> update(@RequestBody Player player) {
        return new ResponseEntity<>(playerService.update(player), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public HttpStatus update(@PathVariable Long id) {
        playerService.delete(id);
        return HttpStatus.OK;
    }
}
