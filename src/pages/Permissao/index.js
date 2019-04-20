import React from 'react'
import Sidebar from '../../components/sidebar'

import {Card} from 'primereact/card';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Messages} from 'primereact/messages';
import {InputText } from 'primereact/inputtext'

import api from '../../services/api'

export default class Permissao extends React.Component{
    state = {
        id           : '',
        nome         : '',
        descricao    : '',
        dataCadastro : '',
        data: []
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const permissao = await api.post('/permissao', {
           
            id:          parseInt(this.state.id),
            nome:         this.state.nome,
            descricao:    this.state.descricao,    
            dataCadastro: this.state.datacadastro
           
        });

        this.setState({  
            id           : '',
            nome         : '',
            descricao    : '',
            dataCadastro : '',
        });

       
        if (permissao.statusText == "ok"  ){
            this.messages.show({severity: 'success', summary: permissao.data});
        }else{
            this.messages.show({severity: 'error', summary: permissao.data});
        }        

        this.getAll()
    };

    findSelectedCarIndex() {
        return this.state.permissao.indexOf(this.state.selectedCar);
    }

    getAll = async (e) => {
       const permissao = await api.get('/permissao');
       console.log(permissao);
       this.setState({ data: permissao.data });
    }

    async componentDidMount(){
        const permissao = await api.get('/permissao');
        this.setState({ data: permissao.data });
    }
   
    handleDelete = async (e) => {
      
        console.log(e)
        const teste =e.data
        console.log(teste)
            
        //const estado = await api.delete('/estado/' + parseInt(teste.id) );
        this.messages.show({severity: 'success', summary: 'Item removido com sucesso!' });
       // this.getAll()
       this.setState({visible: false})
    }

    selecionar = async (e) => {

        const teste =e.data
        this.setState({  
        id           : teste.id,
        nome         : teste.nome,
        descricao    : teste.descricao,
        datacadastro : teste.datacadastro 
        })

        console.log(teste.descricao)
        console.log(teste)
        
    
  //  const teste =e.data
  //  this.state.ID           = teste.id
  //  this.state.Nome         = teste.nome
   // this.state.DataCadastro = teste.datacadastro

    this.setState({visible: true})
    }

    render(){
        return(
            <div className="p-grid">
                <Sidebar/>
                <main className="p-col-12 p-lg-9 page">

                    <div className="p-grid p-align-center p-justify-end">

                        <div className="p-col-12 p-lg-8">
                            <h1>List Permissões</h1>
                        </div>

                    </div>
                    
                    <Dialog header="Permissões" visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({visible: false})}>
                                Cadastro de Permissões
                    <Card>

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

                            <Button label="Cadastrar"  icon="pi pi-check" className="p-button-primary" />
                            <Button label="Remover" onClick={this.handleDelete}  icon="pi pi-times" className="p-button-primary" />
                        </form>
                    </Card>
                    </Dialog>

                    <Card>
                    <Messages ref={(el) => this.messages = el}></Messages>

                        <DataTable selectionMode="single" onSelectionChange={e => this.setState({selecionar: e.value})} 
                        selection={this.state.ID} value={this.state.data}   onRowSelect={this.selecionar} paginator={true} rows={10}>
                         
                            <Column field="id" header="Id" sortable={true}  />
                            <Column field="nome" header="Nome" sortable={true} />
                            <Column field="descricao" header="Descrição" sortable={true} />
                            <Column field="datacadastro" header="Data Cadastro" sortable={true} />
                            
                        </DataTable>
                     </Card>

                  
                    <Button label="Show" style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={(e) => this.setState({visible: true})} />
                </main>
            </div>
        )
    }
}