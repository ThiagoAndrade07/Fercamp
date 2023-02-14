const controls = 
document.querySelectorAll('.control');

let currentItem = 0;

const items =
document.querySelectorAll('.item');

const maxItems = items.length;

controls.forEach((control) => {
    control.addEventListener("click", () => {
        const isLeft = control.classList.contains("arrow-left");

        if (isLeft) {
            currentItem -= 1;
        } else {
            currentItem += 1;
        }

        if (currentItem >= maxItems) {
            currentItem = 0;
        }

        if (currentItem < 0) {
            currentItem = maxItems - 1;
        }

        items.forEach(item => item.classList.remove('current-tem'));

        items[currentItem].scrollIntoView({
            inline: "center",
            behavior: "smooth",
            block: "nearest",
            });
            
        items[currentItem].classList.add("current-item");
    });
});

const boxPromo = document.querySelectorAll('.box-promo');
console.log(boxPromo)


setInterval(() => {
   
    if(isInViewport(controls[1])) {
        controls[1].click();
    }
        
},2000);

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight  || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth  || document.documentElement.clientWidth)
    );
}




// timer


    var dataFutura = new Date("February 20, 2023 00:00").getTime();

    var dias, horas, minutos, segundos;
    function setValores(e) {
        return document.getElementById(e);
    }
    setInterval(function() {
        var dataAtual = new Date().getTime();
        
        
        var segundosTotal = ( dataFutura - dataAtual)/1000;

        dias = parseInt(segundosTotal/86400);
        segundosTotal = segundosTotal%86400;

        horas = parseInt(segundosTotal/3600);
        segundosTotal = segundosTotal%3600;

        minutos = parseInt(segundosTotal/60);
        segundos = parseInt(segundosTotal%60);


         setValores("dias").innerHTML = dias;
         setValores("horas").innerHTML = horas;
         setValores("minutos").innerHTML = minutos;
         setValores("segundos").innerHTML = segundos;
    },1000);
    