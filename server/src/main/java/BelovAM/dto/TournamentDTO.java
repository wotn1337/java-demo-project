package BelovAM.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class TournamentDTO {
    private Long id;
    @NotBlank
    private String name;

    @Nullable
    private List<Long> teams;
}
