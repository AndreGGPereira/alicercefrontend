import React from 'react'
import Sidebar from '../../components/sidebar/'
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';

export default class Dashboard extends React.Component{
    render(){

        const footer = <span>
                        <Button label="Cadastrar" icon="pi pi-plus" style={{marginRight: '.25em'}}/>
                        <Button label="Visualizar" icon="pi pi-list" className="p-button-secondary"/>
                    </span>;
        return(
            <div className="p-grid">
                <Sidebar/>
                <main className="p-col-12 p-lg-9 page">
                    <h1>Dashboard</h1>

                    <div className="p-grid p-justify-between">

                        <Card footer={footer} className="p-col-12 p-lg-6">
                            <h1>Card</h1>
                            <p>Card is a flexible container component.</p>
                        </Card>

                        <Card footer={footer} className="p-col-12 p-lg-6">
                            <h1>Card</h1>
                            <p>Card is a flexible container component.</p>
                        </Card>

                    </div>

                </main>
            </div>
        )
    }
}