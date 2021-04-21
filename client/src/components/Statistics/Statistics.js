import React, {Component} from 'react'
import './Statistics.scss'
import {Line} from 'react-chartjs-2';


class Statistics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            names: '',
            info: null,
            isGraf: false,
            target_market: 'All countries',
            direction_market: 'all',
            dataGraph: {
                labels: [],
                datasets: [{
                    data: []    
                }]
            },
            market: 'export',
            region: ''
        } 
        this.getNameRegion = this.getNameRegion.bind(this);
        this.getInfoRegion = this.getInfoRegion.bind(this);
        this.handllerMarket = this.handllerMarket.bind(this);
        this.handllerTargetMarket = this.handllerTargetMarket.bind(this);
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
        const res = await fetch(`/region/info?direction=${this.state.market}&direction_market=${this.state.direction_market}`, {
            method: 'POST',
                body: JSON.stringify({area}),   
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
        })     
        const data = await res.json()
        this.setState({ info: data, region: area})   
        this.setState({
            dataGraph: { 
                labels: data.years,
                datasets: [{
                    label: `Statictics by years (${this.state.market})`,
                    fill: false,  
                    lineTension: 0.1, 
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data.alls
                }]
            },
            isGraf: true
        })
    }  

    handllerMarket (e){
        this.setState({market: e.target.outerText.toLowerCase()})
    }

    handllerTargetMarket(e) {
       this.setState({target_market: e.target.outerText, direction_market: e.target.dataset.market})
    }
 
   render () {

    return (   
        <>
            <div className="dropdown direction">
                <button className="btn btn-secondary dropdown-toggle own-btn item-list"
                    type="button" 
                    id="dropdownMenuButton" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                >
                    Direction: {this.state.market}
                </button>
                <ul  
                    className="dropdown-menu" 
                    aria-labelledby="dropdownMenuButton"
                    onClick={this.handllerMarket} 
                >
                    <li className="dropdown-item item-list">Import</li>
                    <li className="dropdown-item item-list">Export</li>
                </ul> 
            </div>

            <div className="dropdown statics">
                <button className="btn btn-secondary dropdown-toggle own-btn item-list"
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

            <div className="dropdown target_market">
                <button className="btn btn-secondary dropdown-toggle own-btn item-list"
                type="button"
                id="dropdownMenuButton" 
                data-toggle="dropdown"
                >
                    Target market: {this.state.target_market}
                </button>
                <ul 
                className="dropdown-menu own" 
                aria-labelledby="dropdownMenuButton"
                onClick={this.handllerTargetMarket}
                >
                    <li className="dropdown-item item-list" data-market='all'>All countries</li>
                    <li className="dropdown-item item-list" data-market='cis'>CIS</li>
                    <li className="dropdown-item item-list" data-market='other_countries'>Other countries</li>
                    <li className="dropdown-item item-list" data-market='europe'>Europe</li>
                    <li className="dropdown-item item-list" data-market='eu_countries'> Europe countries</li>
                    <li className="dropdown-item item-list" data-market='asia'>Asia</li>
                    <li className="dropdown-item item-list" data-market='africa'>Africa</li>
                    <li className="dropdown-item item-list" data-market='usa'>USA</li>
                    <li className="dropdown-item item-list" data-market='oceania'>Oceania</li>
                </ul> 
            </div>  
            <div className={this.state.isGraf ? 'visible' : 'hidden'}>
                <Line data={this.state.dataGraph}/>
            </div>
        </>
        
    )}
}

export default Statistics