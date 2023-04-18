package com.model; 
// import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;


    @Column(nullable = false)
    private String name;

    // @Length(min = 14, max = 14)
    @Column(nullable = false)
    private String cnpj;

    // @Length(min = 8, max = 8)
    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String numero;
    
}
