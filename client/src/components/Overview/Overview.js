import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "rsuite-table/dist/css/rsuite-table.css";
import './Overview.scss'

class Overview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            targetMarket: 'export', 
            data:[],
            isTable:false,
            region: '',
            status: false,
            itemDate: null,
            rowKey: null,
            itemAll: null,
            itemCis: null,
            itemOtherCountries: null,
            itemEurope: null,
            itemEUcountries: null,
            itemAsia: null,
            itemAfrica: null,
            itemUsa: null,
            itemOceania: null
        }
        this.getNameRegion = this.getNameRegion.bind(this);
        this.handllerDirection = this.handllerDirection.bind(this);
        this.getInfoRegion = this.getInfoRegion.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.updateInventory = this.updateInventory.bind(this);
    }  

    handllerDirection(e) {
        this.setState({targetMarket: e.target.outerText.toLowerCase()})
    }

    onEdit(obj) {
    const {
        id,
        itemDate,
        itemAll,
        itemCis,
        itemOtherCountries,
        itemEurope,
        itemEUcountries,
        itemAsia,
        itemAfrica,
        itemUsa,
        itemOceania
    } = obj

    this.setState({
        status: true,
        rowKey: id,
        itemDate,
        itemAll,
        itemCis,
        itemOtherCountries,
        itemEurope,
        itemEUcountries,
        itemAsia,
        itemAfrica,
        itemUsa,
        itemOceania
    })
    }

    updateInventory (obj) {
        const {region, targetMarket} = this.state
        const {} = obj
        fetch(`/region/table`, {
            method: "PATCH",
            body: JSON.stringify({
                ...obj,
                region,
                targetMarket
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(() => {
                this.onCancel()
                this.getInfoRegion(region)
            })
    }

    onSave(obj) {
        this.updateInventory(obj)
    }

    onCancel () {
        this.setState({
            status: false,
            rowKey: null,
            itemDate: null,
            rowKey: null,
            itemAll: null,
            itemCis: null,
            itemOtherCountries: null,
            itemEurope: null,
            itemEUcountries: null,
            itemAsia: null,
            itemAfrica: null,
            itemUsa: null,
            itemOceania: null
        })
    }

    async getNameRegion () { 
        const res = await fetch('/regions/name')
        const data = await res.json()
        this.setState({
            names: data.map((name, index) =>
            {
                return <li className="dropdown-item item-list" 
                onClick={e =>  this.getInfoRegion(e.target.outerText)}
                key={index}>{name}</li>
            })
        })
    }

    async getInfoRegion (area) {
        const res = await fetch(`/region/table`, {
            method: 'POST',
                body: JSON.stringify({area, targetMarket: this.state.targetMarket}),   
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
        })     
        const data = await res.json()  
        this.setState({
            isTable: true,
            data:[...data.direction],
            region: area
        })
        console.log(this.state.data)
    }

    render() {
        const {data, status, rowKey, itemAll, itemCis, itemAfrica, itemEurope, itemAsia, itemEUcountries, itemOceania, itemOtherCountries, itemUsa} = this.state
        return (
            <>       
             <div className="dropdown statics">
                <button className="btn btn btn-secondary dropdown-toggle own-btn item-list"
                    type="button" 
                    id="dropdownMenuButton" 
                    data-toggle="dropdown" 
                    aria-haspopup="true"   
                    aria-expanded="false"
                    onClick={this.getNameRegion} 
                >
                    Regions: {this.state.region}
                </button>
                <ul 
                    className="dropdown-menu own" 
                    aria-labelledby="dropdownMenuButton"
                >
                    {this.state.names}
                </ul>       
            </div>  
            
            <div className="dropdown direction">
                <button className="btn btn btn-secondary dropdown-toggle own-btn item-list"
                    type="button" 
                    id="dropdownMenuButton" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                >
                    Direction: {this.state.targetMarket}
                </button>
                <ul  
                    className="dropdown-menu" 
                    aria-labelledby="dropdownMenuButton"
                    onClick={this.handllerDirection} 
                >
                    <li className="dropdown-item item-list">Import</li>
                    <li className="dropdown-item item-list">Export</li>
                </ul> 
            </div>
                <table className={this.state.isTable ? 'table' : 'hide'}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total</th>
                        <th>CIS countries</th>
                        <th>Other countries</th>
                        <th>Europe</th>
                        <th>EU countries</th>
                        <th>Asia</th>
                        <th>Africa</th>
                        <th>USA</th>
                        <th>Oceania</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((item, index) => (
                        <tr key={index}>
                            <td>{new Date(item.date).getFullYear()}</td>
                            <td>{
                            status && rowKey === index ? (
                                    <input className='form-control' value={itemAll}
                                               onChange={(event) => this.setState({itemAll: event.target.value})}
                                        />
                                ) : (
                                    item.all
                                ) }</td>
                            <td>{
                            status && rowKey === index ? (
                                    <input className='form-control' value={itemCis}
                                               onChange={(event) => this.setState({itemCis: event.target.value})}
                                        />
                                ) : (
                                    item.cis
                                ) }
                            </td>
                            <td>{
                            status && rowKey === index ? (
                                    <input className='form-control' value={itemOtherCountries}
                                               onChange={(event) => this.setState({itemOtherCountries: event.target.value})}
                                        />
                                ) : (
                                    item.other_countries
                                ) }
                            </td>
                            <td>{
                            status && rowKey === index ? 
                                (
                                    <input className='form-control' value={itemEurope}
                                               onChange={(event) => this.setState({itemEurope: event.target.value})}
                                        />
                                ) : (
                                    item.europe
                                ) }</td>
                            <td>{
                                status && rowKey === index ? (
                                    <input className='form-control' value={itemEUcountries}
                                               onChange={(event) => this.setState({itemEUcountries: event.target.value})}
                                        />
                                ) : (
                                    item.eu_countries
                                ) 
                                }</td>
                            <td>{
                                status && rowKey === index ? (
                                    <input className='form-control' value={itemAsia}
                                               onChange={(event) => this.setState({itemAsia: event.target.value})}
                                        />
                                ) : (
                                    item.asia
                                ) 
                                }</td>
                            <td>{
                                status && rowKey === index ? (
                                    <input className='form-control' value={itemAfrica}
                                               onChange={(event) => this.setState({itemAfrica: event.target.value})}
                                        />
                                ) : (
                                    item.africa
                                ) 
                                }</td>
                            <td>{
                                status && rowKey === index ? (
                                    <input className='form-control' value={itemUsa}
                                               onChange={(event) => this.setState({itemUsa: event.target.value})}
                                        />
                                ) : (
                                    item.usa
                                ) 
                            }
                            </td>
                            <td> {
                                status && rowKey === index ? (
                                    <input className='form-control' value={itemOceania}
                                               onChange={(event) => this.setState({itemOceania: event.target.value})}
                                        />
                                ) : (
                                    item.oceania
                                ) 
                                }
                            </td>

                            <td>
                                {
                                    status && rowKey === index ? (
                                        <div className='controllButton'>
                                            <button
                                                className={"btn btn-success"}
                                                onClick={() => this.onSave({
                                                    itemDate: item.date,
                                                    itemAll,
                                                    itemCis,
                                                    itemOtherCountries,    
                                                    itemEurope,
                                                    itemEUcountries,
                                                    itemAsia,
                                                    itemAfrica,
                                                    itemUsa,
                                                    itemOceania
                                                })}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={"btn btn-secondary"}
                                                onClick={() => this.onCancel()}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : ( 
                                        <button
                                            className={"btn btn-primary"}
                                            onClick={() => this.onEdit({
                                                id: index,
                                                itemDate: item.date,
                                                itemAll: item.all,
                                                itemCis: item.cis,
                                                itemOtherCountries: item.other_countries,
                                                itemEurope: item.europe,
                                                itemEUcountries: item.eu_countries,
                                                itemAsia: item.asia,
                                                itemAfrica: item.africa,
                                                itemUsa: item.usa,
                                                itemOceania: item.oceania
                                            })}
                                        >
                                            Edit
                                        </button>
                                    )
                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
                </table>
            </>
        )
    }  
}

export default Overview
