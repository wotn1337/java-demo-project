package BelovAM.controller;

import BelovAM.dto.TeamDTO;
import BelovAM.entity.Team;
import BelovAM.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/teams")
@CrossOrigin(origins = "http://localhost:5173")
public class TeamController {
    private final TeamService teamService;

    @PostMapping
    public ResponseEntity<Team> create(@RequestBody TeamDTO dto) {
        return new ResponseEntity<>(teamService.create(dto), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Team>> readAll() {
        return new ResponseEntity<>(teamService.readAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Team readById(@PathVariable Long id) {
        return teamService.readById(id);
    }

    @PutMapping
    public ResponseEntity<Team> update(@RequestBody Team team) {
        return new ResponseEntity<>(teamService.update(team), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public HttpStatus update(@PathVariable Long id) {
        teamService.delete(id);
        return HttpStatus.OK;
    }
}
