"use client"

import React, { useEffect } from "react"
import { api } from "../../../global"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import styles from "./inicial.module.css"
import { BsFileText } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { config } from "@/app/(hooks)/api";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back()
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Função para obter o índice da URL
        const obterIndiceDaURL = () => {
            const parametros = new URLSearchParams(window.location.search);
            const indiceString = parametros.get('LojaId');
            return indiceString !== null ? parseInt(indiceString) || 0 : 0;
        }
    
        // Atualizar o estado e obter o valor atualizado imediatamente
        const novoIndice = obterIndiceDaURL();
        setCurrentIndex((prevIndex) => {
            // Lógica adicional com o valor atualizado
            console.log("Índice da URL atualizado:", novoIndice);
            return novoIndice;
        });
    }, []);

    const [nome, setNome] = useState('');
    const [desc, setDesc] = useState('');

    const handleNomeChange = (event: any) => {
        setNome(event.target.value);
    };

    const handleDescChange = (event: any) => {
        setDesc(event.target.value);
    };

    const criarCategoria = async (event: React.FormEvent) => {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        try {
            const response = await axios.post(`${api}cat/Catg/`, {
                nome: nome,
                descricao: desc,
                lojaId: currentIndex,
            }, {
                headers: config().headers,
            });

            if (response.data.status === 200) {
                toast.success('Categoria criada com sucesso!');
            } else {
                console.error('Erro ao criar a categoria:', response.data.msg);
            }
        } catch (error) {
            console.error('Erro durante a requisição para criar a categoria:', error);
        }
    };

    return (
        <main>
            <div className={styles.mainContent}>
                <button className={styles.back} onClick={handleGoBack}>Voltar</button>
                <div className={styles.form}>
                    <form onSubmit={criarCategoria}>
                        <label>
                            Nome:
                            <input type="text" value={nome} onChange={handleNomeChange} />
                        </label>

                        <label>
                            Descrição:
                            <input type="text" value={desc} onChange={handleDescChange} />
                        </label>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </main>
    )
}