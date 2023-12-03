"use client"

import React, { useEffect } from "react"
import { api } from "../global"
import axios from "axios";
import { config } from "../(hooks)/api";
import toast from "react-hot-toast";
import { useState } from "react";
import styles from "./inicial.module.css"
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

    const [Lojas, SetLojas] = useState([
        {
            Nome: "",
            CEP: "",
            ContactNumber: "",
            Descricao: "",
            img: ""
        }
    ])

    const [user, setUser] = useState({
        first_name: ""
    })

    const [categoria, setCategoria] = useState(
        [
            {
                Nome: "",
                Descricao: "",
                produto: [{
                    Nome: "",
                    Valor: "",
                    Marca: "",
                    img: ""
                },]
            }
        ]
    )

    const loja = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.get(api + 'Loja/',
                {
                    headers: config().headers
                })

            if (response.data.status === 302) {
                SetLojas(response.data);
            }

        } catch (error) {
            console.error('Erro durante a autenticação:', error);
            toast.error("Erro no Servidor");
        }
    }

    loja

    const usr = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.get(api + 'User/me/',
                {
                    headers: config().headers
                })

            if (response.data.status === 302) {
                setUser(response.data);
            }

        } catch (error) {
            console.error('Erro durante a autenticação:', error);
            toast.error("Erro no Servidor");
        }
    }

    usr

    const Cat = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.get(api + 'Cat/',
                {
                    headers: config().headers
                })

            if (response.data.status === 302) {
                setCategoria(response.data);
            }

        } catch (error) {
            console.error('Erro durante a autenticação:', error);
            toast.error("Erro no Servidor");
        }
    }

    Cat

    const renderCategoria = (categoria: any) => {
        return (
          <div key={categoria.Nome} className={styles.categoria}>
            <h3>{categoria.Nome}</h3>
            <button>Adicionar produto</button>
            {categoria.produto.map((produto: any) => (
              <div key={produto.Nome} className={styles.produto}>
                <Image
                  src={produto.img}
                  alt={`Imagem de ${produto.Nome}`}
                  width={100}
                  height={50}
                />
                <p>{produto.Nome}</p>
                <p>Valor: {produto.Valor}</p>
                <p>Marca: {produto.Marca}</p>
              </div>
            ))}
          </div>
        );
      };

    return (
        <main>
            <div className={styles.mainContent}>
                <div className={styles.superior}>
                    <Link href='/inicial'>
                        <h1>BuyApp</h1>
                    </Link>
                    <div>
                        <p>Bem Vindo, {user.first_name}</p>
                        <FaRegUserCircle size={30} />
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.Loja}>
                        <Image
                            src={Lojas[0].img}
                            alt='Imagem da Loja'
                            width={400}
                            height={100} />
                        <div className={styles.dados}>
                            <h2>{Lojas[0].Nome}NOME</h2>
                            <p>Contato: {Lojas[0].ContactNumber}</p>
                            <p>Local: {Lojas[0].CEP}</p>
                            <p>Descrição:</p>
                            <p>{Lojas[0].Descricao}</p>
                        </div>
                    </div>
                    <div className={styles.categoria}>
                        <div className={styles.categoria3}>
                            <h2>Categorias</h2>
                            <button>Adicionar Categoria</button>
                        </div>
                        {categoria.map(renderCategoria)}
                    </div>
                </div>
            </div>
        </main>
    )
}