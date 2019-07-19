import React from 'react';
import "./ImageFader.css"

class ImageFader extends React.Component {
    interval = null

    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            previousIndex: null,
            maximunIndex: props.images.length
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const previousIndex = this.state.currentIndex;
            let currentIndex = this.state.currentIndex + 1;
    
            if (currentIndex >= this.state.maximunIndex) {
                currentIndex = 0;
            }
    
            this.setState({ currentIndex, previousIndex });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getClassNameForIndex(index) {
        const { currentIndex, previousIndex } = this.state;
        let className = "hidden";

        if (null === previousIndex) {
            className = index === currentIndex ? "visible" : className;
        } else {
            if (index === currentIndex) {
                className = "fade-in";

            } else if (index === previousIndex) {
                className = "fade-out";
            }
        }

        return className;
    }

    render() {
        const { images } = this.props;

        if (0 === images.length) {
            return;
        }
        
        const imageElements = images.map((image, index) => {
            return (
                <img 
                    key={image.identifier}
                    alt={image.caption}
                    className={this.getClassNameForIndex(index)}
                    src={image.url}
                />
            );
        });

        return (
            <div className="image-slider">
                {imageElements}
            </div>
        );
    }
}

export default ImageFader;