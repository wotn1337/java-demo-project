package BelovAM.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PlayerDTO {
    private Long id;
    @NotBlank
    private String name;
}
