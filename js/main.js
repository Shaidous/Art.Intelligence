import $, { removeData } from "jquery"


/*
=====================скролл до навигации при нажатии на кнопку=====================
*/
var btn = $('#button');

$(window).scroll(function() {
if ($(window).scrollTop() > 300) {
btn.addClass('show');
} else {
btn.removeClass('show');
}
});

btn.on('click', function(e) {
e.preventDefault();
$('html, body').animate({scrollTop:0}, '300');
});

/*
=====================Плавная прокрутка навигации=====================
*/
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
      animationTime = 600,
      framesCount = 250;

anchors.forEach(function(item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function(e) {
    // убираем стандартное поведение
    e.preventDefault();
    
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
    
    // запускаем интервал, в котором
    let scroller = setInterval(function() {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;
      
      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});
/*
=====================Шкала умений(автообновлении прогрессии в %)=====================
*/

/*
=====================Линия прокрутки=====================Start
*/
var line = document.querySelector('#line'),
    bodyHeight = document.body.clientHeight,
    doc = document.documentElement;

setTimeout(function() {
   setWidthLine();
},0);

document.addEventListener('scroll', function() {
   setWidthLine();
});

document.addEventListener('resize', function() {
   setWidthLine();
});

function setWidthLine() {
   var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0),
       percent;
   scrollTop += doc.clientHeight;
   
   percent = scrollTop / bodyHeight * 100;
   line.style.width = 0;
   line.style.width = percent + '%';
}
/*
=====================Линия прокрутки=====================END
*/

/*
=====================Анимация при скролле=====================Start
*/

function offset(el) {
  const rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

//====Пояление картинок
const animItemsImg = document.querySelectorAll('.anim-off');
if (animItemsImg.length > 0) {
  window.addEventListener('scroll', animOnScroll)
  function animOnScroll(){
    for (let i = 0; i < animItemsImg.length; i++) {
      const animItem = animItemsImg[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 15; //регулирует момент старта анимации

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if(animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      //=======Картинки
      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_activeImg');
      } else {
        animItem.classList.remove('_activeImg')
      }
    }
  } 
  animOnScroll()
}

//Появление js
const animItemsJs = document.querySelectorAll('.skill-per');
if (animItemsJs.length > 0) {
  window.addEventListener('scroll', animOnScroll)
  function animOnScroll(){
    for (let i = 0; i < animItemsJs.length; i++) {
      const animItemJs = animItemsJs[i];
      const animItemHeight = animItemJs.offsetHeight;
      const animItemOffset = offset(animItemJs).top;
      const animStart = 4; //регулирует момент старта анимации

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if(animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      //=======Js
      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
          animItemsJs[i].style.opacity = 1;
          animItemsJs[i].style.width = animItemsJs[i].getAttribute('data-done') + '%';
      } else {
        animItemsJs[i].style.opacity = 0;
        animItemsJs[i].style.width = 0;
      }
    }
  }
  animOnScroll()
}


/*
=====================Меню бургер=====================Start
*/

const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const changeActive = document.querySelector('#active');
const changeClose = document.querySelector('#close');

navBtn.onclick = () => {
  if (nav.classList.toggle('open')){
    changeClose.style.visibility = 'visible'
    changeActive.style.visibility = 'hidden'
  } else {
    changeActive.style.visibility = 'visible'
    changeClose.style.visibility = 'hidden'
  }
}


/*
=====================Закрытие при перемещении на объект меню бургер=====================
*/

const navItems = document.querySelectorAll('#nav-item');
console.log(navItems)

for ( let i = 0 ; i < navItems.length; i++){
  navItems[i].onclick = () => {
    if (nav.classList.toggle('open')){
      changeClose.style.visibility = 'visible'
      changeActive.style.visibility = 'hidden'
    } else {
      changeActive.style.visibility = 'visible'
      changeClose.style.visibility = 'hidden'
    }
  }
}
/*
=====================Меню бургер=====================End
*/