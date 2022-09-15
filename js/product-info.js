let product;
let catID = localStorage.getItem('catID');
let catName = localStorage.getItem('catName');
let prodID = localStorage.getItem('prodID');
let comments;
let score;
let usercomments;


function starRating(score,a){
    let b = 0;
    /*if (rating == 5){*/
        for (i = 0; i < score; i++){
    document.getElementById(a+"rating").innerHTML += `
        <span class="fa fa-star checked"></span>
        `
        if(b < 5 && i == score){
            document.getElementById(a+"rating").innerHTML +=`
            <span class="fa fa-star"></span>
            `
        }
        b++
        }
    //} 
    
}

function showProductInfo(){
    let htmlContentToAppend = "";

            htmlContentToAppend += `
            <div>
                <h2> ${product.name} </h2>
                <hr>
                <p><strong> Precio </strong><br>
                ${product.currency} ${product.cost}</p>
                <br>
                <p><strong> Descripción </strong>  <br>
                ${product.description}</p>
                <br>
                <p> <strong>Categoría </strong><br>
                ${catName}</p>
                <br>
                <p> <strong>Cantidad de vendidos</strong> <br>
                ${product.soldCount}</p
                <br>
                <p><strong> Imagenes Ilustrativas </strong><br></p>
                <div class="a-carousel-viewport">
                    <div id='imgs'> 
                    </div>
                </div>
            <div>
            `
            document.getElementById("prod_info-list-container").innerHTML = htmlContentToAppend;
            product.images.forEach(element => {
                document.getElementById("imgs").innerHTML += `<img src="${element}"></img>
                `
            });
            
       
    }

function showComments(){
        let htmlContentToAppend = "";
        let a = 0;
        for(let i = 0; i < comments.length; i++){
            usercomments = comments[i];
            console.log(usercomments);
            score = usercomments.score;
            htmlContentToAppend += `
            <div><h3> Comentarios </h3>
                <div> <strong>${usercomments.user}</strong> - ${usercomments.dateTime} - <span id="${a}rating">
                 </span>
                    <div>
                        ${usercomments.description}
                    </div>
                </div>
                <hr>
            </div>
            `
            
            document.getElementById('comments').innerHTML += htmlContentToAppend;
            starRating(score,a);
            a++;
            htmlContentToAppend = "";
            
        }   
    }

function postComments(){

    let htmlContentToAppend = "";

        htmlContentToAppend += `
        <div class="container">
            <h3> Comentar </h3><br>
            <div>
                <h4> Tu opinión: </h4><br>
                <textarea> </textarea><br>
            </div>
            <div>
                <h4> Tu puntuación: </h4><br>
                <input type="number" <input><br>
                <input type="button" value="Enviar">
            </div>
        </div>

        `
        document.getElementById("comment-post").innerHTML += htmlContentToAppend;

}




document.addEventListener("DOMContentLoaded",function(){
    getJSONData('https://japceibal.github.io/emercado-api/products/'+prodID+'.json').then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data
            
            
            getJSONData('https://japceibal.github.io/emercado-api/products_comments/'+prodID+'.json').then(function(resultObj){
                if(resultObj.status === "ok"){
                    comments = resultObj.data
                    showProductInfo();
                    showComments();
                    postComments();
                }
            })
            


        }
    });


})