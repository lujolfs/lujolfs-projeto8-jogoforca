import { useState } from "react"
import palavras from "./palavras";
import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";

const alfanumerico = Array.from(Array(26)).map((e, i) => i + 65);
const alfabeto = alfanumerico.map((x) => String.fromCharCode(x));

/* 
} */

export default function App() {

    return (
                <div onClick={defineResposta} className="botaoPalavra">
                    <p>Aqui vai ficar o botão "Escolher palavra".</p>
                </div>
    )
}

function defineResposta() {
    const palavra = palavras[Math.floor(Math.random() * palavras.length)]
    console.log(palavra);
    const palavraArray = [...palavra];
    console.log(palavraArray);
    palavraArray.map((letra) => (
        <li className="dica" key={letra}>
            <p>Letra _</p>
        </li>
    ))
}

