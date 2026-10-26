"use client";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import "@/app/treinamento/treinamento.css";

export default function(){

const [treinamentos, setTreinamentos] = useState([]);
useEffect(() => {
    fetch("http://localhost:3001/treinamento")
    .then(resposta => resposta.json())
    .then((dados => {
        setTreinamentos(dados);
    }));
}, []);
    return (
        <>

      
            <h1>Treinamentos Para Criadores</h1>
            
                
            
                {
                    treinamentos.map(treinamento => (
                    <div className="container-card">
                    <div className="card-body" key={treinamento.id}  >
                        <h4 className="card-title"> Titulo: {treinamento.titulo}</h4>
                        <p className="card-text"> Descrição: {treinamento.descricao}</p>
                        <p>Duração do treinamento: {treinamento.duracao}</p>
                        <a href="#" className="btn-solid theme-primary">
                        Entrar
                        </a>
                    </div>
                    </div>
                ))
                }
                
                    
                
                
           
                
           

    
        </>
    );


}


