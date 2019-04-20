import React from 'react';
import './styles.scss';
import {Menubar} from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { InputText } from 'primereact/inputtext';
import {Button} from 'primereact/button';


export default class Sidebar extends React.Component{
    
    render(){

        const itemsTeste = [
            {
               label:'File',
               icon:'pi pi-fw pi-file',
               items:[
                  {
                     label:'New',
                     icon:'pi pi-fw pi-plus',
                     items:[

                        {
                           url: '/estado',
                           label:'Estado',
                           icon:'pi pi-fw pi-bookmark'
                        },
                        {
                           url: '/cidade',
                           label:'Cidade',
                           icon:'pi pi-fw pi-bookmark'
                        },
                        {
                           url: '/cliente',
                           label:'Cliente',
                           icon:'pi pi-fw pi-bookmark'
                        },
                        {
                           url: '/',
                           label:'Login',
                           icon:'pi pi-fw pi-bookmark'
                        },
                        {
                           url: '/list',
                           label:'Lista',
                           icon:'pi pi-fw pi-video'
                        },
                        {
                           url: '/permissao',
                           label:'Permissão',
                           icon:'pi pi-fw pi-bookmark'
                        },
                        {
                           url: '/obratipo',
                           label:'Obra Tipo',
                           icon:'pi pi-fw pi-bookmark'
                        },
                        {
                           url: '/obra',
                           label:'Obra',
                           icon:'pi pi-fw pi-bookmark'
                        },
         
                     ]
                  },
                  {
                     label:'Delete',
                     icon:'pi pi-fw pi-trash'
                  },
                  {
                     separator:true
                  },
                  {
                     label:'Export',
                     icon:'pi pi-fw pi-external-link'
                  }
               ]
            },
            {
               label:'Edit',
               icon:'pi pi-fw pi-pencil',
               items:[
                  {
                     label:'Left',
                     icon:'pi pi-fw pi-align-left'
                  },
                  {
                     label:'Right',
                     icon:'pi pi-fw pi-align-right'
                  },
                  {
                     label:'Center',
                     icon:'pi pi-fw pi-align-center'
                  },
                  {
                     label:'Justify',
                     icon:'pi pi-fw pi-align-justify'
                  },
         
               ]
            },
            {
               label:'Users',
               icon:'pi pi-fw pi-user',
               items:[
                  {
                     label:'New',
                     icon:'pi pi-fw pi-user-plus',
         
                  },
                  {
                     label:'Delete',
                     icon:'pi pi-fw pi-user-minus',
         
                  },
                  {
                     label:'Search',
                     icon:'pi pi-fw pi-users',
                     items:[
                        {
                           label:'Filter',
                           icon:'pi pi-fw pi-filter',
                           items:[
                              {
                                 label:'Print',
                                 icon:'pi pi-fw pi-print'
                              }
                           ]
                        },
                        {
                           icon:'pi pi-fw pi-bars',
                           label:'List'
                        }
                     ]
                  }
               ]
            },
            {
               label:'Events',
               icon:'pi pi-fw pi-calendar',
               items:[
                  {
                     label:'Edit',
                     icon:'pi pi-fw pi-pencil',
                     items:[
                        {
                           label:'Save',
                           icon:'pi pi-fw pi-calendar-plus'
                        },
                        {
                           label:'Delete',
                           icon:'pi pi-fw pi-calendar-minus'
                        },
         
                     ]
                  },
                  {
                     label:'Archieve',
                     icon:'pi pi-fw pi-calendar-times',
                     items:[
                        {
                           label:'Remove',
                           icon:'pi pi-fw pi-calendar-minus'
                        }
                     ]
                  }
               ]
            },
            {
               label:'Quit',
               icon:'pi pi-fw pi-power-off'
            }
         ];
        

        let items = [
            {
                label: 'Funcionalidades',
                items: [{label: 'Cadastrar', icon: 'pi pi-fw pi-plus', url: '/form' },
                        {label: 'Listar', icon: 'pi pi-fw pi-trash', url: '/list'} ]
            }, 
            {
                label: 'Account',
                items: [{label: 'Options', icon: 'pi pi-fw pi-cog', url: '/dashboard' },
                        {label: 'Sign Out', icon: 'pi pi-fw pi-power-off', url: '/' } ]
            }
        ];
        
        return(
            <div style={{width:10000}}>
                <a href="/">
                    <h1>Alicerce</h1>
                </a>

                <Menubar model={itemsTeste}>
    <InputText placeholder="Search" type="text"/>
    <Button label="Logout" icon="pi pi-power-off" style={{marginLeft:4}}/>
</Menubar>
                {/*<Menu model={items} style={{ width: '100%' }} />
                <Menubar model={itemsTeste}/>*/}
            </div>
        )
    }
}