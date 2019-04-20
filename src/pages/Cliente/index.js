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


export default class Cliente extends React.Component{
    state = {
    id            : '',
	nome          : '',
	datacadastro  : '',
	estado        : '',
	cidade        : '',
	rua           : '',
	numero        : '',
	cep           : '',
	complemento   : '',
	rmail         : '',
	relefone      : '',
	relefoneSecu  : '',
	cpf           : '',
	cnpj          : '',
	opessoafisica : '',
    obspessoa     : '',
    clientes      : [],
    estados       : [],
    cidades       : [],
    data       : []
         
        }
    
    //convertendo senha string para byte
           
    handleSubmit = async (e) => {
        e.preventDefault();

        const cliente = await api.post('/cliente', {
           
            id:           parseInt(this.state.id),
            nome:         this.state.nome,
            datacadastro: this.state.datacadastro,
            estado:       this.state.estado,
            cidade:       this.state.cidade,
            rua:          this.state.rua,
            numero:       parseInt(this.state.numero),
            cep:          this.state.cep,
            complemento:  this.state.complemento,
            rmail:        this.state.rmail,
            telefone:     this.state.telefone,
            telefonesecu: this.state.telefonesecu,
            cpf:          this.state.cpf,
            cnpj:         this.state.cnpj,
            pessoafisica: this.convertBool(this.state.pessoafisica),
            obspessoa:    this.state.obspessoa
        });

        this.setState({  
            id           : '',
            nome         : '',
            datacadastro : '',
            estado       : '',
            cidade       : '',
            rua          : '',
            numero       : '',
            cep          : '',
            complemento  : '',
            email        : '',
            telefone     : '',
            telefonesecu : '',
            cpf          : '',
            cpnj         : '',
            pessoafisica : false,
            obspessoa    : '',
            visible : false,
        });

        if (cliente.status == 200  ){
            this.messages.show({severity: 'success', summary: cliente.data});
        }else{
            this.messages.show({severity: 'error', summary: cliente.data});
        }
        
        this.getAll()
    };

    getAll = async (e) => {
        const cliente = await api.get('/cliente');
        this.setState({ clientes: cliente.data });
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

        const cliente = await api.get('/cliente');
        console.log(cliente)
        this.setState({clientes : cliente.data });

        const cidade = await api.get('/cidade');
        this.setState({cidades : cidade.data });

        const estado = await api.get('/estado');
        this.setState({estados: estado.data });
        console.log(this.state.cidades)
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
            id:           teste.id,
            nome:         teste.nome,
            datacadastro: teste.datacadastro,
            estado:       teste.estado,
            cidade:       teste.cidade,
            rua:          teste.rua,
            numero:       teste.numero,
            cep:          teste.cep,
            complemento:  teste.complemento,
            email:        teste.email,       
            telefone:     teste.telefone,
            telefonesecu: teste.telefonesecu,
            cpf:          teste.cpf,
            cnpj:         teste.cnpj,
            pessoafisica: teste.pessoafisica,
      
        })
         this.setState({visible: true})
    }

    render(){

                
        return(
     
        <div className="p-grid">
            <Sidebar/>

             <main className="p-col-12 p-lg-9 page">
    
                <Card   subTitle="Lista de Clientes">
                    <Messages ref={(el) => this.messages = el}></Messages>

                        <DataTable selectionMode="single" onSelectionChange={e => this.setState({selectedCar: e.value})} 
                        selection={this.state.id} value={this.state.clientes}   onRowSelect={this.selecionar} paginator={true} rows={10}>
                         
                            <Column field="id" header="Id" sortable={true}  />
                            <Column field="nome" header="Nome" sortable={true} />
                            <Column field="descricao" header="Descrição" sortable={true} />
                            <Column field="estado.nome" header="Estado" sortable={true} />
                            <Column field="cidade.nome" header="Cidade" sortable={true} />
                          </DataTable>

                </Card>
                    <Button label="Show" style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={(e) => this.setState({visible: true})} />
            </main>


            <Dialog header="Cadastro de Clientes" visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({visible: false})}>

      <form onSubmit={ this.handleSubmit }>

    <p>
        <label htmlFor="Nome">Nome</label><br />
            <InputText 
                onChange={ e => this.setState({nome: e.target.value})} 
                value={this.state.nome}/>
     </p>
     <p>
        <label htmlFor="DataCadastro">Data Cadastro</label><br />
        <Calendar 
            onChange={ e => this.setState({datacadastro: e.target.value})} 
            value={this.state.datacadastro}/>     
    </p>

    <p>


    <Dropdown  style={{width:'200px'}}   value={this.state.id} options={this.state.cidades} onChange={this.onCidadeChange}  placeholder="Selecione a cidade" optionLabel="nome"/>
    <div style={{marginTop: '.5em'}}>{this.state.cidade.id ? 'Cidade Selecionada: ' + this.state.cidade.nome : 'Selecione a cidade '}</div>
    </p>
    <p>
    <Dropdown  style={{width:'200px'}}   value={this.state.id} options={this.state.estados} onChange={this.onEstadoChange}  placeholder="Selecione o estado" optionLabel="nome"/>
    <div style={{marginTop: '.5em'}}>{this.state.estado.id ? 'Estado Selecionado: ' + this.state.estado.nome : 'Selecione o estado '}</div>

        
    </p>

    <p>

        <label htmlFor="Cep">Cep</label><br />
        <InputMask mask="99-999999"
                onChange={ e => this.setState({cep: e.target.value})} 
                value={this.state.cep}/>

    </p>
    
    <p>
        <label htmlFor="in">Email</label><br />
            <InputText 
                onChange={ e => this.setState({email: e.target.value})} 
                value={this.state.email}/>
     </p>
     <p>
        <label htmlFor="in">Telefone</label><br />
        
         <InputMask mask="(999) 999-9999"  placeholder="(999) 999-9999"
                onChange={ e => this.setState({telefone: e.target.value})} 
                value={this.state.telefone}/>        
    </p>

    <p>
        <label htmlFor="in">TelefoneSecu</label><br />
        <InputMask mask="(999) 999-9999"  placeholder="(999) 999-9999"
                onChange={ e => this.setState({telefonesecu: e.target.value})} 
                value={this.state.telefonesecu}/>
    </p>
    <p>
        <label htmlFor="in">CPF</label><br />
        <InputMask mask="999.999.999-99"  placeholder="999.999.999-99"
                onChange={ e => this.setState({cpf: e.target.value})} 
                value={this.state.cpf}/>        
    </p>

    <p>
        <label htmlFor="in">CNPJ</label><br />
        <InputMask mask="99.999.999/9999-99"  placeholder="99.999.999/9999-99"
                onChange={ e => this.setState({cnpj: e.target.value})} 
                value={this.state.cnpj}/>
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