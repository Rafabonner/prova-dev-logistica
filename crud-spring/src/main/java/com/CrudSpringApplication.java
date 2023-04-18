package com;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.model.Cliente;
import com.repository.ClienteRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ClienteRepository clienteRepository) {
		return args -> {
			clienteRepository.deleteAll();

			Cliente c = new Cliente();
			c.setName("Rafael");
			c.setCnpj("2412412");
			c.setCep("06642355");
			c.setCidade("Jandira");
			c.setBairro("JD Golf");
			c.setNumero("213");


			clienteRepository.save(c);
		};
	}

}
