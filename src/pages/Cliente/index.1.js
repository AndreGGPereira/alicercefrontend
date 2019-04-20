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
import {Calendar} from 'primereact/calendar';
import {Checkbox} from 'primereact/checkbox';
import {InputMask} from 'primereact/inputmask';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';

export default class Cliente extends React.Component{
    constructor(){
        super();
        this.state = {
    ID           : '',
	Nome         : '',
	DataCadastro : '',
	Estado       : '',
	Cidade       : '',
	Rua          : '',
	Numero       : '',
	Cep          : '',
	Complemento  : '',
	Email        : '',
	Telefone     : '',
	TelefoneSecu : '',
	CPF          : '',
	CNPJ         : '',
	PessoaFisica : '',
	ObsPessoa    : ''
         
        }
    }
    //convertendo senha string para byte
           
    handleSubmit = async (e) => {
        e.preventDefault();

        const usuario = await api.post('/Cliente', {
           
            ID:           this.state.ID,
            Nome:         this.state.Nome,
            DataCadastro: this.state.DataCadastro,
            Estado:       this.state.Estado,
            Cidade:       this.state.Cidade,
            Rua:          this.state.Rua,
            Numero:       this.state.Numero,
            Cep:          this.state.Cep,
            Complemento:  this.state.Complemento,
            Email:        this.state.Email,
            Telefone:     this.state.Telefone,
            TelefoneSecu: this.state.TelefoneSecu,
            CPF:          this.state.CPF,
            CNPJ:         this.state.CNPJ,
            PessoaFisica: this.state.PessoaFisica,
            ObsPessoa:    this.state.ObsPessoa
        });

        this.setState({  
            ID           : '',
            Nome         : '',
            DataCadastro : '',
            Estado       : '',
            Cidade       : '',
            Rua          : '',
            Numero       : '',
            Cep          : '',
            Complemento  : '',
            Email        : '',
            Telefone     : '',
            TelefoneSecu : '',
            CPF          : '',
            CNPJ         : '',
            PessoaFisica : '',
            ObsPessoa    : '',
        });

         this.messages.show({severity: 'success', summary: 'Item cadastrado com sucesso!' });
    };

    render(){

        const cars = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];

        
        return(
     
        <div className="p-grid">
            <Sidebar/>

            <div className="p-grid"> </div>

            <main className="p-col-12 p-lg-9 page">
    
        <h1>Cadastro Cliente</h1>
          
            <Card>
            <Messages ref={(el) => this.messages = el}></Messages>

                <form onSubmit={ this.handleSubmit }>

                    <p>
                        <label htmlFor="Nome">Nome</label><br />
                            <InputText 
                                onChange={ e => this.setState({Nome: e.target.value})} 
                                value={this.state.Nome}/>
                     </p>
                     <p>
                        <label htmlFor="DataCadastro">Data Cadastro</label><br />
                        <Calendar 
                            onChange={ e => this.setState({DataCadastro: e.target.value})} 
                            value={this.state.DataCadastro}/>     
                    </p>

                    <p>
                        <label htmlFor="Estado">Estado</label><br />
                            <InputText 
                                onChange={ e => this.setState({Estado: e.target.value})} 
                                value={this.state.Estado}/>
                    </p>
                    <p>
                        <label htmlFor="Cidade">Cidade</label><br />
                            <InputText 
                                onChange={ e => this.setState({Cidade: e.target.value})} 
                                value={this.state.Cidade}/>        
                    </p>

                    <p>
                        <label htmlFor="Rua">Rua</label><br />
                            <InputText 
                                onChange={ e => this.setState({Rua: e.target.value})} 
                                value={this.state.Rua}/>
                     </p>
                     <p>
                        <label htmlFor="Número">Numero</label><br />
                            <InputText 
                                onChange={ e => this.setState({Numero: e.target.value})} 
                                value={this.state.Numero}/>        
                    </p>

                    <p>
                
                        <label htmlFor="Cep">Cep</label><br />
                        <InputMask mask="99-999999"
                                onChange={ e => this.setState({Cep: e.target.value})} 
                                value={this.state.Cep}/>

                    </p>
                     <p>

                        <label htmlFor="in">Complemento</label><br />
                            <InputText 
                                onChange={ e => this.setState({Complemento: e.target.value})} 
                                value={this.state.Complemento}/>        
                    </p>

                    <p>
                        <label htmlFor="in">Email</label><br />
                            <InputText 
                                onChange={ e => this.setState({Email: e.target.value})} 
                                value={this.state.Email}/>
                     </p>
                     <p>
                        <label htmlFor="in">Telefone</label><br />
                        
                         <InputMask mask="(999) 999-9999"  placeholder="(999) 999-9999"
                                onChange={ e => this.setState({Telefone: e.target.value})} 
                                value={this.state.Telefone}/>        
                    </p>

                    <p>
                        <label htmlFor="in">TelefoneSecu</label><br />
                        <InputMask mask="(999) 999-9999"  placeholder="(999) 999-9999"
                                onChange={ e => this.setState({TelefoneSecu: e.target.value})} 
                                value={this.state.TelefoneSecu}/>
                    </p>
                    <p>
                        <label htmlFor="in">CPF</label><br />
                        <InputMask mask="999.999.999-99"  placeholder="999.999.999-99"
                                onChange={ e => this.setState({CPF: e.target.value})} 
                                value={this.state.CPF}/>        
                    </p>

                    <p>
                        <label htmlFor="in">CNPJ</label><br />
                        <InputMask mask="99.999.999/9999-99"  placeholder="99.999.999/9999-99"
                                onChange={ e => this.setState({CNPJ: e.target.value})} 
                                value={this.state.CNPJ}/>
                    </p>
                    <p>
                        <label htmlFor="in">PessoaFisica</label><br />
                        <Checkbox onChange={e => this.setState({PessoaFisica: e.target.value})} checked={this.state.PessoaFisica}></Checkbox>
                    </p>
                    <p>
                        <label htmlFor="in">ObsPessoa</label><br />
                            <InputText 
                                onChange={ e => this.setState({ObsPessoa: e.target.value})} 
                                value={this.state.ObsPessoa}/>                
                    </p>
                    <p>

                    <Dialog header="Godfather I" visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({visible: false})}>
                    The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
    His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
    Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
    kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
                    <Card>

                        <Messages ref={(el) => this.messages = el}></Messages>

                        <form onSubmit={ this.handleSubmit }>

                            <p>
                                <label htmlFor="in">Title</label><br />
                                <InputText 
                                    onChange={ e => this.setState({title: e.target.value})} 
                                    value={this.state.title} 
                                />
                            </p>

                            <p>
                                <label htmlFor="in">Content</label><br />
                                <InputText 
                                    onChange={ e => this.setState({content: e.target.value})} 
                                    value={this.state.content} 
                                />
                            </p>
                            <Button label="Cadastrar" className="p-button-primary" />
                        </form>
                    </Card>

</Dialog>

<Button label="Show" icon="pi pi-info-circle" onClick={(e) => this.setState({visible: true})} />
                        <Button label="Login" className="p-button-primary" />

                    </p>
                       
                        <Button label="Login" className="p-button-primary" />
                    </form>
                </Card>
            </main>
        </div>
        )
    }
}