"use client"

import React, { useEffect } from "react"
import { api } from "../../../global"
import { config } from "@/app/(hooks)/api";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import styles from "./inicial.module.css"
import { BsFileText } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
    const router = useRouter();

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Função para obter o índice da URL
        const obterIndiceDaURL = () => {
            const parametros = new URLSearchParams(window.location.search);
            const indiceString = parametros.get('categoriaId');
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
    

    // Função para criar um novo produto
    const criarProduto = async (event: React.FormEvent) => {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        try {
            const response = await axios.post(`${api}pd/prod/`, {
                nome: nome,
                valor: valor,
                img: img,
                marca: marca,
                Catid: currentIndex,
            }, {
                headers: config().headers,
            });

            if (response.data.status === 200) {
                toast.success('Produto criado com sucesso!');
            } else {
                console.error('Erro ao criar o produto:', response.data.msg);
            }
        } catch (error) {
            console.error('Erro durante a requisição para criar o produto:', error);
        }
    };

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [img, setImg] = useState('https://drive.google.com/uc?id=');
    const [valor, setValor] = useState('');

    const handleNomeChange = (event: any) => {
        setNome(event.target.value);
    };

    const handleValorChange = (event: any) => {
        setValor(event.target.value);
    };

    const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Obtém o valor atual do estado
        const currentValue = img;
    
        // Obtém o novo valor do input
        const newValue = event.target.value;
    
        // Concatena os valores e define no estado
        setImg(currentValue + newValue);
    };

    const handleMarcaChange = (event: any) => {
        setMarca(event.target.value);
    };



    const handleGoBack = () => {
        router.back()
    };

    return (
        <main>
            <div className={styles.mainContent}>
                <button className={styles.back} onClick={handleGoBack}>Voltar</button>
                <div className={styles.form}>
                    <form onSubmit={criarProduto}>
                        <label>
                            Nome:
                            <input type="text" value={nome} onChange={handleNomeChange} />
                        </label>

                        <label>
                            Marca:
                            <input type="text" value={marca} onChange={handleMarcaChange} />
                        </label>

                        <label>
                            Valor:
                            <input type="text" value={valor} onChange={handleValorChange} placeholder="0,00"/>
                        </label>
                        <label>
                            Imagem:
                            <input type="text" value={img} onChange={handleImgChange} placeholder="Código do Produto do drive"/>
                        </label>

                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </main>
    )
}