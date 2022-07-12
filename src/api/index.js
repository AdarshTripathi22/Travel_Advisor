import axios from "axios";

export const getPlacesData = async (type, sw, ne)=> {
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, 
          {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng
            },
            headers: {
              'X-RapidAPI-Key': '3422120f46msh790b9377f5ae61bp1deb9cjsn13f2ed61e340',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          }
          );

        return data;
    } catch (error) {
        console.log(error);
    }
}