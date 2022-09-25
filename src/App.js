import { useState } from "react"
import palavras from "./palavras";

const alfanumerico = Array.from(Array(26)).map((e, i) => i + 65);
const alfabeto = alfanumerico.map((x) => String.fromCharCode(x + 32));


export default function App() {

    const [letrasDica, setLetrasDica] = useState([]);
    const [letrasClicadas, setLetrasClicadas] = useState([]);

    function defineResposta() {
        const palavra = palavras[Math.floor(Math.random() * palavras.length)]
        const palavraArray = [...palavra]
        setLetrasDica(palavraArray);
        setLetrasClicadas([]);
        console.log(palavraArray);
    }

    function compararLetra(letra) {
        letrasClicadas.push(letra);
        setLetrasClicadas(letrasClicadas);
        letrasDica.includes(letra) ? console.log("Essa letra está na palavra.") : console.log("ERROU!!");
        verificaLetra();
    }

    function verificaLetra() {
        console.log(letrasClicadas);
    }

    return (
        <>
            <>
                <h1>Imagem da Forca</h1>
            </>
            <>
                <div className="botao-palavra">
                    <button type="button" onClick={defineResposta} className="botaoPalavra">
                        Gerar uma nova palavra.
                    </button>
                </div>
            </>
            <>
                {letrasDica.map((letra, index) => (
                    <div className="dicasCaixa" key={index}>
                        <div
                            className="dicasProper"
                            key={index}
                            >
                            <h1>_</h1>
                        </div>
                        <div
                            className="acertoLetra hidden"
                            key="'l'+{index}">
                            <h1>{letra}</h1>
                        </div>
                    </div>
                ))}
            </>
            <>
                <div className="botao-letra">
                    {alfabeto.map((a) => (
                        <button type="button" onClick={() => compararLetra(a)} key={a}>{a}</button>
                    ))
                    }
                </div>
            </>
        </>
    )
}
