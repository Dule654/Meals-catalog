let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
let sectionResult = document.querySelector('.results');
let input = document.querySelector('input');
let popUpBox = document.querySelector('.popUp');


let srcBtn = document.querySelector('.lupa').addEventListener('click', () => {
    let input = document.querySelector('input').value; 
    let fullUrl = url + input;
    
    fetch(fullUrl)
        .then((res) => res.json())
        .then((data) => {
            
            if(data.meals){
            sectionResult.innerHTML = '';
            data.meals.forEach((meal) => {
                 let mealNum = meal.idMeal;
                // meal.target = meal.idMeal
                // console.log(mealNum)
                sectionResult.innerHTML += `
                <div class="display">
                    <img src="${meal.strMealThumb}" alt="">
                    <h2>${meal.strMeal}</h2>
                    <button id =${mealNum} class = "openModal">Get Recipe</button>
                </div>
                    `
               let modals = document.querySelectorAll('.openModal');
                modals.forEach((modal) => {
                    
                    modal.addEventListener('click', (e) => {
                       
                        let broj = e.target.getAttribute('id');
                        let fullUrlTwo = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + broj;
                        console.log(fullUrlTwo);
                        fetch(fullUrlTwo)
                            .then((res) => res.json())
                            .then((data) => {
                                let modalName = data.meals[0].strMeal;
                                let modalRecipe = data.meals[0].strInstructions;
                                let modalPicture = data.meals[0].strMealThumb;
                                let modalVideo = data.meals[0].strYoutube;
                        popUpBox.style.display = 'block';
                        popUpBox.innerHTML = `<i id="closeBtnOne" class="fa fa-window-close" aria-hidden="true"></i>
                        <h1>${modalName}</h1>
                        <div class='sastojak'><p>${input}</p></div>
                        <h2>Instructions:</h2>
                        <p>${modalRecipe}</p>
                        <img src="${modalPicture}" alt="">
                        <a href="${modalVideo}">Watch video</a>`
                        document.querySelector('body').style.overflow = 'hidden';
                        let xBtn = document.getElementById('closeBtnOne').addEventListener('click', () => {
                            popUpBox.style.display = 'none';
                            document.querySelector('body').style.overflow = 'auto';
                        })
                        });
                    })
                });      
               
            } 
            );
        }else{
            alert('We do not have meal with that ingredient')
        }
        })
});
