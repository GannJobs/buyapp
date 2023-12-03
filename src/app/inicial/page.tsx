"use client"

import React from "react"
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

    const [user, setUsera] = useState({
        first_name: ""
    })

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
                    <Link href="/loja">
                        <div className={styles.Loja}>
                            <Image
                                src={Lojas[0].img}
                                alt='Imagem da Loja'
                                width={500}
                                height={300} />
                            <div className={styles.dados}>
                                <h2>{Lojas[0].Nome}NOME</h2>
                                <p>Contato: {Lojas[0].ContactNumber}</p>
                                <p>Local: {Lojas[0].CEP}</p>
                                <p>Descrição:</p>
                                <p>{Lojas[0].Descricao}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    )
}