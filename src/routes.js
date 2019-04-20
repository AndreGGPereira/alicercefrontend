import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import List from './pages/List'
import Form from './pages/Form'
import Cliente from './pages/Cliente'
import Estado from './pages/Estado'
import Cidade from './pages/Cidade'
import Permissao from './pages/Permissao'
import ObraTipo from './pages/ObraTipo'
import Obra from './pages/Obra'

const Routes = () => (
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/cliente" component={ Cliente } />
        <Route path="/estado" component={ Estado } />
        <Route path="/cidade" component={ Cidade } />
        <Route path="/permissao" component={ Permissao } />

        <Route path="/obratipo" component={ ObraTipo } />
        <Route path="/obra" component={ Obra } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/list" component={ List } />
        <Route path="/form" component={ Form } />
        <Route path="*" component={() => <h1>Not Found!</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;