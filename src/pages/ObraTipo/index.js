import React from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
//import { Button } from 'primereact/button'
import './styles.scss'
import '../../layout/layout.css';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';
import api from '../../services/api';
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import {Calendar} from 'primereact/calendar';
import {Checkbox} from 'primereact/checkbox';
import {InputMask} from 'primereact/inputmask';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';


export default class ObraTipo extends React.Component{
    state = {
    id            : '',
	nome          : '',
    datacadastro  : '',
    descricao  : '',
	obrastipo       : []
         
        }

    handleSubmit = async (e) => {
        e.preventDefault();

        const obratipo = await api.post('/obratipo', {
           
            id:           parseInt(this.state.id),
            nome:         this.state.nome,
            datacadastro: this.state.datacadastro,
            descricao:    this.state.descricao,
    
        });

        this.setState({  
            id           : '',
            nome         : '',
            datacadastro : '',
            descricao    : '',
            
        });
        
        if (obratipo.status == 200  ){
            this.messages.show({severity: 'success', summary: obratipo.data});
        }else{
            this.messages.show({severity: 'error', summary: obratipo.data});
        }
        
        this.getAll()
    };

    getAll = async (e) => {
        const obratipo = await api.get('/obratipo');
        this.setState({ obrastipo: obratipo.data });
     }

    convertBool(string){
        var x = new Boolean();
        if (string == "false"){
            console.log(x)
            return x = false
        }else{
            console.log(x)
            return x = true
        }
    }


    async componentDidMount(){

        const obratipo = await api.get('/obratipo');
        this.setState({obrastipo : obratipo.data });
    }

    selecionar = async (e) => {

        const teste =e.data
            this.setState({  
            id:           teste.id,
            nome:         teste.nome,
            datacadastro: teste.datacadastro,
            descricao:    teste.descricao,
        })
         this.setState({visible: true})
    }

    render(){
                
        return(
     
        <div className="p-grid">
            <Sidebar/>

             <main className="p-col-12 p-lg-9 page">
    
                <Card   subTitle="Lista de Obras Tipo">
                    <Messages ref={(el) => this.messages = el}></Messages>

                        <DataTable selectionMode="single" onSelectionChange={e => this.setState({selectedCar: e.value})} 
                        selection={this.state.id} value={this.state.obrastipo}   onRowSelect={this.selecionar} paginator={true} rows={10}>
                         
                            <Column field="id" header="Id" sortable={true}  />
                            <Column field="nome" header="Nome" sortable={true} />
                            <Column field="datacadastro" header="Data Cadastro" sortable={true} />
                            <Column field="descricao" header="Descrição" sortable={true} />
                          </DataTable>

                </Card>
                    <Button label="Show" style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={(e) => this.setState({visible: true})} />
            </main>


            <Dialog header="Cadastro de Obra Tipo" visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({visible: false})}>

      <form onSubmit={ this.handleSubmit }>

    <p>
        <label htmlFor="Nome">Nome :  </label>
            <InputText 
                onChange={ e => this.setState({nome: e.target.value})} 
                value={this.state.nome}/>
   
        <label htmlFor="Descrição">Descrição :  </label>
        <InputText 
                onChange={ e => this.setState({descricao: e.target.value})} 
                value={this.state.descricao}/>

    </p>
    
   

    <p>


                    <Button label="Cadastro" className="p-button-primary" />

    </p>
    </form>
    </Dialog>




        </div>
        )
    }
}