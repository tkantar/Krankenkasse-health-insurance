package com.example.krankenkasse.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Hier würdest du den Benutzer aus der Datenbank laden
        // In diesem Beispiel wird ein Benutzer mit dem Rollennamen ROLE_USER zurückgegeben
        return User.withUsername(username)
                .password("")  // Das Passwort wird nicht benötigt, da JWT verwendet wird
                .roles("USER") // Dies sollte die tatsächliche Rolle des Benutzers sein
                .build();
    }
}
