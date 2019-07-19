import Axios from "axios";

const API_KEY = "DEMO_KEY";
const BASE_API_URI = "https://api.nasa.gov";
const BASE_IMAGE_URI = "https://epic.gsfc.nasa.gov/archive/natural";

const getNaturalImages = () => {
    return Axios.get("/EPIC/api/natural", {
        baseURL: BASE_API_URI,
        params: {
            api_key: API_KEY
        }
    }).then((response) => {
        return response.data.map((image) => {
            const { caption, identifier } = image;

            return { 
                caption,
                identifier,
                url: getImageUrl(image)
            };
        });
    });
};

const getImageUrl = ({ date, image }) => {
    const dateInfo = new Date(date);
    
    const year = dateInfo.getFullYear();
    const month = ("0" + (dateInfo.getMonth() + 1)).slice(-2);
    const day = ("0" + dateInfo.getDate()).slice(-2);

    return BASE_IMAGE_URI + "/" + year + "/" + month + "/" + day + "/png/" + image + ".png";
};

export default getNaturalImages;