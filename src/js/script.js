

const slides = document.querySelectorAll('.slider');
const sliders = document.querySelectorAll('.slides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slider = document.querySelector(".featured-slider");
const radioButtons = document.querySelectorAll('input[name="carousel-radio"]');
const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");
const rowProduct = document.querySelector('.row-popular-product');
const btnAdd = document.querySelectorAll('.btn-add');
const cartCount = document.querySelector('.basket-span');
const dropdownBasket = document.querySelector('.dropdown-basket');


let currentIndex = 0;
let slideIndex = 0;
const slidesToShow = 6;
function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.style.display = index === currentIndex ? 'block' : 'none';
  });

  radioButtons[currentIndex].checked = true;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);

prevBtn.addEventListener('click', prevSlide);


radioButtons.forEach((radio, index) => {
  radio.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});


setInterval(nextSlide, 2500);

async function dataFetch() {
  try {
    const response = await fetch('/data/data.json');
    const data = await response.json();

    data['popular-product'].forEach(d => {
      let template = `
        <div class="card-product">
          <span class="hot ${d["hot-color"]}">${d.hot}</span>
          <img data-img="${d["img-1"]}" src="${d["img-1"]}" alt="" class="product-img-1">
          <img src="${d["img-2"]}" alt="" class="product-img-2">
          <span>Snack</span>
          <div class="card-product-body">
            <h1 class="product-p-title" data-title="${d.title}">${d.title}</h1>
            <p class="product-detail">By <span>${d.detail}</span></p>
          </div>
          <div class="card-product-price">
          <p class="price" data-price="${d.price}">${d.price} <span class="old-price">${d["price-old"]}</span></p>
          <button class="btn-add" data-id="${d.id}" type="submit"><i class="fa-solid fa-cart-shopping"></i> Add</button>
          </div>
          <div class="links">
            <ul class="link">
              <li><a href="" title="SAL"><i class="fa-regular fa-heart"></i></a></li>
              <li><a href=""><i class="fa-regular fa-eye"></i></a></li>
              <li><a href=""><i class="fa-regular fa-eye"></i></a></li>
            </ul>
          </div>
        </div>
      `;

      rowProduct.innerHTML += template;
    });

    const btnAddElements = document.querySelectorAll('.btn-add');

    btnAddElements.forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute('data-id');
        const price = document.querySelector('.price').getAttribute('data-price');
        const img = document.querySelector('.product-img-1').getAttribute('data-img');
        const title = document.querySelector('.product-p-title').getAttribute('data-title');

        let productCounts = JSON.parse(localStorage.getItem('productCounts')) || {};

        if (!productCounts[id]) {
          productCounts[id] = {
            id,
            count: 1,
            len: 1,
            img,
            title,
            price
          };

          

        }else{
          productCounts[id].count++
        }
        productCounts.len++;
        ;
        let a = `${parseFloat(productCounts.len) * parseFloat(productCounts.price)}`;


        console.log(a)
        let basket = `
        <div class="basket-total">
        <div class="baskets">
        <div><img class="basket-img" src="${productCounts[id].img}" alt="Basket Image"></div>
        <div class="basket-body">
            <p>${productCounts[id].title.substring(0, 5)}</p>
            <p>${productCounts[id].count}x${productCounts[id].price}</p>
        </div>
        <div><i class="fa-solid fa-x"></i></div>
       
    </div>
    <div class="total">
     <p class="total-count">Total Count : ${a}</p>
    </div>
    </div>
                              
        `;
        dropdownBasket.innerHTML += basket;
        if (productCounts.len < 0 || productCounts.len == 0) {
          cartCount.classList.remove("active")
        } else {
          cartCount.classList.add("active")
        }
        cartCount.innerHTML = `${productCounts.len}`;
        localStorage.setItem('productCounts', JSON.stringify(productCounts));

       
      });
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

dataFetch();

const baskets=()=>{
  const template=document.createElement('template')
  template.innerHTML =``;
}



class   BasketTable extends HTMLElement{

}

window.customElements.define('basket-table' ,BasketTable)
