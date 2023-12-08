"use client"

import React from "react"
import { api } from "../global"
import axios from "axios";
import { config } from "../(hooks)/api";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
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
        },
    ])

    const renderLojas = () => {
        if (!Array.isArray(Lojas)) {
            return <p>Erro: Lojas não é uma array.</p>;
        }

        return Lojas.map((loja: any, index: any) => (
            <Link href={`/loja?indice=${index+1}`} key={index}>
                <div className={styles.Loja}>
                    <Image
                        src={loja.img}
                        alt={`Imagem da Loja ${index + 1}`}
                        width={500}
                        height={300}
                    />
                    <div className={styles.dados}>
                        <h2>{loja.Nome}</h2>
                        <p>Contato: {loja.ContactNumber}</p>
                        <p>Local: {loja.CEP}</p>
                        <p>Descrição:</p>
                        <p>{loja.Descricao}</p>
                    </div>
                </div>
            </Link>
        ));
    };

    const [user, setUser] = useState({
        first_name: ""
    })

    useEffect(() => {
        const fetchLoja = async () => {
            try {
                const response = await axios.get(api + 'loj/loja/', {
                    headers: config().headers,
                });
                console.log(response.data)

                if (response.data.status === 302) {
                    SetLojas([response.data.Loja]);
                }

            } catch (error) {
                console.error('Erro durante a autenticação:', error);
            }
            console.log(Lojas)
        };

        // Chama a função automaticamente ao montar o componente
        fetchLoja();
    }, []);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await axios.get(api + 'usr/user/me/', {
                    headers: config().headers,
                });

                if (response.data.status === 302) {
                    setUser(response.data.Pessoa.Pessoa);
                }

            } catch (error) {
                console.error('Erro durante a autenticação:', error);
            }
        };

        // Chama a função automaticamente ao montar o componente
        fetchMe();
    }, []);

    return (
        <main>
            <div className={styles.mainContent}>
                <div className={styles.superior}>
                    <Link href='#'>
                        <h1>BuyApp</h1>
                    </Link>
                    <div>
                        <p>Bem Vindo, {user.first_name}</p>
                        <FaRegUserCircle size={30} />
                    </div>
                </div>
                <div className={styles.box}>
                    <h1>Suas Lojas</h1>
                    {renderLojas()}
                </div>
            </div>
        </main>
    )
}