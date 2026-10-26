"use client";
import {useEffect, useState} from "react";
export default function AdicionarTreinamento() {

const [treinamentos, setTreinamentos] = useState([]);
const [titulo, setTitulo] = useState("");
const [descricao, setDescricao] = useState("");
const [categoria, setCategoria] = useState("");
const [duracao, setDuracao] = useState("");

useEffect(() => {
    fetch("http://localhost:3001/treinamento")
        .then(resposta => resposta.json())
        .then(dados => {
            console.log("Treinamentos:",dados);
            setTreinamentos(dados);
        });
}, []);

    async function adicionar(event) {
        event.preventDefault();

        const novoTreinamento = {
            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            duracao: duracao
    };
    
    const resposta = await fetch ("http://localhost:3001/treinamento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoTreinamento)
    });
    
    const dados = await resposta.json();
    console.log(dados);
    


setTreinamentos([...treinamentos, dados]);

}


    return(
        <main>
            <h1>Adicione um Treinamento</h1>
            <form onSubmit={adicionar}>
                <input type="text" name="titulo" placeholder="Titulo" value={titulo} onChange={(t) => setTitulo(t.target.value)}/>
                <input type="text" name="descrição" placeholder="Descrição" value={descricao} onChange={(d) => setDescricao(d.target.value)} />
                <input type="text" name="categoria" placeholder="Categoria" value={categoria} onChange={(c) => setCategoria(c.target.value)} />
                <input type="text" name="duracao" placeholder="Duração" value={duracao} onChange={(du) => setDuracao(du.target.value)}/>
                <button type="submit">Adicionar Treinamento</button>
            </form>
            <div>
                {treinamentos.map(treinamento => (
                    <div key={treinamento.id}>
                        <h2>{treinamento.titulo}</h2>
                        <p>{treinamento.descricao}</p>
                        <p>{treinamento.categoria}</p>
                        <p>{treinamento.duracao}</p>
                    </div>
                ))}
            </div>
        </main>
    );


}

