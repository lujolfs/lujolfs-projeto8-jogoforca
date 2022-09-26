import { useState } from "react"
import palavras from "./palavras";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle"


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
    const [gameOver, setGameOver] = useState(false)

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
        setGameOver(false);
    }

    function compararLetra(letra) {
        letrasClicadas.push(letra);
        setLetrasClicadas(letrasClicadas);
        setDisableList(prev => ({ ...prev, [letra]: true}))
        if (letrasNormalizadas.includes(letra)) {
            letraCerta.push(letra);
            setLetraCerta(letraCerta);
        } else {
            letraErrada.push(letra);
            setLetraErrada(letraErrada);
            setContaForca(contaForca + 1);
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
        if (letraCerta.length === letrasNormalizadas.length) {
            venceuJogo();
        } else if (letraErrada.length === 6) {
            perdeuJogo();
        }
    }

    function venceuJogo() {
        alert("Parabéns, você venceu!");
        setDisableList(alfabetoDisabled);
        setGameOver(true);
    }

    function perdeuJogo() {
        setContaForca(6);
        alert("Não foi dessa vez! Tente de novo!");
        setDisableList(alfabetoDisabled);
        setGameOver(true);
    }

    function chuteTeste() {
        setLetrasClicadas([]);
        setBotaoDesliga(!botaoDesliga);
        setDisableList(alfabetoDisabled);
        const chuteMaiusculo = chute.toUpperCase();
        const chuteNormalizado = chuteMaiusculo.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const chuteNormalizadoArray = [...chuteNormalizado];
        const chuteLetraRepetida = new Set(chuteNormalizadoArray);
        const chuteLetraUnica = Array.from(chuteLetraRepetida);
        setLetrasClicadas(chuteLetraUnica);
        compararLetraChute(chuteLetraUnica);
    }

    function incluiLetra(letra) {
        const letraRender = letra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (letraCerta.includes(letraRender)) {
            return letra;
        } else {
            return "_";
            
        }
    }

    return (
        <Container>
            <InicioJogo>
            <Forca>
                <ForcaImg src={`assets/forca${contaForca}.png`} alt={`Você cometeu ${contaForca} erros.` } data-identifier="game-image" />
            </Forca>
            <GerarPalavra>
            <Inicio>
                <div className="botao">
                    <BotaoStart data-identifier="choose-word" type="button" onClick={defineResposta} className="botaoPalavra">
                        Escolher palavra
                    </BotaoStart>
                </div>
            </Inicio>

            <Dicas>
                {gameOver === false ? letrasDica.map((letra, index) => (
                    <div className="dicasCaixa" key={index}>
                        <div
                            className="dicasProper"
                            key={index}
                            data-identifier="word"
                        >
                            <h1>{incluiLetra(letra)}</h1>
                        </div>
                    </div>
                )) : letrasDica.map((letra, index) => (
                    <div className="dicasCaixa" key={index}>
                        <div
                            className="dicasProper"
                            key={index}
                            data-identifier="word"
                            >
                                <h1>{letra}</h1>
                            </div>
                    </div>
                ))}
            </Dicas>
            </GerarPalavra>
            </InicioJogo>
            <Botoes>
                <div className="botao-letra">
                    {alfabeto.map((a) => (
                        <BotaoLetra
                            disabled={disableList[a]}
                            type="button"
                            onClick={() => compararLetra(a)}
                            key={a}
                            data-identifier="letter">
                            {a}
                        </BotaoLetra>
                    ))
                    }
                </div>
            </Botoes>
            <div>
                <Chute className="input-direto">
                    <h1>Já sei a palavra!</h1><br />
                    <ChutaTudo>
                    <DigitaChute
                        type="text"
                        disabled={botaoDesliga ? "true" : ""}
                        name="chute"
                        onChange={event => setChute(event.target.value)}
                        data-identifier="type-guess"
                    />
                    <BotaoChutar data-identifier="guess-button" disabled={botaoDesliga ? "true" : ""} onClick={() => chuteTeste()}>Chutar</BotaoChutar>
                    </ChutaTudo>
                </Chute>
            </div>
            <GlobalStyle />
        </Container>
    )
}


const Container = styled.div`
display: flex;
flex-direction: column;
gap: 40px;
align-items:center;
`
const InicioJogo = styled.div`
display: flex;
flex-direction: row;
gap: 100px;
align-items: center;
`

const Forca = styled.div`
box-sizing: border-box;
height: 100%;

`

const ForcaImg = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
`
const GerarPalavra = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
height: 300px;
width: 100%;
`

const BotaoStart = styled.button`
background-color: #26ad60;
border-radius: 4px;
border: none;
height: 80px;
width: 150px;
font-size: 15px;
color: white;
cursor: pointer;

}
`

const Inicio = styled.div`
`

const Dicas = styled.div`
display: flex;
margin: 0px, 20px;
justify-content: space-evenly;
font-size: 35px;
width: 100%;
font-family: arial;
color: black;
`

const Botoes = styled.div`
display: flex;
flex-wrap: wrap;
font-size: 35px;
height: 50px;
width: 715px;
margin: 5%;
`

const BotaoLetra = styled.button`
font-size 25px;
height: 50px;
width: 45px;
border-radius: 4px;
border: none;
margin: 5px;
color: #407094;
background-color:#e1ebf4;
cursor: pointer;
&:disabled {
    cursor: not-allowed;
    background-color: grey;
}
`

const Chute = styled.div`
font-family: Arial;
display: flex;
align-items: center;
gap: 15px;
`

const ChutaTudo = styled.div`
display: flex;
`

const DigitaChute = styled.input`
&:disabled {
    cursor: not-allowed;
    background-color: grey;
}
`

const BotaoChutar = styled.button`
color: #407094;
background-color:#e1ebf4;
border-radius: 4px;
border:none;
height: 50px;
width: 80px;
cursor: pointer;
&:disabled {
    cursor: not-allowed;
    background-color: grey;
}
`