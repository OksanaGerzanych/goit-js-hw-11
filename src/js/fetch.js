import axios from "axios";

async function pixabayAPI(inputValue, page=1) {
 
  const response = await axios.get(`https://pixabay.com/api/?key=32945062-68d6d40c8d925b295193ffb26&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    return response.data;
}

export { pixabayAPI };
    
//     return await fetch(`https://pixabay.com/api/?key=32945062-68d6d40c8d925b295193ffb26&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNum}&per_page=40`)
//  .then(response => {
//  if (!response.ok) {
//  throw new Error(response.statusText);
//   }
// return response.json();
//  });
   



