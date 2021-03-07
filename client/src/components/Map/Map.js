import React, {Component} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import {Pie} from 'react-chartjs-2'
import './Map.scss'
import Ukraine from './mymap.json';

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            direction: 'export',
            year: '2019',
            data: {},
            isPie: false,
            top: 0, 
            left: 0
        }
        this.handllerDirection = this.handllerDirection.bind(this);
        this.handllerYear = this.handllerYear.bind(this);
    }  

    handllerDirection(e) {
        this.setState({direction: e.target.outerText.toLowerCase()})
    }

     handllerYear(e){
        this.setState({year: e.target.outerText})
    }
     
     async getRegion (id) {
        try { 
            const res = await fetch(`/map?direction=${this.state.direction}&year=${this.state.year}`, 
            { 
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            const region = await res.json()
            delete region.obj.date
            const labels = Object.values(region.obj)
            const key = Object.keys(region.obj)
            this.setState({
                data: {
                    labels: key, 
                    datasets: [
                      { 
                        data: labels,
                        backgroundColor: [  
                          'rgba(255, 99, 132, 0.8)', 
                          'rgba(54, 162, 235, 0.8)',  
                          'rgba(255, 206, 86, 0.8)',
                          'rgba(75, 192, 192, 0.8)',
                          'rgba(153, 102, 255, 0.8)',
                          'rgba(255, 159, 64, 0.8)',
                          'rgba(255, 125, 85, 0.8)',
                          'rgba(245, 125, 85, 0.8)',
                          'rgba(225, 114, 75, 0.8)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132)',
                          'rgba(54, 162, 235)',
                          'rgba(255, 206, 86)',
                          'rgba(75, 192, 192)',
                          'rgba(153, 102, 255)',
                          'rgba(255, 159, 64)',
                          'rgba(255, 179, 68)',
                          'rgba(225, 149, 62)',
                          'rgba(275, 178, 28)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  },
                  isPie: true
            })
        } catch (e) {      
            console.log(e)     
        }  
    }   
    
    

   layerProps () {  
        return ({    
            onClick: (e) => { 
                e.preventDefault() 
                this.getRegion(e.target.attributes.id.value)
                this.setState({top: e.pageY, left: e.pageX})
            }  
        })
    } 

    render() {
        return ( 
            <div className='wrapper'>
                <div className="dropdown direction">
                    <button className="btn btn-secondary dropdown-toggle own-btn item-list"
                        type="button" 
                        id="dropdownMenuButton" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                       Direction: {this.state.direction}
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
    
                <div className="dropdown year">
                    <button className="btn btn-secondary dropdown-toggle own-btn item-list"
                        type="button" 
                        id="dropdownMenuButton" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                        Year: {this.state.year}
                    </button>
                    <ul 
                        className="dropdown-menu own" 
                        aria-labelledby="dropdownMenuButton"
                        onClick={this.handllerYear}
                    >
                        <li className="dropdown-item item-list">1996</li>
                        <li className="dropdown-item item-list">1997</li>
                        <li className="dropdown-item item-list">1998</li>
                        <li className="dropdown-item item-list">1999</li>
                        <li className="dropdown-item item-list">2000</li>
                        <li className="dropdown-item item-list">2001</li>
                        <li className="dropdown-item item-list">2002</li>
                        <li className="dropdown-item item-list">2003</li>
                        <li className="dropdown-item item-list">2004</li>
                        <li className="dropdown-item item-list">2005</li>
                        <li className="dropdown-item item-list">2006</li>
                        <li className="dropdown-item item-list">2007</li>
                        <li className="dropdown-item item-list">2008</li>
                        <li className="dropdown-item item-list">2009</li>
                        <li className="dropdown-item item-list">2010</li>
                        <li className="dropdown-item item-list">2011</li>
                        <li className="dropdown-item item-list">2012</li>
                        <li className="dropdown-item item-list">2013</li>
                        <li className="dropdown-item item-list">2014</li>
                        <li className="dropdown-item item-list">2015</li>
                        <li className="dropdown-item item-list">2016</li>
                        <li className="dropdown-item item-list">2017</li>
                        <li className="dropdown-item item-list">2018</li>
                        <li className="dropdown-item item-list">2019</li>
                    </ul> 
                </div>
    
                <div className='Map'>
                     <VectorMap {...Ukraine} layerProps={this.layerProps()}/>
                </div>
                <div className={this.state.isPie ? 'pie' : 'hide'} style={{top: this.state.top - 100 + 'px' , left: this.state.left - 100 + 'px'}}>     
                    <Pie data= {this.state.data}/> 
                </div>
            </div> 
             
        )
    }  
}

export default Map

