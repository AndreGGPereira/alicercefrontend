import React from 'react'
import Sidebar from '../../components/sidebar/'

import {Card} from 'primereact/card';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Messages} from 'primereact/messages';
import {InputText } from 'primereact/inputtext'

import api from '../../services/api'

export default class Estado extends React.Component{
    state = {
        ID           : '',
        Nome         : '',
        DataCadastro : '',
        data: []
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const estado = await api.post('/estado', {
           
            ID:          parseInt(this.state.ID),
            Nome:         this.state.Nome,
            DataCadastro: this.state.DataCadastro
           
        });
        console.log(estado.status)

        console.log(estado.statusText)

        this.setState({  
            ID           : '',
            Nome         : '',
            DataCadastro : '',
           
        });

        if (estado.status == 200  ){
            this.messages.show({severity: 'success', summary: estado.data});
        }else{
            this.messages.show({severity: 'error', summary: estado.data});
        }
        
        this.getAll()
    };

    findSelectedCarIndex() {
        return this.state.estado.indexOf(this.state.selectedCar);
    }

    getAll = async (e) => {
       const estado = await api.get('/estado');
       console.log(estado);
       this.setState({ data: estado.data });
    }

    async componentDidMount(){
        const estado = await api.get('/estado');
        console.log(estado);
       this.setState({ data: estado.data });
      
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
        ID           : teste.id,
        Nome         : teste.nome,
        DataCadastro : teste.datacadastro
        })
        
    
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
                            <h1>List</h1>
                        </div>

                    </div>
                    
                    <Dialog header="Estados" visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({visible: false})}>
                                Cadastro de Estado
                    <Card>

                        <Messages ref={(el) => this.messages = el}></Messages>

                       {/*<form onSubmit={ this.handleSubmit }*/}

                         <form onSubmit={ this.handleSubmit }>
                            <p>
                                <label htmlFor="in">Nome</label><br />
                                 
                                <InputText 
                                    onChange={ e => this.setState({Nome: e.target.value})} 
                                    value={this.state.Nome} 
                                />
                            </p>

                            <Button label="Cadastrar"  onClick={this.handleSubmit}  icon="pi pi-check" className="p-button-primary" />
                            <Button label="Remover" onClick={this.handleDelete}  icon="pi pi-times" className="p-button-primary" />
                        </form>
                    </Card>
                    </Dialog>

                    <Card>
                    <Messages ref={(el) => this.messages = el}></Messages>

                        <DataTable selectionMode="single" onSelectionChange={e => this.setState({selectedCar: e.value})} 
                        selection={this.state.ID} value={this.state.data}   onRowSelect={this.selecionar} paginator={true} rows={10}>
                         
                            <Column field="id" header="Id" sortable={true}  />
                            <Column field="nome" header="Nome" sortable={true} />
                            <Column field="datacadastro" header="Data Cadastro" sortable={true} />
                         
                        </DataTable>
                     </Card>

                  
                    <Button label="Show" style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={(e) => this.setState({visible: true})} />
                </main>
            </div>
        )
    }
}