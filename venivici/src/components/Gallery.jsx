const Gallery = ({ catData }) => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h2>Who have we seen so Far ?</h2>                    
                    {(
                        catData.map((pic) => pic.catType != "" && (
                            <div key={pic.catType}>
                                <img
                                className="catImage"
                                src={pic.catImage}
                                alt="Cat Image returned"
                                />
                                <br/>
                                <span style={{fontSize: 20 + 'px', fontWeight: 'bold'}}>{pic.catType}</span>
                            </div>
                            )
                        )
                        )}
                </div>
            </div>
        </div>
    );
};

export default Gallery;