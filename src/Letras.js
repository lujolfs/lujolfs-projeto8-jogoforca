

export default function botaoLetras {

    (
        <button
            disabled={botaoLetraDesliga}
            type="button"
            onClick={() => compararLetra(a)}
            key={a}>
            {a}
        </button>
    )
}