import React from "react";
import getNaturalImages from "../api/nasa";
import ImageFader from "./ImageFader";

class App extends React.Component {
    state = {
        images: [],
    }

    async componentDidMount() {
        const images = await getNaturalImages();
        this.setState({images});
    }

    render() {
        const { images } = this.state;

        if (0 === images.length) {
            return <div>Loading</div>;
        }
        
        return (
            <ImageFader 
                images={images}
            />
        );
    }
}

export default App;