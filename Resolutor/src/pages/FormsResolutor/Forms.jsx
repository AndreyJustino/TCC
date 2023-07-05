import React, { useEffect, useState } from 'react';
import './Style.css';

import img from '../img/118859538.png'

import api from '../api.js'

import { useParams } from 'react-router-dom';

import {storage} from '../../Firebase/firebase.ts'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Forms() {
  const { id1 } = useParams();

  const [id, setID] = useState(id1)

  const [imgURL, setImgURL] = useState("");
  const [progressPorcent, setPorgessPorcent] = useState(0);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if(count >= 100){
      console.log('foi')
      enviarForm()
      
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `Images/${Date.now()}/${Math.random().toString()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPorgessPorcent(progress);
        setCount(progress)
        
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
          
        });
      }
    );

  };


  
  async function enviarForm(){ // função que envia o ID quando clica no botão 'envia'
    // event.preventDefault()
    try{

      const data = {
        id,imgURL
      };
      
      const response = await api.put('/resolutor', data)

      alert('Formulario enviado')

    }catch(error){
      console.log(`Erro no forms >>> ${error}`)
      alert(`Erro no forms >>> ${error}`)
    }
  }


  return (
    <section className="card" id="card">
      <img src={img} alt="Logo" />

      <h1>Formulario de resolução</h1>

      <h2>ID de denuncia</h2>
      <input 
      className="idInput" 
      type="number"
      value={id}
      onChange={e => setID(e.target.value)} 
      />

      <h2>Imagem do problema solucionado</h2>

      {!imgURL && <p>{progressPorcent}%</p>}
      {imgURL && <img src={imgURL} alt="Imagem" height={200} />}

      <form onSubmit={handleSubmit}>
          <input type="file" />
          <br/>
          <button className='myButton'>Enviar</button>
      </form>


    </section>
  );
}

export default Forms;