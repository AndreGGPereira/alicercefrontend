import React from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
//import { Button } from 'primereact/button'
import Teste from './teste.js'
import './styles.scss'
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';
import api from '../../services/api';
import Sidebar from '../../components/sidebar/'

export default class SignIn extends React.Component{
    constructor(){
        super();
        this.state = {
            login: '',
            nome: '',
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
            nome: this.state.nome,
            senha:  this.convertStringToByteArray(this.state.senha)
        });

        this.setState({  
            login: '',
            nome: '',
            senha: '',
         });

         this.messages.show({severity: 'success', summary: 'Item cadastrado com sucesso!' });

    };

    render(){
        
        
        return(
         
         
            <div className="p-grid">
            <Sidebar/>
            <main className="p-col-12 p-lg-9 page">
                <h1>Forms</h1>

                <Card>

                    <Messages ref={(el) => this.messages = el}></Messages>

                    <form onSubmit={ this.handleSubmit }>

                        <p>
                            <label htmlFor="in">Email</label><br />
                            <InputText 
                                onChange={ e => this.setState({login: e.target.value})} 
                                value={this.state.login} 
                            />
                        </p>

                        <p>
                            <label htmlFor="in">Senha</label><br />
                            <InputText 
                                onChange={ e => this.setState({nome: e.target.value})} 
                                value={this.state.nome} 
                            />
                        </p>

                        <p>
                            <label htmlFor="in">Senha Byte</label><br />
                            <InputText 
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

                        <Button label="Cadastrar" className="p-button-primary" />

                    </form>



                </Card>


            </main>
        </div>
        )
    }
}