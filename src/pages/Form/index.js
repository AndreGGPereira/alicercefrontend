import React from 'react'
import Sidebar from '../../components/sidebar/'

import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';

import api from '../../services/api';

export default class Form extends React.Component{
    state = {
        title: '',
        content: '',
        posts: []
    };

    toggle() {
        this.setState({disabled: !this.state.disabled});
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const post = await api.post('/cadastro', {
            title: this.state.title,
            content: this.state.content
        });

        this.setState({ posts: [
            ...this.state.posts, post], 
            title: '',
            content: '',
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