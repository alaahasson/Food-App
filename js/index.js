
var allItems = [];
var meals = [];
var area = [];
var goArea = [];
var Ingredients = [];
var mysearch = [];
var goMeal = [];
var categoryMeal = [];
var goIngredients = [];
var row = document.getElementById("rowData");


$(".nav-logo img").click(function () {
    location.reload(true);
})

displayMain("").then(() => {
    $(".loading-screen").fadeOut(500, () => {
        $("body").css("overflow", "visible")
    })
})

var isOpen = $(".header-nav").css("left");
console.log(isOpen);

function reset() {
    if (isOpen == "0px") {
        console.log("yes");
        $(".nav-open ul li").animate({
            opacity: "0",
            paddingTop: "500px"
        }, 200)
    }
    else {
        console.log("is closed");
    }
}
$(".menu i").click(function () {
    console.log("hello");
    $(".header-nav").toggleClass('animate');
    $(".nav-open").toggleClass('animate');
    $(".fa-align-justify").toggleClass("fa-times");
    reset();
    $(".nav-open .item1").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1100)
    $(".nav-open .item2").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1200)
    $(".nav-open .item3").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1300)
    $(".nav-open .item4").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1400)
    $(".nav-open .item5").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1500)

}

)

// home api 
async function displayMain(category) {
    var getData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`);
    console.log(getData);
    finalResult = await getData.json();
    console.log(finalResult);
    allItems = finalResult.meals;
    console.log(allItems);
    showItems();
    $(".loading-screen").fadeOut(500);
}

function error404() {
    cartona4 = `<h1 class="text-white text-center" >this items not find</h1>`
    document.getElementById('rowDate').innerHTML = cartona4;

};
// search api
async function searchBox(q) {
    mysearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    mysearch = await mysearch.json()
    console.log(mysearch);
    mysearch = mysearch.meals;
    console.log(mysearch);
    if (mysearch == null) {
        console.log("eroor 404");
        error404();
    }
    else {
        displaySearch()
    }
    // $(".loading-container").fadeOut(400)
    // return meals
}


function displaySearch() {
    let cartona4 = ``;
    for (var i = 0; i < mysearch.length; i++) {
        cartona4 += `
        <div class="col-md-3">
            <div onclick="getMeal('${mysearch[i].idMeal}')"  class="item rounded-1 position-relative" >
                <img height="200px" src="${mysearch[i].strMealThumb}" class="w-100 pb-2">
            <div class="layer">
                 <div class="item-caption">
                     <h2 class="pt-5">${mysearch[i].strMeal}</h2>
              </div>
        </div>
        </div>
    </div>
`
    }
    document.getElementById('rowDate').innerHTML = cartona4;

}


searchBox("egg");


// category api 
async function filterByCategory(category) {
    $(".loading-container").fadeIn(100)

    meals = await fetch(`https://www.themealdb.com/api/json/v1/1/${category}.php`)
    meals = await meals.json()
    console.log(meals);
    meals = meals.categories;
    console.log(meals);
    $(".loading-container").fadeOut(500)
    displayMeals(meals);
}

// go category item on click
async function goToCategory(category) {
    categoryMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    categoryMeal = await categoryMeal.json()
    console.log(categoryMeal);
    categoryMeal = categoryMeal.meals;
    displayMyMeals()
    $(".loading-container").fadeOut(500)
}

displayMain("")

// area api
async function listArea(itemCode) {
    $(".loading-container").fadeIn(100)
    area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${itemCode}=`)
    area = await area.json()
    area = area.meals;
    console.log(area);
    displayArea()
    $(".loading-container").fadeOut(500)
}

async function goToArea(area) {
    // $(".loading-container").fadeIn(100)
    goArea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    goArea = await goArea.json()
    goArea = goArea.meals.slice(0, 20);
    console.log(goArea);
    displayMyArea()
    $(".loading-container").fadeOut(500)
}

// Ingredients api
async function listIngredients(itemCode) {
    $(".loading-container").fadeIn(100)
    Ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${itemCode}=`)
    Ingredients = await Ingredients.json()
    Ingredients = Ingredients.meals;
    console.log(Ingredients);
    displayIngredients()
    $(".loading-container").fadeOut(500)
}

