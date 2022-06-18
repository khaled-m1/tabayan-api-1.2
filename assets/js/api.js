const apikey = "563492ad6f917000010000016d397bd83b7f45e4a894d80303c9ecb8";
const input = document.querySelector("input");
const search_btn = document.querySelector(".search_btn");
const showmore_btn = document.querySelector(".showmore");

let page_num = 1;
let search_text = "";
let search = false;

input.addEventListener("input", (event) => {
  event.preventDefault();
  search_text = event.target.value;
});

search_btn.addEventListener("click", () => {
  if (input.value === "") {
    alert("اكتب في خانه البحث :)");
    return;
  }
  cleargallery();
  search = true;
  SearchPhotos(search_text, page_num);
});

function cleargallery() {
  document.querySelector(".display_images").innerHTML = "";
  page_num = 1;
}

async function CuratedPhotos(page_num) {
  // fetch the data from api
  const data = await fetch(
    `https://api.pexels.com/v1/curated?page=${page_num}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: apikey,
      },
    }
  );
  const response = await data.json();
  console.log(response);

  display_images(response);
}

function display_images(response) {
  response.photos.forEach((image) => {
    const photo = document.createElement("div");
    photo.innerHTML = `<img src=${image.src.large}>
        <figcaption> Photo By: ${image.photographer}📸</figcaption>`;
    document.querySelector(".display_images").appendChild(photo);
  });
}

async function SearchPhotos(query, page_num) {
  const data = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&page=${page_num}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: apikey,
      },
    }
  );
  const response = await data.json();
  console.log(response);

  display_images(response);
}

showmore_btn.addEventListener("click", () => {
  if (!search) {
    page_num++;
    CuratedPhotos(page_num);
  } else {
    if (search_text.value === "") return;
    page_num++;
    SearchPhotos(search_text, page_num);
  }
});

CuratedPhotos(page_num);
