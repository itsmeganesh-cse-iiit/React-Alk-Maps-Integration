import React from 'react';
import Script from 'react-load-script'

let ALKMaps=null
let AlkMainmap=null
let vectorLayer=null
let vectorMoreLayer=null
export class Maps extends React.Component {

  constructor(props) {
    super(props)
    this.mapContainer = React.createRef();

    this.state = {
       scriptLoaded:false,
       scriptError:false,
       map:null,
       markersChecked:false,
       vectorsChecked:false,
       removeAllLayers:false,
       vectorsMoreChecked:false,
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
    ALKMaps = window.ALKMaps;
    AlkMainmap =  new ALKMaps.Map(this.mapContainer.current, {
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
    AlkMainmap.addLayer(layer);
    let center = new ALKMaps.LonLat(-77, 39).transform(
      new ALKMaps.Projection("EPSG:4326"),
      AlkMainmap.getProjectionObject())
      AlkMainmap.setCenter(center, 7); 
  }

  addVectors(){
    vectorLayer = new ALKMaps.Layer.Vector("Vector Layer");
    AlkMainmap.addLayers([vectorLayer]);
    AlkMainmap.setCenter(new ALKMaps.LonLat(-74.755522, 40.567494).transform(new ALKMaps.Projection("EPSG:4326"), AlkMainmap.getProjectionObject()), 9);
    var pointFeature = new ALKMaps.Feature.Vector(
      new ALKMaps.Geometry.Point(-74.755522, 40.567494).transform(new ALKMaps.Projection("EPSG:4326"), AlkMainmap.getProjectionObject()), 
      null, 
      {
        pointRadius: 10,
        fillColor: "green",
        label: "Pavani",
        labelYOffset: 20,
        fontWeight: "bold",
        fontColor: "green"
      }
    );
    vectorLayer.addFeatures([pointFeature]);
  }

  addMoreVectors(){
    vectorMoreLayer = new ALKMaps.Layer.Vector("Vector Layer");
    AlkMainmap.addLayers([vectorMoreLayer]);
    AlkMainmap.setCenter(new ALKMaps.LonLat(-74.655522, 40.367494).transform(new ALKMaps.Projection("EPSG:4326"), AlkMainmap.getProjectionObject()), 9);
    var vect1 = new ALKMaps.Feature.Vector(
      new ALKMaps.Geometry.Point(-74.655522, 40.367494).transform(new ALKMaps.Projection("EPSG:4326"), AlkMainmap.getProjectionObject()), 
      null, 
      {
        pointRadius: 10,
        fillColor: "red",
        label: "Ganesh",
        labelYOffset: 20,
        fontWeight: "bold",
        fontColor: "red"
      }
    );
    var vect2 = new ALKMaps.Feature.Vector(
      new ALKMaps.Geometry.Point(-74.755522, 40.767494).transform(new ALKMaps.Projection("EPSG:4326"), AlkMainmap.getProjectionObject()), 
      null, 
      {
        pointRadius: 10,
        fillColor: "blue",
        label: "Rhino",
        labelYOffset: 20,
        fontWeight: "bold",
        fontColor: "blue"
      }
    );

    var vect3 = new ALKMaps.Feature.Vector(
      new ALKMaps.Geometry.Point(-74.455522, 40.167494).transform(new ALKMaps.Projection("EPSG:4326"), AlkMainmap.getProjectionObject()), 
      null, 
      {
        pointRadius: 10,
        fillColor: "black",
        label: "Anonymous",
        labelYOffset: 20,
        fontWeight: "bold",
        fontColor: "black"
      }
    );
    vectorMoreLayer.addFeatures([vect1,vect2,vect3]);
  }

  removeVectorLayer(layer){
    if(layer!==null){
      AlkMainmap.removeLayer(layer);
      let lonLat = new ALKMaps.LonLat(-74.655522, 40.367494).transform(new ALKMaps.Projection("EPSG:4326"), AlkMainmap.getProjectionObject());
      AlkMainmap.setCenter(lonLat, 9 );
      layer=null
    }
  }

  removeAll(){

  }

  changeHandler=(checkbox)=>{
    this.setState({
      [checkbox]:!this.state[checkbox]
    },()=>{
      // alert(this.state.markersChecked)
          if(this.state.vectorsChecked){
            if(vectorLayer===null){
              this.addVectors()
            }
           
          }
          else{
            if(vectorLayer!==null){
              this.removeVectorLayer(vectorLayer)
              vectorLayer=null
            }
            
          }
          // if(this.state.removeAllLayers){

          //   this.removeAll()
          // }

          if(this.state.vectorsMoreChecked){
            if(vectorMoreLayer===null){
              this.addMoreVectors()
            }
            
          }
          else{
            if(vectorMoreLayer!==null){
              this.removeVectorLayer(vectorMoreLayer)
              vectorMoreLayer=null
            }
            
          }
     

    })
    


   

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
            <input type='checkbox' checked={this.state.markersChecked} onChange={()=>this.changeHandler('markersChecked')}  id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
          </div>   

          
            <div style={{display:"flex",alignItems:"center"}}>
            <label for='name'>Add Vectors</label>
            <input type='checkbox' checked={this.state.vectorsChecked}  onChange={()=>this.changeHandler('vectorsChecked')} id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
             </div>

             <div style={{display:"flex",alignItems:"center"}}>
            <label for='name'> Add More Vectors </label>
            <input type='checkbox' checked={this.state.vectorsMoreChecked}  onChange={()=>this.changeHandler('vectorsMoreChecked')} id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
             </div>

             <div style={{display:"flex",alignItems:"center"}}>
            <label for='name'>Add Vector Markers</label>
            <input type='checkbox' id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
             </div>


             <div style={{display:"flex",alignItems:"center"}}>
            <label for='name'>Add Route </label>
            <input type='checkbox' id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
             </div>

      <hr/>
             <div style={{display:"flex",alignItems:"center"}}>
            <label for='name'>Remove All Layers </label>
            <input type='checkbox' checked={this.state.removeAllLayers} onChange={()=>this.changeHandler('removeAllLayers')}  id="name" style={{width:"23px",height:"23px",backgroundColor:"green"}} />
             </div>
             <hr/>

             <div>&copy; RhinoTeam</div>
    
  </div>

          {/* Below tag is Imp for map loading */}
          <div ref={this.mapContainer} style={{width:"80vw",height:"100vh",flexGrow:1}}>
          </div>

          
      </div>
    )
  }
}



export default Maps;
