import React from 'react';
import { Menubar } from 'primereact/menubar';
import './styles.scss';

export default class Header extends React.Component{
    

    render(){
        return(
            <div className="p-grid header p-align-center">
                
                <div className="p-col-12 p-lg-2">
                    <h3>ALICERCE</h3>
                </div>

                <div className="p-col-12 p-lg-7">
                    <nav>
                        <ul>
                            <li><a href="/">Visual Geral</a> </li>
                            <li><a href="/">Empresas</a> </li>
                            <li><a href="/">Ordem de Serviços</a> </li>
                            <li><a href="/">Visual Geral</a> </li>
                            <li><a href="/">Visual Geral</a> </li>
                        </ul>
                    </nav>
                </div>

                <div className="p-col-12 p-lg-3">
                    <a href="/" alt="Teste">Configurações</a>
                    <a href="/" alt="Teste">Dioney Vítor</a>
                </div>
            </div>
        )
    }
}