import React, {useEffect, useState} from 'react'

import Table from 'react-bootstrap/Table'
import { Link, useNavigate } from 'react-router-dom'

import './Style.css'
import api from '../api.js'

import axios from 'axios'

function Tabela() {
    const [denuncia, setDenuncia] = useState([]);
    const [enderecos, setEnderecos] = useState([]);
  
    let navigate = useNavigate();
  
    useEffect(() => {
      async function getDenuncia() {
        const { data } = await api.get('/resolutor');
        setDenuncia(data);
  
        if (data.length > 0) {
          const enderecoPromises = data.map((item) => {
            const latitude = item.latitude;
            const longitude = item.longitude;
  
            const config = {
              method: 'get',
              url: `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=ef172e5aac494f98ad94e03ba0d41fb8`,
              headers: {},
            };
  
            return axios(config)
              .then(function (response) {
                const endereco = response.data.features[0].properties.formatted;
                return endereco;
              })
              .catch(function (error) {
                console.log('Erro:', error);
                return null;
              });
          });
  
          Promise.all(enderecoPromises).then((resultados) => {
            setEnderecos(resultados);
          });
        }
      }
  
      getDenuncia();
    }, []);
  
  
    return (
      <>
        <Table striped bordered hover className="tabela">
          <thead>
            <tr>
              <th>ID denuncia</th>
              <th>Tipo de problema</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {denuncia.map((item, index) => (
              <tr key={item.id_denuncia}>
                <td>{item.id_denuncia}</td>
                <td>{item.tipo_problema}</td>
                <td>{enderecos[index]}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`/forms/${item.id_denuncia}`);
                    }}
                    className="btn modal-trigger btn-editar"
                  >
                    Resolver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
  
export default Tabela;
  