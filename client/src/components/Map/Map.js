import React, {Component} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import {Pie} from 'react-chartjs-2'
import {Multiselect} from 'multiselect-react-dropdown'
import './Map.scss'
import Ukraine from './mymap.json';

const years = ['1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005','2006', '2007', '2008','2009', '2010', '2011', '2012', '2013', '2014', '2015','2016', '2017', '2018', '2019']
class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            direction: 'export',
            data: {},
            isPie: false,
            top: 0, 
            left: 0,
            selectedValues: ['1996']
        }

        this.style = {
            chips: {
              
            },
            searchBox: {
              width: '300px',
              position:'absolute',
              top: '-78px', 
              border: '1px solid #000000',
              maxHeight: '100px',
              overflowY: 'scroll',

            },
            multiselectContainer: {
                width: '300px',
                position:'absolute',
                left: '255px'
            }
          };

        this.handllerDirection = this.handllerDirection.bind(this);
        this.selectHandler = this.selectHandler.bind(this); 
        this.removeHandler = this.removeHandler.bind(this); 
    }  

    handllerDirection(e) {
        this.setState({direction: e.target.outerText.toLowerCase()})
    }
     
     async getRegion (id) {
        const notFoundId = ["ua-43", "ua-30", "ua-40"]
        if (notFoundId.includes(id)) {
            return
        }
        try { 
            const res = await fetch(`/map?direction=${this.state.direction}`, 
            { 
                method: 'POST',
                body: JSON.stringify({id, selectedValues: this.state.selectedValues}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }) 
            const region = await res.json()
            const arr =  region.obj.map(item => {
                delete item.date
                delete item.all
                let labels = Object.values(item).map(el => +el)
                return labels
            })
            const result = arr.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
            
            this.setState({
                data: {
                    labels: ["СНГ", "Інші країни", "Європа", "Країни Європи", "Азія", "Африка", "США", "Океанія"], 
                    datasets: [
                      { 
                        data: result,
                        backgroundColor: ['#50203a', '#cc2d6f', '#149f98','#10292e','#f3d24f','#f4976c','#f76d6d','#ff652f','#53900f',],
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
    
    selectHandler(selectedList) {
       this.setState({selectedValues: selectedList}) 
    }
    
    removeHandler(selectedList) {
        this.setState({selectedValues: selectedList}) 
    }

   layerProps () {  
        return ({    
            onClick: (e) => { 
                e.preventDefault() 
                console.log(e)
                this.getRegion(e.target.attributes.id.value)
                this.setState({top: e.pageY, left: e.pageX})
                this.setState({area: e.target.attributes.id.value})
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

                
                     <Multiselect 
                        options={years} 
                        isObject={false}
                        onSelect={this.selectHandler}
                        onRemove={this.removeHandler}
                        selectedValues={this.state.selectedValues}
                        placeholder='Select years'
                        style={this.style}
                     />
                
                <div className='Map'>
                     <VectorMap {...Ukraine} layerProps={this.layerProps()}/>
                </div>
                <div className={this.state.isPie ? 'pie' : 'hide'} style={{top: this.state.top - 100 + 'px' , left: this.state.left - 100 + 'px'}}>     
                    <Pie data= {this.state.data}/> 
                </div>
                    <p className='Vinnytsya'><span className='dot'>.</span> Vinnytsya</p>
                    <p className='Volyn'><span className='dot'>.</span> Volyn</p>
                    <p className='Sumy'><span className='dot'>.</span> Sumy</p>
                    <p className='Dnepro'><span className='dot'>.</span> Dnepro</p>
                    <p className='Ivano-Frankivsk'><span className='dot'>.</span> Ivano-Frankivsk</p>
                    <p className='Odesa'><span className='dot'>.</span> Odesa</p>
                    <p className='Kyiv'><span className='dot'>.</span> Kyiv</p>
                    <p className='Kirovohrad'><span className='dot'>.</span> Kirovohrad</p>
                    <p className='Luhansk'><span className='dot'>.</span> Luhansk</p>
                    <p className='Zakarpattia'><span className='dot'>.</span> Zakarpattia</p>
                    <p className='Chernivtsi'><span className='dot'>.</span> Chernivtsi</p>
                    <p className='Ternopil'><span className='dot'>.</span> Ternopil</p>
                    <p className='Khmelnytsky'><span className='dot'>.</span> Khmelnytsky</p>
                    <p className='Zaporizhia'><span className='dot'>.</span> Zaporizhia</p>
                    <p className='Zhytomyr'><span className='dot'>.</span> Zhytomyr</p>
                    <p className='Cherkasy'><span className='dot'>.</span> Cherkasy</p>
                    <p className='Lviv'><span className='dot'>.</span> Lviv</p>
                    <p className='Chernihiv'><span className='dot'>.</span> Chernihiv</p>
                    <p className='Poltava'><span className='dot'>.</span> Poltava</p>
                    <p className='Kharkiv'><span className='dot'>.</span> Kharkiv</p>
                    <p className='Kherson'><span className='dot'>.</span> Kherson</p>
                    <p className='Mykolaiv'><span className='dot'>.</span> Mykolaiv</p>
                    <p className='Donetsk'><span className='dot'>.</span> Donetsk</p>
                    <p className='Rivne'><span className='dot'>.</span> Rivne</p>
                    <p className='Crimea'><span className='dot'>.</span> Crimea</p>
            </div> 

            
             
        )
    }  
}

export default Map
