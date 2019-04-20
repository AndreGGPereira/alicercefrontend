import React from 'react'
import Sidebar from '../../components/sidebar/'

import {Card} from 'primereact/card';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Button} from 'primereact/button';

import api from '../../services/api'

export default class List extends React.Component{
    state = {
        estado: []
    }

    async componentDidMount(){
        const res = await api.get('/teste');
        console.log(res);
       this.setState({ data: res.data });
      
    }

    handleDelete = async (e) => {
        e.preventDefault();
        const id = e.target.value;
        const post = await api.delete('/posts/' + id );
    }

    render(){
        return(
            <div className="p-grid">
                <Sidebar/>
                <main className="p-col-12 p-lg-9 page">

                    <div className="p-grid p-align-center p-justify-end">

                        <div className="p-col-12 p-lg-8">
                            <h1>List Lista</h1>
                        </div>

                        <div className="p-col-12 p-lg-4">
                            <Button label="Novo Cadastro" icon="pi pi-plus" className="p-button-primary"/>
                        </div>

                    </div>
                    

                    <Card>
                        <DataTable value={this.state.data} paginator={true} rows={10}>
                            <Column field="id" header="Id" />
                            <Column field="nome" header="Nome" />
                        </DataTable>
                    </Card>

                </main>
            </div>
        )
    }
}