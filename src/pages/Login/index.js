import React from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
//import { Button } from 'primereact/button'
import Teste from './teste.js'
import './styles.scss'
import '../../layout/layout.css';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';
import api from '../../services/api';
import Header from '../../components/header/'
import Sidebar from '../../components/sidebar/'
import {Password} from 'primereact/password';




export default class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            login: '',
            senha: ''
        }
    }
    //convertendo senha string para byte
    convertStringToByteArray(str){
        String.prototype.encodeHex = function () {
        var bytes = [];
        for (var i = 0; i < this.length; ++i) {
         bytes.push(this.charCodeAt(i));
        }
        return bytes;
        };
        var byteArray = str.encodeHex();
        return byteArray
        }
           
    handleSubmit = async (e) => {
        e.preventDefault();

        const usuario = await api.post('/UsuarioLogin', {
            login: this.state.login,
            senha:  this.convertStringToByteArray(this.state.senha)
        });

        this.setState({  
            login: '',
            senha: '',
         });

         this.messages.show({severity: 'success', summary: 'Item cadastrado com sucesso!' });
    };

    render(){
        
        return(
     
            <div className="p-grid">
            <Sidebar/>

            <div className="p-grid"> </div>
            <main className="p-col-12 p-lg-9 page">
            <h1>Forms</h1>
                <Card>
                <Messages ref={(el) => this.messages = el}></Messages>

                    <form onSubmit={ this.handleSubmit }>

                        <p>
                        <span className="p-float-label">
                                <InputText id="email" type="text"
                                onChange={ e => this.setState({login: e.target.value})} 
                                value={this.state.login} />
                                 <label htmlFor="email">Email</label>
                                 </span>
                        </p>

                        <p>
                            <label htmlFor="in">Senha </label><br />
                            <Password
                                onChange={ e => this.setState({senha: e.target.value})} 
                                value={this.state.senha} 
                            />
                        </p>

                        {/* <span className="p-float-label">
                            <InputText 
                                onChange={ e => this.setState({title: e.target.value})} 
                                value={this.state.title} 
                            />
                            <label htmlFor="in">Title</label>
                        </span>

                        <span className="p-float-label">
                            <InputText 
                                onChange={ e => this.setState({content: e.target.value})} 
                                value={this.state.content} 
                            />
                            <label htmlFor="in">Content</label>
                        </span> */}


                    </form>
                </Card>
            </main>
        </div>
        )
    }
}