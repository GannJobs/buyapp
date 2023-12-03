"use client"

import React, { useEffect } from "react"
import { api } from "../../../global"

import { useState } from "react";
import styles from "./inicial.module.css"
import { BsFileText } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

    // useEffect(() => {
    //     apiGET(api+"ente/Resumo/")
    //         .then((res) => {

    //         })
    //         .catch((error) => {
    //             console.error("Erro na chamada à API:", error);
    //         });
    // }, []);

    // useEffect(() => {
    //     apiGET(api+"ente/Lista_Precatorios/")
    //         .then((res) => {
    //         })
    //         .catch((error) => {
    //             console.error("Erro na chamada à API:", error);
    //         });
    // }, []);

    return (
        <main>
            <div className={styles.mainContent}>
                <div className="box">
                    <h1>Categoria</h1>
                    <p>Nome</p>
                    <p>Descrição</p>
                </div>
            </div>
        </main>
    )
}