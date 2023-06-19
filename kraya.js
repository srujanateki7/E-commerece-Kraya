import products from "./rawdata.json"assert{type: "json"}


// Slider Function

$(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [50, 300],
        change: function (event, ui) {
            document.querySelector("#min-amount").innerText = `$ ${ui.values[0]}`
            document.querySelector("#max-amount").innerText = `$ ${ui.values[1]}`

            updateProductsOnPrice(ui.values[0], ui.values[1]); ///  Range 

        }

    });


    // NEWEST-FIRST FILTER
    $("#newest-first").click(function () {
        console.log(products)
        // this.style.color = "#FF3465";
        // this.style.textDecoration = "underline";
        const newProducts = products.filter(function (eachproduct) {
            return eachproduct.new;

        });
        console.log(newProducts);
        $("#elements").empty();
        tiles_render(newProducts);


    })

    // FILTERING DATA BY BRANDS 
    $(document).ready(function () {
        var checksBoxes = document.querySelector(".mobileBrands")
        for (var i = 0; i < checksBoxes.length; ++i) {
            checksBoxes[i].addEventListener("click", function () {
                var checks = []
                for (var j = 0; j < checksBoxes.length; ++j) {
                    if (checksBoxes[j].checked) checks.push(checksBoxes[j].name)
                }
                var filteredBrands = []
                for (let i = 0; i < products.length; ++i) {
                    for (let j = 0; j < checks.length; ++j) {
                        if (products[i].Brand.toLowerCase() == checks[j].toLowerCase()) {
                            console.log(products[i]);
                            filteredBrands.push(products[i])
                        }
                    }
                }
                document.querySelector("#elements").innerHTML = ''
                filteredBrands.length == 0 ? tiles_render(products) : tiles_render(filteredBrands)
            })
        }
    });


});



// PRODUCTS DISPLAYS ACCORDING TO SILDE RANGER WITH MAX AND MIN WIDTH

function updateProductsOnPrice(lowPrice, highPrice) {
    console.log(lowPrice, highPrice);
    const filteredProducts = products.filter(function (eachproduct) {
        return eachproduct.originalprice > lowPrice && eachproduct.originalprice < highPrice;
    });
    console.log(filteredProducts);
    document.querySelector("#elements").innerHTML = ''
    tiles_render(filteredProducts)
}

// Star Rating function
const stars = (s) => {
    let starRating = ''
    for (let icon = 0; icon < 5; icon++) {
        if (icon < s) {
            starRating += ` <i class="fa-solid fa-star " style="color:#FF3465; font-size:16px;"></i> `
        }
        else {
            starRating += `<i class="fa-regular fa-star"></i>`
        }
    }

    return starRating;
}


// Tiles Render 
function tiles_render(products) {

    for (let i = 0; i < products.length; i++) {
        const data = `
                <div class="product-tiles">
                <div class="sticker-icon">
                        <div>
                            <p id="new">${products[i]['new'] ? 'New' : ''}  </p>
                            <p id="sale">${products[i]['sale'] ? 'Sale' : ''}  </p>
                        </div>
                        <div class="heart-icon">
                            <i  class="fa-regular fa-heart fa-lg "></i>
                        </div>
                </div>
                  
                        <img src="${products[i].img}" alt="mobileimages">
                   
                    <div class="btns">
                            <button type="button" class="btn" onclick="cart()">ADD TO CART</button>
                            <button type="button"class="btn-one">VIEW GALLERY</button>
                    </div>
                    <div class="models-text">
                        <h4 class="product-name">${products[i].name}</h4>
                            <div class="star-icon">
                            
                            ${stars(products[i]['rating'])}(${products[i].review})

                            </div>
                            <p class="price-text"><b>$${products[i].originalprice}</b> 
                            <s class="strike-num">$${products[i].discountedprice}</s> 
                             <span class="offer-num"><b>${products[i].offer}</b></span></p>
                        <div class="circle">
                            <span class="circle_one"></span>
                            <span class="circle_two"></span>
                            <span class="circle_three"></span>       
                        </div>
                    </div>
                </div>
                `;
        document.querySelector("#elements").innerHTML += data;
    }
}
tiles_render(products);



// SEARCH PRODUCT FOR DESKTOP
var input = document.querySelector("#search-text");
console.log(products);
input.addEventListener("input", function () {
    var filter_data = []
    for (let i = 0; i < products.length; i++) {
        if (products[i].Brand.toLowerCase() == input.value.toLowerCase()) {
            console.log(products[i])
            filter_data.push(products[i])
        }
    }
    console.log(input.value);
    console.log(filter_data);
    document.querySelector("#elements").innerHTML = ''
    tiles_render(filter_data);
});


//SEARCH PRODUCT FOR MOBILE 
var mob = document.querySelector("#search-box-text")
console.log(products);
mob.addEventListener("input", function () {
    var filter_data_mobile = []
    for (let i = 0; i < products.length; i++) {
        if (products[i].Brand.toLowerCase() == mob.value.toLowerCase()) {
            console.log(products[i])
            filter_data_mobile.push(products[i])
        }
    }
    console.log(mob.value);
    console.log(filter_data_mobile);

    document.querySelector("#elements").innerHTML = ''
    tiles_render(filter_data_mobile);

});



// WISHLIST FUNCTION 
let wl = document.querySelector("#heart-num")    ///...........DESKTOP ID ............//
let wlist = document.querySelector("#heartnum") //........MOBILE ID ........///
let count = 0;
let hrtcnt = document.querySelector(".heart-icon")
for (let i = 0; i < hrtcnt.length; i++) {
    hrtcnt[i].addEventListener("click", function (c) {
        c.target.classList.toggle("pink");
        c.target.classList.toggle("fa-regular");
        c.target.classList.toggle("fa-solid");
        if (c.target.classList.contains("pink")) {

            count++
        }
        else {
            count--
        }
        wl.innerHTML = count;
        wlist.innerHTML = count;

    });
    console.log(count);

}

// PRICE LOW TO HIGH FILTER FUNCTION

document.querySelector("#priceLowToHigh").addEventListener("click", function () {
    // this.style.color = "#FF3465";
    // this.style.textDecoration = "underline";
    var price_L_H = products;
    var price = price_L_H.sort(((l, h) => l.discountedprice - h.discountedprice))
    console.log(price);
    document.querySelector("#elements").innerHTML = " ";
    tiles_render(price);
});




function init() {

    //  RATINGS FOR PRODUCTS
    document.querySelector('#ratingfilter').addEventListener("click", function () {
        // this.style.color = "#FF3465";
        // this.style.textDecoration = "underline";
        function check(low, high) {
            if (low.rating < high.rating) {
                return 1
            } else if (low.rating > high.rating) {
                return -1
            }
            return 0
        }
        let ratedData = products
        ratedData.sort(check)
        document.querySelector("#elements").innerHTML = ""
        tiles_render(ratedData)

    });




}


window.onload = function () {
    init();


};



































