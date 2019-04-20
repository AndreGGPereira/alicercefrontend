import React from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
//import { Button } from 'primereact/button'
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
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';


export default class Obra extends React.Component{
    state = {
    id            : '',
	nome          : '',
	datacadastro  : '',
	descricao     : '',
	cliente       : '',
	valorobra     : '',
	status        : '',
	datainicio    : '',
	datafim       : '',
	obratipo      : '',
	estado        : '',
	cidade        : '',
	rua           : '',
	numero        : '',
	cep           : '',
    complemento   : '',
    dataconcluido : '',
    concluido     : '',
    data          : [],
    clientes      : [],
    obratipos     : [],
    estado        : [],
    cidade        : [],
    obras         : [],
         
    }
           
    handleSubmit = async (e) => {
        e.preventDefault();

        const obra = await api.post('/obra', {
            
    id            : parseInt(this.state.id),
	nome          : this.state.nome,
	datacadastro  : this.state.datacadastro,
	descricao     : this.state.descricao,
	cliente       : this.state.cliente,
	valorobra     : parseFloat(this.state.valorobra),
	status        : this.state.status,
	datainicio    : this.state.datainicio,
	datafim       : this.state.datafim,
	obratipo      : this.state.obratipo,
	estado        : this.state.estado,
	cidade        : this.state.cidade,
	rua           : this.state.rua,
	numero        : parseInt(this.state.numero),
	cep           : this.state.cep,
    complemento   : this.state.complemento,
    dataconcluido : this.state.dataconcluido,
    concluido     : this.convertBool(this.state.concluido),

    });

        this.setState({  
            id            : '',
            nome          : '',
            datacadastro  : '',
            descricao     : '',
            cliente       : '',
            valorobra     : '',
            status        : '',
            datainicio    : '',
            datafim       : '',
            obratipo      : '',
            estado        : '',
            cidade        : '',
            rua           : '',
            numero        : '',
            cep           : '',
            complemento   : '',
            dataconcluido : '',
            concluido     : '',
            visible : false,
        });

        if (obra.status ==  200  ){
            this.messages.show({severity: 'success', summary: obra.data});
        }else{
            this.messages.show({severity: 'error', summary: obra.data});
        }
    };

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

        const obra = await api.get('/obra');
        this.setState({obras : obra.data });

        const cliente = await api.get('/cliente');
        this.setState({clientes : cliente.data });

        const obratipo = await api.get('/obratipo');
        this.setState({obratipos : obratipo.data });

        const estado = await api.get('/estado');
        this.setState({estados: estado.data });

        const cidade = await api.get('/cidade');
        this.setState({cidades: cidade.data });
       
    }

    onClienteChange = async (e) => {
        this.setState({cliente: e.value});
    }

    onObraTipoChange = async (e) => {
        this.setState({obratipo: e.value});
    }

    onEstadoChange = async (e) => {
        this.setState({estado: e.value});
    } 

    onCidadeChange = async (e) => {
        this.setState({cidade: e.value});
    } 

    selecionar = async (e) => {

        const teste =e.data

            this.setState({  

                id            : teste.id,
                nome          : teste.nome,
                datacadastro  : teste.datacadastro,
                descricao     : teste.descricao,
                cliente       : teste.cliente,
                valorobra     : teste.valorobra,
                status        : teste.status,
                datainicio    : teste.datainicio,
                datafim       : teste.datafim,
                obratipo      : teste.obratipo,
                estado        : teste.estado,
                cidade        : teste.cidade,
                rua           : teste.rua,
                numero        : teste.numero,
                cep           : teste.cep,
                complemento   : teste.complemento,
                dataconcluido : teste.dataconcluido,
                concluido     : teste.concluido,
        })
         this.setState({visible: true})
    }

    render(){
                
        return(
     
        <div className="p-grid">
            <Sidebar/>

             <main className="p-col-12 p-lg-9 page">
    
                <Card   subTitle="Lista de  Obras">
                    <Messages ref={(el) => this.messages = el}></Messages>

                        <DataTable selectionMode="single" onSelectionChange={e => this.setState({selectedCar: e.value})} 
                        selection={this.state.id} value={this.state.obras}   onRowSelect={this.selecionar} paginator={true} rows={10}>
                         
                            <Column field="id" header="Id" sortable={true}  />
                            <Column field="nome" header="Nome" sortable={true} />
                            <Column field="valorobra" header="Valor Obra" sortable={true} />
                            <Column field="descricao" header="Descrição" sortable={true} />
                            <Column field="cliente.nome" header="Cliente" sortable={true} />
                            <Column field="obratipo.nome" header="Obra Tipo" sortable={true} />
                            <Column field="estado.nome" header="Estado" sortable={true} />
                            <Column field="cidade.nome" header="Cidade" sortable={true} />
                          </DataTable>

                </Card>
                    <Button label="Show" style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={(e) => this.setState({visible: true})} />
            </main>


            <Dialog header="Cadastro de Obras" visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({visible: false})}>

      <form onSubmit={ this.handleSubmit }>

    <p>
        <label htmlFor="Nome">Nome</label><br />
            <InputText 
                onChange={ e => this.setState({nome: e.target.value})} 
                value={this.state.nome}/>

        <label htmlFor="descricao">descricao</label><br />
            <InputText 
                onChange={ e => this.setState({descricao: e.target.value})} 
                value={this.state.descricao}/>

        <label htmlFor="Nome">valorobra</label><br />
            <InputText 
                onChange={ e => this.setState({valorobra: e.target.value})} 
                value={this.state.valorobra}/>

</p>


<p>  
     <Dropdown  style={{width:'200px'}}   value={this.state.id} options={this.state.clientes} onChange={this.onClienteChange}  placeholder="Selecione a Cliente" optionLabel="nome"/>
    <div style={{marginTop: '.5em'}}>{this.state.cliente.id ? 'Cliente Selecionada: ' + this.state.cliente.nome : 'Selecione o Cliente '}</div>

    <Dropdown  style={{width:'200px'}}   value={this.state.id} options={this.state.obratipos} onChange={this.onObraTipoChange}  placeholder="Selecione o Obra Tipo" optionLabel="nome"/>
    <div style={{marginTop: '.5em'}}>{this.state.obratipo.id ? 'Obra Tipo Selecionado: ' + this.state.obratipo.nome : 'Selecione o estado '}</div>



    <Dropdown  style={{width:'200px'}}   value={this.state.id} options={this.state.cidades} onChange={this.onCidadeChange}  placeholder="Selecione a cidade" optionLabel="nome"/>
    <div style={{marginTop: '.5em'}}>{this.state.cidade.id ? 'Cidade Selecionada: ' + this.state.cidade.nome : 'Selecione a cidade '}</div>

    <Dropdown  style={{width:'200px'}}   value={this.state.id} options={this.state.estados} onChange={this.onEstadoChange}  placeholder="Selecione o estado" optionLabel="nome"/>
    <div style={{marginTop: '.5em'}}>{this.state.estado.id ? 'Estado Selecionado: ' + this.state.estado.nome : 'Selecione o estado '}</div>
    
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