// go to Ingredients api 
async function goToIngredient(mealName) {
    $(".loading-container").fadeIn(100)
    goIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    goIngredients = await goIngredients.json()
    goIngredients = goIngredients.meals;
    displayMyIngredients();
    $(".loading-container").fadeOut(500)
}

function displayMyIngredients() {
    let cartona1 = ``;
    for (var i = 0; i < goIngredients.length; i++) {
        cartona1 += `
    <div class="col-md-3">
    <div  class="item rounded-1 position-relative " onclick="getMeal('${goIngredients[i].idMeal}')">
        <img height="200px" src="${goIngredients[i].strMealThumb}" class="w-100 pb-2">
        <div class="layer">
                 <div class="item-caption">
                     <h2 class="pt-5">${goIngredients[i].strMeal}</h2>
                </div>
        </div>
        </div>
    </div>
`
    }
    document.getElementById('rowDate').innerHTML = cartona1;
}



// display Home
function showItems() {
    let cartona = ``;
    for (var i = 0; i < allItems.length; i++) {
        cartona += `
    <div class="col-md-3">
        <div onclick="getMeal('${allItems[i].idMeal}')"  class="item rounded-1 position-relative" >
        <img height="200px" src="${allItems[i].strMealThumb}" class="w-100 pb-2">
        <div class="layer">
                 <div class="item-caption">
                     <h2 class="pt-5">${allItems[i].strMeal}</h2>
                </div>
        </div>
        </div>
    </div>
`
    }
    document.getElementById('rowDate').innerHTML = cartona;

}

// display category
function displayMeals(meals) {
    let cartona1 = ``;
    for (var i = 0; i < meals.length; i++) {
        cartona1 += `
    <div class="col-md-3">
    <div class="item rounded-1 position-relative "onclick="goToCategory('${meals[i].strCategory}')" >
        <img height="200px" src="${meals[i].strCategoryThumb}" class="w-100 pb-2">
        <div class="layer">
                 <div class="item-caption">
                     <h2 class="pt-5">${meals[i].strCategory}</h2>
                     <p> ${meals[i].strCategoryDescription} </P>
                </div>
        </div>
        </div>
    </div>
`
    }
    document.getElementById('rowDate').innerHTML = cartona1;

}


function displayMyMeals() {
    var cartona7 = ``;
    for (var i = 0; i < categoryMeal.length; i++) {
        cartona7 += `
    <div class="col-md-3">
    <div  class="item rounded-1 position-relative " onclick="getMeal('${categoryMeal[i].idMeal}')">
        <img height="200px" src="${categoryMeal[i].strMealThumb}" class="w-100 pb-2">
        <div class="layer">
                 <div class="item-caption">
                     <h2 class="pt-5">${categoryMeal[i].strMeal}</h2>
                </div>
        </div>
        </div>
    </div>
`
    }
    document.getElementById('rowDate').innerHTML = cartona7;
}

function displayMyArea() {
    let cartona1 = ``;
    for (var i = 0; i < goArea.length; i++) {
        cartona1 += `
    <div class="col-md-3">
    <div  class="item rounded-1 position-relative " onclick="getMeal('${goArea[i].idMeal}')">
        <img height="200px" src="${goArea[i].strMealThumb}" class="w-100 pb-2">
        <div class="layer">
                 <div class="item-caption">
                     <h2 class="pt-5">${goArea[i].strMeal}</h2>
                </div>
        </div>
        </div>
    </div>
`
    }
    document.getElementById('rowDate').innerHTML = cartona1;
}












async function getMeal(mealID) {
    $(".loading-container").fadeIn(100)
    goMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    goMeal = await goMeal.json()
    console.log(goMeal);
    displayMeal(goMeal.meals[0])
    $(".loading-container").fadeOut(500)
}

