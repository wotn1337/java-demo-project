package BelovAM.controller;

import BelovAM.dto.TournamentDTO;
import BelovAM.entity.Bracket;
import BelovAM.entity.Tournament;
import BelovAM.service.TournamentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tournaments")
@CrossOrigin(origins = "http://localhost:5173")
public class TournamentController {
    private final TournamentService tournamentService;

    @PostMapping
    public ResponseEntity<Tournament> create(@RequestBody TournamentDTO dto) {
        return new ResponseEntity<>(tournamentService.create(dto), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Tournament>> readAll() {
        return new ResponseEntity<>(tournamentService.readAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Tournament readById(@PathVariable Long id) {
        return tournamentService.readById(id);
    }

    @PutMapping
    public ResponseEntity<Tournament> update(@RequestBody Tournament tournament) {
        return new ResponseEntity<>(tournamentService.update(tournament), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public HttpStatus update(@PathVariable Long id) {
        tournamentService.delete(id);
        return HttpStatus.OK;
    }

    @GetMapping("/{id}/init-bracket")
    public ResponseEntity<Bracket> initBracket(@PathVariable Long id) {
        return new ResponseEntity<>(tournamentService.initBracket(id), HttpStatus.OK);
    }
}
