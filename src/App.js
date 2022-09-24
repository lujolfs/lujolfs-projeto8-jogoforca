import { useState } from "react"
import palavras from "./palavras";
import forca0 from "./assets/forca0.png";

const alfanumerico = Array.from(Array(26)).map((e, i) => i + 65);
const alfabeto = alfanumerico.map((x) => String.fromCharCode(x));

/* 
} */

export default function App() {

    return (
        <>
            <>
                <div className="botao-palavra">
                    <button type="button" onClick={inicioJogo} className="botaoPalavra">
                        Gerar uma nova palavra.
                    </button>
                </div>
            </>
            <>
                <div className="botao-letra">
                    {alfabeto.map((a) => (
                        <button type="button" key={a}>{a}</button>
                    ))
                    }
                </div>
            </>
        </>
    )
}


function inicioJogo() {
    defineResposta();
    function defineResposta() {
        const palavra = palavras[Math.floor(Math.random() * palavras.length)]
        console.log(palavra);
        const palavraArray = [...palavra];
        renderDica();

        function renderDica() {
            palavraArray.map((letra) => (
                <li className="dica" key={letra}>
                    <p>_</p>
                </li>
            ))

        }
    }
}