function displayMeal(goMeal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (goMeal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${goMeal[`strMeasure${i}`]} ${goMeal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = goMeal.strTags?.split(",") ////////////////////////////////////////////////////////////////////////
    let tagsStr = "" ///////////////////////////////////////////////////////////////////////////////////////////
    for (let i = 0; i < tags?.length; i++) { ///////////////////////////////////////////////////////////////////
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>` ////////////////////////////
    } ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    let str = `
    <div class="col-md-4 myM text-white">
					<img class="w-100" src="${goMeal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${goMeal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white text-left">
					<h2>Instructions</h2>
					<p>${goMeal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${goMeal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${goMeal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex " id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${goMeal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${goMeal.strYoutube}">Youtub</a>
				</div>`





    document.getElementById("rowDate").innerHTML = str;
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}

// display area
function displayArea() {
    let cartona2 = ``;
    for (var i = 0; i < area.length; i++) {
        cartona2 += `
        <div class="col-md-3">
              <div class="area">
                    <div class="items"  onclick="goToArea('${area[i].strArea}')">
                        <i class="fas fa-city py-2"></i>
                        <h2 class="text-white">${area[i].strArea}</h2>
                       
                    </div>
                </div>

            </div>
`
    }
    document.getElementById('rowDate').innerHTML = cartona2;

}

// display Ingredients
function displayIngredients() {
    let cartona3 = ``;
    for (var i = 0; i < 20; i++) {
        cartona3 += `
        <div class="col-md-3">
              <div class="area">
                    <div class="items" onclick="goToIngredient('${Ingredients[i].strIngredient}')"</di>
                        <i class="fas fa-hamburger"></i>
                        <h5 class="text-white">${Ingredients[i].strIngredient}</h5>
                        <p>${Ingredients[i].strDescription.split(" ").splice(0, 20).join(" ")}</p>
                    </div>
                </div>

            </div>
`
    }
    document.getElementById('rowDate').innerHTML = cartona3;

}






//selector nav 
var links = document.querySelectorAll(".nav-item a");
rowSearch = ``;
for (i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        var foodCode = e.target.getAttribute('data-list')
        if (foodCode == "categories") {
            rowSearch = ``
            console.log(foodCode + "this is category");
            filterByCategory(foodCode)
        }

        if (foodCode == "search") {
            console.log('this is search row function');
            rowSearch = `
           <div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input class="form-control " type="text" maxlength="1" id="letter"
                    placeholder="search By First Letter...">
            </div>`

            $("#searchInput").keyup(function (e) {
                console.log(e)
            })
            console.log();

        }


        else if (foodCode == "a") {
            rowSearch = ``
            listArea(foodCode)
            console.log("this is a");
        }
        else if (foodCode == "i") {
            rowSearch = ``
            listIngredients(foodCode)
            console.log("this is i");
        }
        // else if (foodCode == "contact") {
        //     $(".loading-container").fadeOut(500)
        //     console.log("this is contact");

        //     row.innerHTML = `
        //     <section id="contact" class="container myM w-75 mx-auto mb-5 ">
        //     <div class="p-2">
        //         <h2 class="text-light mb-5">ContacUs...</h2>
        //         <div class="row">
        //             <div class="col-md-6">
        //                 <div class="form-group">
        //                     <input class="form-control shadow " onkeyup="validation()" id="name"
        //                         placeholder="Enter Your Name">
        //                     <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
        //                         Special Characters and Numbers not allowed
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class="col-md-6">
        //                 <div class="form-group">
        //                     <input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
        //                     <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
        //                         Enter valid email. *Ex: xxx@yyy.zzz
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class="col-md-6">
        //                 <div class="form-group">
        //                     <input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
        //                     <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
        //                         Enter valid Phone Number
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class="col-md-6">
        //                 <div class="form-group">
        //                     <input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
        //                     <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
        //                         Enter valid Age
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class="col-md-6">
        //                 <div class="form-group">
        //                     <input onkeyup="validation()" class="form-control" type="password" id="password"
        //                         placeholder="Enter Password">
        //                     <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
        //                         Enter valid password *Minimum eight characters, at least one letter and one number:*
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class="col-md-6">
        //                 <div class="form-group">
        //                     <input onkeyup="validation()" class="form-control" type="password" id="rePassword"
        //                         placeholder="Enter RePassword">
        //                     <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
        //                         Enter valid Repassword
        //                     </div>
        //                 </div>
        //             </div>


        //         </div>

        //         <button type="submit" disabled id="submitBtn" class="btn btn-outline-danger">Submit</button>
        //     </div>

        // </section>`
        //     userName = document.getElementById("name"),
        //         userEmail = document.getElementById("email"),
        //         userPhone = document.getElementById("phone"),
        //         userAge = document.getElementById("age"),
        //         userPassword = document.getElementById("password"),
        //         userRePassword = document.getElementById("rePassword"),
        //         userNameAlert = document.getElementById("namealert"),
        //         userEmailAlert = document.getElementById("emailalert"),
        //         userPhoneAlert = document.getElementById("phonealert"),
        //         userAgeAlert = document.getElementById("agealert"),
        //         userpasswordAlert = document.getElementById("passwordalert"),
        //         userRepasswordAlert = document.getElementById("repasswordalert");

        //     userName.addEventListener("focus", () => {
        //         nameToached = true
        //     })
        //     userEmail.addEventListener("focus", () => {
        //         emailToached = true
        //     })
        //     userPhone.addEventListener("focus", () => {
        //         phoneToached = true
        //     })
        //     userAge.addEventListener("focus", () => {
        //         ageToached = true
        //     })
        //     userPassword.addEventListener("focus", () => {
        //         passwordToached = true
        //     })
        //     userRePassword.addEventListener("focus", () => {
        //         repasswordToached = true
        //     })
        //     document.getElementById("rowData") = row;
        // }   


        if (foodCode == "contact") {

            row = `
            <section class="contact-sec w-100 vh-100 ">
            <div class="contact w-75 mx-auto mb-5">
                <div class="p-2">
                    <h2 class="text-center pb-3 text-white">Contact</h2>
                    <div class="row">

                        <div class="col-md-6">
                            <div class="left">
                                <div class="form-group">
                                    <input class="form-control shadow-sm " onkeyup="validation()" id="name"
                                        placeholder="Enter Your Name">
                                    <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                                        Special Characters and Numbers not allowed
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="right">
                                <div class="form-group">
                                    <input onkeyup="validation()" class="form-control shadow-sm" id="email"
                                        placeholder="Enter Email">
                                    <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                                        Enter valid email. *Ex: xxx@yyy.zzz
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="left py-4">
                                <div class="form-group">
                                    <input onkeyup="validation()" class="form-control" id="phone"
                                        placeholder="Enter phone">
                                    <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
                                        Enter valid Phone Number
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="right py-4">
                                <div class="form-group">
                                    <input onkeyup="validation()" class="form-control" id="age"
                                        placeholder="Enter Age">
                                    <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
                                        Enter valid Age
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="left">
                                <div class="form-group">
                                    <input onkeyup="validation()" class="form-control" type="password" id="password"
                                        placeholder="Enter Password">
                                    <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
                                        Enter valid password *Minimum eight characters, at least one letter and one
                                        number:*
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6">
                            <div class="right">
                                <div class="form-group">
                                    <input onkeyup="validation()" class="form-control" type="password"
                                        id="rePassword" placeholder="Enter RePassword">
                                    <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
                                        Enter valid Repassword
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <button type="submit" disabled="" id="submitBtn"
                        class="btn btn-outline-danger mt-3 m-auto d-flex">Submit</button>
                </div>
            </div>
        </section>`


            userName = document.getElementById("name"),
                userEmail = document.getElementById("email"),
                userPhone = document.getElementById("phone"),
                userAge = document.getElementById("age"),
                userPassword = document.getElementById("password"),
                userRePassword = document.getElementById("rePassword"),
                userNameAlert = document.getElementById("namealert"),
                userEmailAlert = document.getElementById("emailalert"),
                userPhoneAlert = document.getElementById("phonealert"),
                userAgeAlert = document.getElementById("agealert"),
                userpasswordAlert = document.getElementById("passwordalert"),
                userRepasswordAlert = document.getElementById("repasswordalert");

            function contactVlaid() {
                userName.addEventListener("focus", () => {
                    nameToached = true
                })
                userEmail.addEventListener("focus", () => {
                    emailToached = true
                })
                userPhone.addEventListener("focus", () => {
                    phoneToached = true
                })
                userAge.addEventListener("focus", () => {
                    ageToached = true
                })
                userPassword.addEventListener("focus", () => {
                    passwordToached = true
                })
                userRePassword.addEventListener("focus", () => {
                    repasswordToached = true
                })

            }

            let nameToached = false,
                emailToached = false,
                phoneToached = false,
                ageToached = false,
                passwordToached = false,
                repasswordToached = false;


            function validation() {

                if (nameToached) {
                    if (userNameValid()) {
                        userName.classList.remove("is-invalid")
                        userName.classList.add("is-valid")
                        $("#namealert").slideUp(500, function () {
                            userNameAlert.classList.replace("d-block", "d-none")
                        });
                        // userNameAlert.classList.replace("d-block", "d-none")
                        // userNameAlert.classList.replace("d-block", "d-none")

                    } else {

                        userName.classList.replace("is-valid", "is-invalid")
                        userNameAlert.classList.replace("d-none", "d-block")
                        $("#namealert").slideDown(500)
                        // userName.classList.replace("is-valid", "is-invalid")
                        // userNameAlert.classList.replace("d-none", "d-block")
                    }
                }

                if (emailToached) {
                    if (userEmailValid()) {
                        $("#emailalert").slideUp(500, function () {
                            userNameAlert.classList.replace("d-block", "d-none")
                            userEmail.classList.remove("is-invalid")
                            userEmail.classList.add("is-valid")
                            userEmailAlert.classList.replace("d-block", "d-none")
                            userEmailAlert.classList.replace("d-block", "d-none")
                        });
                        // userEmail.classList.remove("is-invalid")
                        // userEmail.classList.add("is-valid")
                        // userEmailAlert.classList.replace("d-block", "d-none")
                        // userEmailAlert.classList.replace("d-block", "d-none")
                    } else {

                        userEmail.classList.replace("is-valid", "is-invalid")
                        userEmailAlert.classList.replace("d-none", "d-block")

                        $("#emailalert").slideDown(500);
                        // userEmail.classList.replace("is-valid", "is-invalid")
                        // userEmailAlert.classList.replace("d-none", "d-block")
                    }
                }

                if (phoneToached) {
                    if (userPhoneValid()) {
                        $("#phonealert").slideUp(500, function () {
                            userPhone.classList.remove("is-invalid")
                            userPhone.classList.add("is-valid")
                            userPhoneAlert.classList.replace("d-block", "d-none")
                            userPhoneAlert.classList.replace("d-block", "d-none")
                        });
                        // userPhone.classList.remove("is-invalid")
                        // userPhone.classList.add("is-valid")
                        // userPhoneAlert.classList.replace("d-block", "d-none")
                        // userPhoneAlert.classList.replace("d-block", "d-none")
                    } else {

                        userPhone.classList.replace("is-valid", "is-invalid")
                        userPhoneAlert.classList.replace("d-none", "d-block")
                        $("#phonealert").slideDown(500);
                        // userPhone.classList.replace("is-valid", "is-invalid")
                        // userPhoneAlert.classList.replace("d-none", "d-block")
                    }
                }

                if (ageToached) {
                    if (userAgeValid()) {
                        $("#agealert").slideUp(500, function () {
                            userAge.classList.remove("is-invalid")
                            userAge.classList.add("is-valid")
                            userAgeAlert.classList.replace("d-block", "d-none")
                            userAgeAlert.classList.replace("d-block", "d-none")
                        });
                        // userAge.classList.remove("is-invalid")
                        // userAge.classList.add("is-valid")
                        // userAgeAlert.classList.replace("d-block", "d-none")
                        // userAgeAlert.classList.replace("d-block", "d-none")
                    } else {
                        userAge.classList.replace("is-valid", "is-invalid")
                        userAgeAlert.classList.replace("d-none", "d-block")
                        $("#agealert").slideDown(500)
                    }
                }

                if (passwordToached) {
                    if (userPasswordValid()) {
                        userPassword.classList.remove("is-invalid")
                        userPassword.classList.add("is-valid")
                        userpasswordAlert.classList.replace("d-block", "d-none")
                        userpasswordAlert.classList.replace("d-block", "d-none")
                    } else {
                        userPassword.classList.replace("is-valid", "is-invalid")
                        userpasswordAlert.classList.replace("d-none", "d-block")
                    }
                }

                if (repasswordToached) {
                    if (userRePasswordValid()) {

                        userRePassword.classList.remove("is-invalid")
                        userRePassword.classList.add("is-valid")
                        $("#passwordalert").slideUp(700, function () {
                            userRepasswordAlert.classList.replace("d-block", "d-none")
                            userRepasswordAlert.classList.replace("d-block", "d-none")
                        });
                        // userRePassword.classList.remove("is-invalid")
                        // userRePassword.classList.add("is-valid")
                        // userRepasswordAlert.classList.replace("d-block", "d-none")
                        // userRepasswordAlert.classList.replace("d-block", "d-none")
                    } else {
                        userRePassword.classList.replace("is-valid", "is-invalid")
                        userRepasswordAlert.classList.replace("d-none", "d-block")
                        $("#passwordalert").slideDown(500)
                    }
                }

                if (userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()) {
                    document.getElementById("submitBtn").removeAttribute("disabled")
                } else {
                    document.getElementById("submitBtn").setAttribute("disabled", "true")
                }

            }


            function userNameValid() {
                return /^[a-zA-Z ]+$/.test(userName.value)
            }

            function userEmailValid() {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
            }

            function userPhoneValid() {
                return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
            }

            function userAgeValid() {
                return /^[1-9][0-9]?$|^100$/.test(userAge.value)
            }

            function userPasswordValid() {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
            }

            function userRePasswordValid() {
                return userPassword.value == userRePassword.value
            }


        }
        document.getElementById("rowSearch").innerHTML = rowSearch;
        document.getElementById("rowDate").innerHTML = row;
        $("#searchInput").keyup(function (e) {
            var wordOfSearch = e.target.value;
            console.log(wordOfSearch)
            searchBox(wordOfSearch)
        })
        $("#letter").keyup(function (e) {
            var letterOfSearch = e.target.value;
            console.log(letterOfSearch)
            searchBox(letterOfSearch)
        })
        contactVlaid()
    })

}


function showContact() {
    let cartona4 = ` <section class="contact-sec w-100 vh-100 ">
    <div class="contact w-75 mx-auto mb-5">
        <div class="p-2">
            <h2 class="text-center pb-3 text-white">Contact</h2>
            <div class="row">

                <div class="col-md-6">
                    <div class="left">
                        <div class="form-group">
                            <input class="form-control shadow-sm " onkeyup="${validation()}" id="name"
                                placeholder="Enter Your Name">
                            <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                                Special Characters and Numbers not allowed
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="right">
                        <div class="form-group">
                            <input onkeyup="${validation()}" class="form-control shadow-sm" id="email"
                                placeholder="Enter Email">
                            <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                                Enter valid email. *Ex: xxx@yyy.zzz
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="left py-4">
                        <div class="form-group">
                            <input onkeyup="${validation()}" class="form-control" id="phone"
                                placeholder="Enter phone">
                            <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
                                Enter valid Phone Number
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="right py-4">
                        <div class="form-group">
                            <input onkeyup="${validation()}" class="form-control" id="age"
                                placeholder="Enter Age">
                            <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
                                Enter valid Age
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="left">
                        <div class="form-group">
                            <input onkeyup="${validation()}" class="form-control" type="password" id="password"
                                placeholder="Enter Password">
                            <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
                                Enter valid password *Minimum eight characters, at least one letter and one
                                number:*
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-md-6">
                    <div class="right">
                        <div class="form-group">
                            <input onkeyup="${validation()}" class="form-control" type="password"
                                id="rePassword" placeholder="Enter RePassword">
                            <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
                                Enter valid Repassword
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <button type="submit" disabled="" id="submitBtn"
                class="btn btn-outline-danger mt-3 m-auto d-flex">Submit</button>
        </div>
    </div>
</section>`
    document.getElementById('rowDate').innerHTML = cartona4;
    contactVlaid();
}


// validation
// userName = document.getElementById("name"),
//     userEmail = document.getElementById("email"),
//     userPhone = document.getElementById("phone"),
//     userAge = document.getElementById("age"),
//     userPassword = document.getElementById("password"),
//     userRePassword = document.getElementById("rePassword"),
//     userNameAlert = document.getElementById("namealert"),
//     userEmailAlert = document.getElementById("emailalert"),
//     userPhoneAlert = document.getElementById("phonealert"),
//     userAgeAlert = document.getElementById("agealert"),
//     userpasswordAlert = document.getElementById("passwordalert"),
//     userRepasswordAlert = document.getElementById("repasswordalert");

// function contactVlaid() {
//     userName.addEventListener("focus", () => {
//         nameToached = true
//     })
//     userEmail.addEventListener("focus", () => {
//         emailToached = true
//     })
//     userPhone.addEventListener("focus", () => {
//         phoneToached = true
//     })
//     userAge.addEventListener("focus", () => {
//         ageToached = true
//     })
//     userPassword.addEventListener("focus", () => {
//         passwordToached = true
//     })
//     userRePassword.addEventListener("focus", () => {
//         repasswordToached = true
//     })
// }

// let nameToached = false,
//     emailToached = false,
//     phoneToached = false,
//     ageToached = false,
//     passwordToached = false,
//     repasswordToached = false;

// function validation() {

//     if (nameToached) {
//         if (userNameValid()) {
//             userName.classList.remove("is-invalid")
//             userName.classList.add("is-valid")
//             $("#namealert").slideUp(500, function () {
//                 userNameAlert.classList.replace("d-block", "d-none")
//             });
//             // userNameAlert.classList.replace("d-block", "d-none")
//             // userNameAlert.classList.replace("d-block", "d-none")

//         } else {

//             userName.classList.replace("is-valid", "is-invalid")
//             userNameAlert.classList.replace("d-none", "d-block")
//             $("#namealert").slideDown(500)
//             // userName.classList.replace("is-valid", "is-invalid")
//             // userNameAlert.classList.replace("d-none", "d-block")
//         }
//     }

//     if (emailToached) {
//         if (userEmailValid()) {
//             $("#emailalert").slideUp(500, function () {
//                 userNameAlert.classList.replace("d-block", "d-none")
//                 userEmail.classList.remove("is-invalid")
//                 userEmail.classList.add("is-valid")
//                 userEmailAlert.classList.replace("d-block", "d-none")
//                 userEmailAlert.classList.replace("d-block", "d-none")
//             });
//             // userEmail.classList.remove("is-invalid")
//             // userEmail.classList.add("is-valid")
//             // userEmailAlert.classList.replace("d-block", "d-none")
//             // userEmailAlert.classList.replace("d-block", "d-none")
//         } else {

//             userEmail.classList.replace("is-valid", "is-invalid")
//             userEmailAlert.classList.replace("d-none", "d-block")

//             $("#emailalert").slideDown(500);
//             // userEmail.classList.replace("is-valid", "is-invalid")
//             // userEmailAlert.classList.replace("d-none", "d-block")
//         }
//     }

//     if (phoneToached) {
//         if (userPhoneValid()) {
//             $("#phonealert").slideUp(500, function () {
//                 userPhone.classList.remove("is-invalid")
//                 userPhone.classList.add("is-valid")
//                 userPhoneAlert.classList.replace("d-block", "d-none")
//                 userPhoneAlert.classList.replace("d-block", "d-none")
//             });
//             // userPhone.classList.remove("is-invalid")
//             // userPhone.classList.add("is-valid")
//             // userPhoneAlert.classList.replace("d-block", "d-none")
//             // userPhoneAlert.classList.replace("d-block", "d-none")
//         } else {

//             userPhone.classList.replace("is-valid", "is-invalid")
//             userPhoneAlert.classList.replace("d-none", "d-block")
//             $("#phonealert").slideDown(500);
//             // userPhone.classList.replace("is-valid", "is-invalid")
//             // userPhoneAlert.classList.replace("d-none", "d-block")
//         }
//     }

//     if (ageToached) {
//         if (userAgeValid()) {
//             $("#agealert").slideUp(500, function () {
//                 userAge.classList.remove("is-invalid")
//                 userAge.classList.add("is-valid")
//                 userAgeAlert.classList.replace("d-block", "d-none")
//                 userAgeAlert.classList.replace("d-block", "d-none")
//             });
//             // userAge.classList.remove("is-invalid")
//             // userAge.classList.add("is-valid")
//             // userAgeAlert.classList.replace("d-block", "d-none")
//             // userAgeAlert.classList.replace("d-block", "d-none")
//         } else {
//             userAge.classList.replace("is-valid", "is-invalid")
//             userAgeAlert.classList.replace("d-none", "d-block")
//             $("#agealert").slideDown(500)
//         }
//     }

//     if (passwordToached) {
//         if (userPasswordValid()) {
//             userPassword.classList.remove("is-invalid")
//             userPassword.classList.add("is-valid")
//             userpasswordAlert.classList.replace("d-block", "d-none")
//             userpasswordAlert.classList.replace("d-block", "d-none")
//         } else {
//             userPassword.classList.replace("is-valid", "is-invalid")
//             userpasswordAlert.classList.replace("d-none", "d-block")
//         }
//     }

//     if (repasswordToached) {
//         if (userRePasswordValid()) {

//             userRePassword.classList.remove("is-invalid")
//             userRePassword.classList.add("is-valid")
//             $("#passwordalert").slideUp(700, function () {
//                 userRepasswordAlert.classList.replace("d-block", "d-none")
//                 userRepasswordAlert.classList.replace("d-block", "d-none")
//             });
//             // userRePassword.classList.remove("is-invalid")
//             // userRePassword.classList.add("is-valid")
//             // userRepasswordAlert.classList.replace("d-block", "d-none")
//             // userRepasswordAlert.classList.replace("d-block", "d-none")
//         } else {
//             userRePassword.classList.replace("is-valid", "is-invalid")
//             userRepasswordAlert.classList.replace("d-none", "d-block")
//             $("#passwordalert").slideDown(500)
//         }
//     }

//     if (userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()) {
//         document.getElementById("submitBtn").removeAttribute("disabled")
//     } else {
//         document.getElementById("submitBtn").setAttribute("disabled", "true")
//     }

// }


// function userNameValid() {
//     return /^[a-zA-Z ]+$/.test(userName.value)
// }

// function userEmailValid() {
//     return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
// }

// function userPhoneValid() {
//     return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
// }

// function userAgeValid() {
//     return /^[1-9][0-9]?$|^100$/.test(userAge.value)
// }

// function userPasswordValid() {
//     return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
// }

// function userRePasswordValid() {
//     return userPassword.value == userRePassword.value
// }

