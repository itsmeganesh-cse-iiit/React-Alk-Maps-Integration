import React from 'react';
import Script from 'react-load-script'



export class Maps extends React.Component {

  constructor(props) {
    super(props)
    this.mapContainer = React.createRef();

    this.state = {
       scriptLoaded:false,
       scriptError:false,
       map:null,
    }
  }
  
  handleScriptCreate=()=> {
    this.setState({ scriptLoaded: false })
  }
   
  handleScriptError=() =>{
    this.setState({ scriptError: true })
  }
   
  handleScriptLoad=()=> {
    this.setState({ scriptLoaded: true })
    const ALKMaps = window.ALKMaps;

    let {map} = this.state

    map =  new ALKMaps.Map(this.mapContainer.current, {
        displayProjection: new ALKMaps.Projection('EPSG:4326'),
      });
    // Add your Alk Map Key, Won't work if no api key is placed here
    ALKMaps.APIKey = 'YOUR API KEY';
    var layer = new ALKMaps.Layer.BaseMap( "ALK Maps", 
      {
        style: ALKMaps.STYLE.BASIC
      }, 
      {
        displayInLayerSwitcher: false
      }
    );
    map.addLayer(layer);
    let center = new ALKMaps.LonLat(-77, 39).transform(
      new ALKMaps.Projection("EPSG:4326"),
       map.getProjectionObject())
    map.setCenter(center, 7); 
  }
  
  render() {
    
    return (
      <div style={{display:"flex"}}>

        {/* Async loading alk maps library mdn resource */}
         <Script
            url="https://maps.alk.com/api/1.2/alkmaps.js"
            onCreate={this.handleScriptCreate}
            onError={this.handleScriptError}
            onLoad={this.handleScriptLoad}
          />

          {/* HTML Code not related to maps */}
          <div style={{width:"20vw"}}>
            <h1 style={{textDecoration:"underline"}}>Alk-Maps </h1>
            <div style={{display:"flex",alignItems:"center"}}>
            <label for='name'>Add Markers</label>
            <input type='checkbox' id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
          </div>   

          
            <div style={{display:"flex",alignItems:"center"}}>
            <label for='name'>Add Vectors</label>
            <input type='checkbox' id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
             </div>

             <div style={{display:"flex",alignItems:"center"}}>
            <label for='name'>Add Vector Markers</label>
            <input type='checkbox' id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
             </div>


             <div style={{display:"flex",alignItems:"center"}}>
            <label for='name'>Add Route </label>
            <input type='checkbox' id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
             </div>
    
  </div>

          {/* Below tag is Imp for map loading */}
          <div ref={this.mapContainer} style={{width:"80vw",height:"100vh",flexGrow:1}}>
          </div>
      </div>
    )
  }
}



export default Maps;
