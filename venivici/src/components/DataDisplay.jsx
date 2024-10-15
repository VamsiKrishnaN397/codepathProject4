import { useState } from "react";
import Gallery from "./Gallery";

const DataDisplay = () => {
    const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
    const [currentImage, setCurrentImage] = useState("");
    const [isTagVisible, setIsTagVisible] = useState(false);
    const [catData, setCatData] = useState([{
        catType: "",
        catImage: ""
    }]);
    const [breeds, setBreeds] = useState([{
        breed_id: "", 
        breed_name: ""
    }]);
    const [inputs, setInputs] = useState({
        name: "",
        life_span: "",
        origin: "",
        breed_id: ""
    });
    const callAPI = async (query) => {
        const response = await fetch(query);
        const json = await response.json();
        
        if (json[0].url == null) {
            alert("Oops! Something went wrong with that query, let's try again!")
        }
        else {
            let breedIds = [];
            for(let id in breeds){
                breedIds.push(breeds[id].breed_id);
            }
            breedIds = breedIds.filter(Boolean)
            if(breedIds.includes(json[0].breeds[0].id)){
                makeQuery();
            }
            else{
                setCurrentImage(json[0].url);
                setCatData((item) => [...item, {catType: json[0].breeds[0].name, catImage: json[0].url}]);
    
                setInputs({
                    name: json[0].breeds[0].name,
                    life_span: json[0].breeds[0].life_span,
                    origin: json[0].breeds[0].origin,
                    breed_id: json[0].breeds[0].id
                })
                setIsTagVisible(true);
            }

        }
    }
    const makeQuery = () => {        
        let breedIds = [];
        for(let id in breeds){
            breedIds.push(breeds[id].breed_id);
        }
        breedIds = breedIds.filter(Boolean)

        let query = breeds.length > 1 ? `https://api.thecatapi.com/v1/images/search?api_key=${ACCESS_KEY}&limit=1&has_breeds=true&breed_ids!=${breedIds}` : 
        `https://api.thecatapi.com/v1/images/search?api_key=${ACCESS_KEY}&limit=1&has_breeds=true`;
        callAPI(query).catch(console.error);
    }
    const banName = () => {
        let breedIds = [];
        for(let id in breeds){
            breedIds.push(breeds[id].breed_id);
        }
        breedIds = breedIds.filter(Boolean)
        if(!breedIds.includes(inputs.breed_id)){
            setBreeds((item) => [...item, {breed_id: inputs.breed_id, breed_name: inputs.name}]);
        }
    }
    const unBanAttribute = (e) => {
        setBreeds(prevBreeds => prevBreeds.filter(breed => breed.breed_id !== e));
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3" style={{backgroundColor: 'pink', height: '72vh'}}>
                        <Gallery catData={catData}/>
                    </div>
                    <div className="col-sm-6" style={{backgroundColor: 'green'}}>
                        <div className="card">
                            <div className="card-body">
                                <h1>Trippin' on Cats</h1>
                                <h4>Discover Cats from your wildest dreams !</h4>
                                <span style={{fontSize: 20 + 'px'}}>🐈😺😸😹😻😼😽🙀😿😾🐱🐈‍⬛</span>
                                <br/>
                                {isTagVisible &&
                                    <button className="btn btn-info">
                                        <span style={{color: 'white', fontSize: 20 + 'px'}} onClick={banName}>{inputs.name}</span>
                                    </button>
                                }
                                {isTagVisible &&  
                                    <button className="btn btn-info">
                                        <span style={{color: 'white', fontSize: 20 + 'px'}}>{inputs.life_span} Years</span>
                                    </button>
                                }
                                {isTagVisible &&    
                                    <button className="btn btn-info">
                                        <span style={{color: 'white', fontSize: 20 + 'px'}}>{inputs.origin}</span>
                                    </button>
                                }
                                <br/>
                                {isTagVisible && <img className="catImage" src={currentImage} alt="Cat Image returned"/>}
                                <button className="btn btn-dark">
                                    <span style={{color: 'white', fontSize: 20 + 'px'}} onClick={makeQuery}>🔀 Discover! 🔀</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3" style={{backgroundColor: 'yellow'}}>
                        <div className="card">
                            <div className="card-body">
                                <h2>Banned List !</h2>
                                <h3>Select an attribute in your listing to ban it</h3>
                                {breeds.map(item => item.breed_id!= "" && (
                                    <button className="btn btn-danger" key={item.breed_id}>
                                        <span style={{color: 'white', fontSize: 20 + 'px'}} onClick={() => unBanAttribute(item.breed_id)}>{item.breed_name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataDisplay;