import { useState } from "react"
import palavras from "./palavras";
import "./styles.css";

const alfanumerico = Array.from(Array(26)).map((e, i) => i + 65);
const alfabeto = alfanumerico.map((x) => String.fromCharCode(x));
const alfabetoDisabled = {A: true, B: true, C: true, D: true, E: true, F: true, G: true, H: true, I: true, J: true, K: true, L: true, M: true, N: true, O: true, P: true, Q: true, R: true, S: true, T: true, U: true, V: true, W: true, X: true, Y: true, Z:true};


export default function App() {

    const [letrasDica, setLetrasDica] = useState([]);
    const [letrasNormalizadas, setLetrasNormalizadas] = useState([]);
    const [letrasClicadas, setLetrasClicadas] = useState([]);
    const [letraCerta, setLetraCerta] = useState([]);
    const [letraErrada, setLetraErrada] = useState([]);
    const [contaForca, setContaForca] = useState(0);
    const [botaoDesliga, setBotaoDesliga] = useState(true);
    const [disableList, setDisableList] = useState(alfabetoDisabled);
    const [chute, setChute] = useState()

    function defineResposta() {
        const palavraOriginal = palavras[Math.floor(Math.random() * palavras.length)]
        const palavra = palavraOriginal.toUpperCase();
        const palavraArray = [...palavra]
        const palavraNormalizada = palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const palavraNormalizadaArray = [...palavraNormalizada];
        const palavraLetraRepetida = new Set(palavraNormalizadaArray);
        const palavraLetraUnica = Array.from(palavraLetraRepetida);
        setLetrasNormalizadas(palavraLetraUnica);
        setLetrasDica(palavraArray);
        setLetrasClicadas([]);
        setLetraCerta([]);
        setLetraErrada([]);
        setContaForca(0);
        setBotaoDesliga(false);
        setDisableList({});
        setChute("");
        console.log(palavraNormalizadaArray);
    }

    function compararLetra(letra) {
        letrasClicadas.push(letra);
        setLetrasClicadas(letrasClicadas);
        setDisableList(prev => ({ ...prev, [letra]: true}))
        if (letrasNormalizadas.includes(letra)) {
            letraCerta.push(letra);
            setLetraCerta(letraCerta);
            console.log(letraCerta);
            /* revelaLetra(letra); */
        } else {
            letraErrada.push(letra);
            setLetraErrada(letraErrada);
            setContaForca(contaForca + 1);
            console.log("Errouuuuu!!");
        }
        verificaAcerto();
    }

    function compararLetraChute(chuteInput) {
        letrasClicadas.push(...chuteInput);
        setLetrasClicadas(letrasClicadas);
        setDisableList(alfabetoDisabled);
        verificaAcertoChute();
    }

    function verificaAcertoChute() {
        if (JSON.stringify(letrasClicadas) === JSON.stringify(letrasNormalizadas)) {
            venceuJogo();
        } else {
            perdeuJogo();
        }
    }

    function verificaAcerto() {
        console.log(letrasClicadas);
        if (letraCerta.length === letrasNormalizadas.length) {
            venceuJogo();
        } else if (letraErrada.length === 6) {
            perdeuJogo();
        }
    }

    function venceuJogo() {
        alert("Parabéns, você venceu!");
        setDisableList(alfabetoDisabled);
    }

    function perdeuJogo() {
        alert("Não foi dessa vez! Tente de novo!");
        setDisableList(alfabetoDisabled);
        setContaForca(6);
    }

    function chuteTeste() {
        console.log(chute);
        setBotaoDesliga(!botaoDesliga);
        setDisableList(alfabetoDisabled);
        const chuteMaiusculo = chute.toUpperCase();
        const chuteNormalizado = chuteMaiusculo.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const chuteNormalizadoArray = [...chuteNormalizado];
        const chuteLetraRepetida = new Set(chuteNormalizadoArray);
        const chuteLetraUnica = Array.from(chuteLetraRepetida);
        setLetrasClicadas(chuteLetraUnica);
        compararLetraChute(chuteLetraUnica);
        console.log(chuteLetraUnica);
    }

    function incluiLetra(letra) {
        const letraRender = letra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (letraCerta.includes(letraRender)) {
            return letra;
        } else {
            return "_";
            
        }
    }

/*     function revelaLetra(letra) {
        const letraRevelada = palavraLetraRepetida.filter(letra, index);
        consonle.log(letraRevelada);

    } */




    return (
        <>
            <>
                <img src={`assets/forca${contaForca}.png`} alt={`Você cometeu ${contaForca} erros.`} />
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
                            <h1>{incluiLetra(letra)}</h1>
                        </div>
                    </div>
                ))}
            </>
            <>
                <div className="botao-letra">
                    {alfabeto.map((a) => (
                        <button
                            disabled={disableList[a]}
                            type="button"
                            onClick={() => compararLetra(a)}
                            key={a}>
                            {a}
                        </button>
                    ))
                    }
                </div>
            </>
            <>
                <div className="input-direto">
                    <h1>Eu já sei a palavra!</h1><br />
                    <input
                        type="text"
                        disabled={botaoDesliga ? "true" : ""}
                        name="chute"
                        onChange={event => setChute(event.target.value)}
                    />
                    <button disabled={botaoDesliga ? "true" : ""} onClick={() => chuteTeste()}>Chutar</button>
                </div>
            </>
        </>
    )
}