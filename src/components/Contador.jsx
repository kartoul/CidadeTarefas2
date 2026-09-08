import { useState } from "react"

const Contador = () => {

    //Hook- useState - Manipula o estado da variavel
    const [contador,setContador]=useState(0);

  return (
    <>
      <h2>Contagem Inicial:{contador}</h2>
      <button onClick={()=>setContador(contador +1)}>Aumentar</button>
      <button>Diminuir</button>
    </>
  )
}

export default Contador
