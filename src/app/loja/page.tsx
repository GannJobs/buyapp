"use client"

import React, { useEffect } from "react"
import { api } from "../global"
import { useRouter } from 'next/navigation'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../(hooks)/api";
import toast from "react-hot-toast";
import { useState } from "react";
import styles from "./inicial.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Home() {
    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Função para obter o índice da URL
        const obterIndiceDaURL = () => {
            const parametros = new URLSearchParams(window.location.search);
            const indiceString = parametros.get('indice');
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

    const [Lojas, SetLojas] = useState(
        [{
            id: "",
            Nome: "",
            CEP: "",
            ContactNumber: "",
            Descricao: "",
            img: ""
        }]
    )

    const [user, setUser] = useState({
        first_name: ""
    })

    const [categoria, setCategoria] = useState([
        {
            id: "",
            nome: "",
            descricao: "",
            produtos: [
                {
                    id: "",
                    Nome: "",
                    Valor: "",
                    Marca: "",
                    img: "",
                },
            ],
        },
    ]);

    function goCat(lojaId: any) {
        router.push(`/loja/create/Categoria?LojaId=${lojaId}`)
    }

    function goProd(categoriaId: any) {
        router.push(`/loja/create/Produto?categoriaId=${categoriaId}`);
    }

    const renderCategoria = (categoria: any) => {
        return (
            <div key={categoria.nome} className={styles.categoria} style={{ width: '100%' }}>
                <h2>{categoria.nome}</h2>
                <p>Descrição: {categoria.descricao}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <button onClick={() => goProd(categoria.id)}>Adicionar produto</button>
                    <FaRegTrashAlt size={30} className={styles.exc} onClick={() => excluirC(categoria.id)} />
                </div>
                {categoria.produtos.map((produto: any) => (
                    <div className={styles.produto} key={produto.Nome}>
                        <Image
                            src={produto.img}
                            alt={`Imagem de ${produto.Nome}`}
                            width={100}
                            height={100}
                        />
                        <div>
                            <p>{produto.Nome}</p>
                            <p>Valor R${produto.Valor}</p>
                            <p>Marca: {produto.Marca}</p>
                        </div>
                        <FaRegTrashAlt size={30} className={styles.exc} onClick={() => excluirP(produto.id)} />
                    </div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        const fetchLoja = async () => {
            try {
                const response = await axios.get(api + 'loj/loja/', {
                    headers: config().headers,
                });

                if (response.data.status === 302) {
                    SetLojas([response.data.Loja]);
                }

            } catch (error) {
                console.error('Erro durante a autenticação:', error);
            }
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

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const response = await axios.get(api + 'cat/Catg/', {
                    headers: config().headers,
                });

                if (response.data.status === 200) {
                    setCategoria(response.data.Categorias);
                }
                console.log(response.data)

            } catch (error) {
                console.error('Erro durante a autenticação:', error);
            }
        };

        // Chama a função automaticamente ao montar o componente
        fetchCat();
    }, []);

    const excluirP = async (id: any) => {
        try {
            const response = await axios.delete(`${api}pd/prod/`, {
                headers: config().headers,
                params: { id: id },
            });

            if (response.data.status == 200) {
                window.location.reload();
            }

        } catch (error) {
            console.error('Erro durante a exclusão do produto:', error);
        }
    };

    const excluirC = async (id: any) => {
        try {
            const response = await axios.delete(`${api}cat/Catg/`, {
                headers: config().headers,
                params: { id: id },
            });

            if (response.data.status === 200) {
                window.location.reload();
            }

        } catch (error) {
            console.error('Erro durante a exclusão do produto:', error);
        }
    };

    return (
        <main>
            <div className={styles.mainContent}>
                <button className={styles.back} onClick={handleGoBack}>Voltar</button>
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
                            height={200} />
                        <div className={styles.dados}>
                            <h2>{Lojas[0].Nome}</h2>
                            <p>Contato: {Lojas[0].ContactNumber}</p>
                            <p>Local: {Lojas[0].CEP}</p>
                            <p>Descrição:</p>
                            <p>{Lojas[0].Descricao}</p>
                        </div>
                    </div>
                    <div className={styles.categoria}>
                        <div className={styles.categoria3}>
                            <h2>Categorias</h2>
                            <button onClick={() => goCat(currentIndex)}>Adicionar Categoria</button>
                        </div>
                        {Array.isArray(categoria) && categoria.map(renderCategoria)}
                    </div>
                </div>
            </div>
        </main>
    )
}