const model = document.getElementById("model");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const links = document.querySelectorAll(".nav-link");
const input1 = document.getElementById("input1");
const searchWords = document.getElementById("searchWords");
const error = document.getElementById("error");
const rowData = document.getElementById("data").querySelector(".row");

let allRecipes = [];
let singleRecipe;

async function getAllRecipes(food) {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${food}`);
    const data = await response.json();
    console.log(data)
    if (data.recipes && data.recipes.length > 0) {
      allRecipes = data.recipes;
      displayAllRecipes();
    } else {
      rowData.innerHTML = `<p class="text-center text-danger fs-5 mt-4">No recipes found for "${food}".</p>`;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    rowData.innerHTML = `<p class="text-center text-danger fs-5 mt-4">Failed to load recipes. Please try again later.</p>`;
  }
}

function displayAllRecipes() {
  let data = '';
  allRecipes.forEach(recipe => {
    data += `
      <div class="col-lg-4 col-md-6">
        <div class="card">
          <img src="${recipe.image_url}" alt="${recipe.title}" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getSingleRecipe(${recipe.recipe_id})" />
          <div class="card-body">
            <h5 class="card-title text-truncate">${recipe.title}</h5>
            <p class="card-text text-muted mb-0">${recipe.publisher}</p>
          </div>
        </div>
      </div>
    `;
  });
  rowData.innerHTML = data;
}

// Load default recipes
window.addEventListener('DOMContentLoaded', () => {
  getAllRecipes('pizza');
});

// Event Listeners
links.forEach(link => {
  link.addEventListener('click', (e) => {
    getAllRecipes(e.target.innerHTML)
  });
});


async function getSingleRecipe(id) {
  try {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    let data = await response.json()
    // console.log(data)
    if (data.recipe) {
      singleRecipe = data.recipe
      console.log(singleRecipe)
      displaySingleRecipe()
    }
    else {
      rowData.innerHTML = `<p class="text-center text-danger fs-5 mt-4">No recipes found for "${food}".</p>`;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    rowData.innerHTML = `<p class="text-center text-danger fs-5 mt-4">Failed to load recipes. Please try again later.</p>`;
  }
}

function displaySingleRecipe(){
      exampleModalLabel.innerHTML= singleRecipe.title

      let ingingredientsList=''
      for(let i=0;i<singleRecipe.ingredients.length;i++){
         ingingredientsList+=`
               <li>${singleRecipe.ingredients[i]}</li>
         `
      }
      model.innerHTML=`
           <img src='${singleRecipe.image_url}' class="w-100">
           <h2>ingredients</h2>
           <ul>
             ${ingingredientsList}
           </ul>
      `
}


function setActiveLink(clickedLink) {
  links.forEach(link => {
    link.classList.remove("active");
  });

  clickedLink.classList.add("active");
}

// Load default active
window.addEventListener('DOMContentLoaded', () => {
  links[0].classList.add("active");
  getAllRecipes('pizza');
});

// Navbar click
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    setActiveLink(e.target);

    const food = e.target.getAttribute("data-food");
    getAllRecipes(food);
  });
});