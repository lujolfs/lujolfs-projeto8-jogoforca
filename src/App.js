import { useState } from "react"
import palavras from "./palavras";

const alfanumerico = Array.from(Array(26)).map((e, i) => i + 65);
const alfabeto = alfanumerico.map((x) => String.fromCharCode(x + 32));


export default function App() {

    const [letrasDica, setLetrasDica] = useState([]);
    const [letrasClicadas, setLetrasClicadas] = useState([]);
    const [letraCerta, setLetraCerta] = useState([]);
    const [letraErrada, setLetraErrada] = useState([]);
    const [contaForca, setContaForca] = useState(0);

    function defineResposta() {
        const palavra = palavras[Math.floor(Math.random() * palavras.length)]
        const palavraArray = [...palavra]
        setLetrasDica(palavraArray);
        setLetrasClicadas([]);
        setContaForca(0);
        console.log(palavraArray);
    }

    function compararLetra(letra) {
        letrasClicadas.push(letra);
        setLetrasClicadas(letrasClicadas);
        if (letrasDica.includes(letra)) {
            letraCerta.push(letra);
            setLetraCerta(letraCerta);
            console.log(letraCerta);
        } else {
            letraErrada.push(letra);
            setLetraErrada(letraErrada);
            setContaForca(contaForca + 1);
            console.log(contaForca);
            console.log(letraErrada.length);
        }
        verificaAcerto();
    }

    function verificaAcerto() {
        console.log(letrasClicadas);
        (letraCerta.length === letrasDica.length) ? console.log("Acertou!!") : console.log("Ainda não.");
        if (letraErrada.length === 6) {
            console.log("Perdeu")
        }
    }

    return (
        <>
            <>
                <h1>Imagem da Forca</h1>
                <img src={`assets/forca${contaForca}.png`} alt={`Você cometeu ${contaForca} erros.`}/>
            </>
            <>
                <div className="botao">
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
                        {/*                         <div
                            className="acertoLetra hidden"
                            key="'l'+{index}">
                            <h1>{letra}</h1>
                        </div> */}
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