import { pixabayAPI } from "./js/fetch"
import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const btnSearch = document.querySelector(".search-form-button");
const input = document.querySelector(".search-form-input");
const gallery = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

let page = 0;
let perPage = 40;
let inputValue = input.value;


btnSearch.addEventListener('click', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);

  function onSearch(event) {
   event.preventDefault()
   inputValue = input.value.trim();
  if (!inputValue) {
    gallery.innerHTML = ""; 
    return
  }
  page = 1;
  pixabayAPI(inputValue, page, perPage)
    .then(data => {
      //let totalPages = data.totalHits / perPage;
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.');
        gallery.innerHTML = "";
        btnLoadMore.hidden = true;
        return;
      } else {
        gallery.innerHTML = "";
        markupGallery(data.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${data.totalHits} images.`
        );
        gallerySimpleLightbox.refresh();
        btnLoadMore.hidden = false;
        
        // const { height: cardHeight } = document.
        //   querySelector(".gallery").
        //   firstElementChild.getBoundingClientRect();

        //  window.scrollBy({
        //  top: cardHeight * 2,
        //  behavior: "smooth",
        //  });
        
      }
    }).catch(err => console.log(err));
    
}

function onLoadMore() {
  page += 1
  inputValue = input.value.trim();
  gallery.innerHTML = "";
  
 

  pixabayAPI(inputValue, page, perPage).then(data => {
    markupGallery(data.hits);
    let totalPages = data.totalHits / perPage;
    gallerySimpleLightbox.refresh();
    
    
    if (page >= totalPages) {
      btnLoadMore.hidden = true;
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.") 
    }
    //console.log(data)
  })
    .catch(err => console.log(err))
  
}

function markupGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
  `<div class="photo-card">
  <a href="${largeImageURL}"><img class="photo"  src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info_item">
      <b>Likes:</b><span class="info_item-api">${likes}</span>
    </p>
    <p class="info_item">
      <b>Views:</b><span class="info_item-api">${views}</span>
    </p>
    <p class="info_item">
      <b>Comments:</b><span class="info_item-api">${comments}</span>
    </p>
    <p class="info_item">
      <b>Downloads:</b><span class="info_item-api">${downloads}</span>
    </p>
  </div>
</div>`).join('');
  gallery.insertAdjacentHTML("beforeend",markup);
}



