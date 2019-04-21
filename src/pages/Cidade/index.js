import React from 'react'
import Sidebar from '../../components/sidebar/'
import {Card} from 'primereact/card';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Messages} from 'primereact/messages';
import {InputText } from 'primereact/inputtext'
import {Dropdown} from 'primereact/dropdown';

import api from '../../services/api'

export default class Cidade extends React.Component{
    state = {
        id           : '',
        nome         : '',
        descricao    : '',
        datacadastro : '',
        estado       : '',
        cidades: [],
        estados: []
        
    }

    handleSubmit = async (e) => {
    e.preventDefault();
        const cidade = await api.post('/cidade', {
          
            id:           parseInt(this.state.id),
            nome:         this.state.nome,
            descricao:    this.state.descricao,    
            datacadastro: this.state.datacadastro,
            estado:       this.state.estado,
                      
        });

        this.setState({  
            id           : '',
            nome         : '',
            descricao    : '',
            datacadastro : '',
            estado       : '',
            visible:      false,
        });
              if (cidade.status ==  200  ){
            this.messages.show({severity: 'success', summary: cidade.data});
        }else{
            this.messages.show({severity: 'error', summary: cidade.data});
        }
    };

    getAll = async (e) => {
       const cidade = await api.get('/cidade');
       this.setState({ cidades: cidade.data });
    }

    async componentDidMount(){

        const cidade = await api.get('/cidade', { headers: { 'Access-Control-Allow-Origin': '*', }});
        this.setState({cidades : cidade.data });

        const estado = await api.get('/estado',{ headers: { 'Access-Control-Allow-Origin': '*', }});
        this.setState({estados: estado.data });
        console.log(this.state.cidades)
    }

    onEstadoChange = async (e) => {
        this.setState({estado: e.value});
    } 
    
    handleDelete = async (e) => {

       const teste =e.data
       this.messages.show({severity: 'success', summary: 'Item removido com sucesso!' });
       this.setState({visible: false})
    }

    selecionar = async (e) => {

        const teste =e.data

        console.log(teste.estado)

        this.setState({  
        id           : teste.id,
        nome         : teste.nome,
        descricao    : teste.descricao,
        datacadastro : teste.datacadastro,
        estado       : teste.estado
      
        })
         this.setState({visible: true})
    }

    
    render(){
               
        return(
            <div className="p-grid">
                <Sidebar/>
                <main className="p-col-12 p-lg-9 page">

                
                    
                    <Dialog header="Formulário" visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({visible: false})}>
                                
                    <Card  subTitle="Cidades">

                        <Messages ref={(el) => this.messages = el}></Messages>

                       {/*<form onSubmit={ this.handleSubmit }*/}

                         <form onSubmit={ this.handleSubmit }>
                            <p>
                                <label htmlFor="in">Nome</label><br />
                                <InputText 
                                    onChange={ e => this.setState({nome: e.target.value})} 
                                    value={this.state.nome}  />
                            </p>

                            <p>
                                <label htmlFor="in">Descrição</label><br />
                                <InputText 
                                    onChange={ e => this.setState({descricao: e.target.value})} 
                                    value={this.state.descricao}  />
                            </p>

                            <p>
                            
                                <Dropdown  style={{width:'200px'}}   value={this.state.id} options={this.state.estados} onChange={this.onEstadoChange}  placeholder="Selecione o estado" optionLabel="nome"/>
                                <div style={{marginTop: '.5em'}}>{this.state.estado.id ? 'Estado Selecionado: ' + this.state.estado.nome : 'Selecione o estado '}</div>
                            </p>

                            <Button label="Cadastrar"  onClick={this.handleSubmit}  icon="pi pi-check" className="p-button-primary" />
                            <Button label="Remover" onClick={this.handleDelete}  icon="pi pi-times" className="p-button-primary" />
                        </form>
                    </Card>
                 
                    </Dialog>
                    <Card   subTitle="Lista de Cidades">
                    <Messages ref={(el) => this.messages = el}></Messages>

                        <DataTable selectionMode="single" onSelectionChange={e => this.setState({selectedCar: e.value})} 
                        selection={this.state.id} value={this.state.cidades}   onRowSelect={this.selecionar} paginator={true} rows={10}>
                         
                            <Column field="id" header="Id" sortable={true}  />
                            <Column field="nome" header="Nome" sortable={true} />
                            <Column field="descricao" header="Descrição" sortable={true} />
                            <Column field="estado.nome" header="Estado" sortable={true} />
                            <Column field="datacadastro" header="Data Cadastro" sortable={true} />
                          </DataTable>

                    </Card>

                    <Button label="Show" style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={(e) => this.setState({visible: true})} />
                </main>
            </div>
        )
    }
}