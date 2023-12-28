package BelovAM.service;

import BelovAM.dto.RegisterDTO;
import BelovAM.entity.User;
import BelovAM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            log.info("{}", optionalUser.get());
            return optionalUser.get();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }

    public User save(RegisterDTO dto) {
        var user = User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .build();
        return userRepository.save(user);
    }
}