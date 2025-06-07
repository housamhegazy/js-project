let landingPage = document.querySelector('.landing-page');
let imgArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];
//progress bar
let ourSkills = document.querySelector(".our-skills")
// settingsBox
let settingsIcon = document.querySelector('.settings-icon');
let settingsBox = document.querySelector('.settings-box');
//get colors option from local storage
let mainColor = localStorage.getItem('color-option');

// colors options
let colorsLi = document.querySelectorAll('.colors li');
let randomButtons = document.querySelectorAll('.random-buttons span');
//random options
let randomOption = true;
let backgroundInterval;
//get random option from local storage
let randomOptionLocalStorage = localStorage.getItem('randomOption');
if(randomOptionLocalStorage !== null){
    if(randomOptionLocalStorage === 'true'){
        randomOption = true;

    }else{
        randomOption = false;
    }
    //remove active class from all random buttons
    randomButtons.forEach(btn => {
        btn.classList.remove('active');
        if(randomOptionLocalStorage === 'true' && btn.dataset.random === 'yes'){
            btn.classList.add('active');
        }else if(randomOptionLocalStorage === 'false' && btn.dataset.random === 'no'){
            btn.classList.add('active');
        }
    })
}else{
    randomOption = true;
    
}


//get color from local storage
if(mainColor !== null){
    document.documentElement.style.setProperty('--main--color', mainColor);
    document.querySelectorAll('.colors li').forEach(element => {
        element.classList.remove('active');
        if(element.dataset.color === mainColor){
            element.classList.add('active');
        }
    })
}

// randomize images function
function randomizeImages() {
    if (randomOption === true){
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            landingPage.style.backgroundImage = `url("./imgs/${imgArray[randomNumber]}")`;
        }, 10000);
    }
    
}
randomizeImages() 

//gear icon
settingsIcon.onclick = function () {
    settingsBox.classList.toggle('open');
    settingsIcon.classList.toggle('fa-spin');
    settingsIcon.classList.toggle('fa-cog');
    settingsIcon.classList.toggle('fa-xmark');
}

//change main color 
colorsLi.forEach(li => {
    li.addEventListener('click', (e) => {
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);
        localStorage.setItem('color-option', e.target.dataset.color);
        handleActive(e);

    } 
)}
)

// random background option (yes or no)
randomButtons.forEach(btn=>{
    btn.addEventListener('click', (e) => {
        e.target.parentElement.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active');
        })
        e.target.classList.add('active');
        if(e.target.dataset.random === 'yes'){
            randomOption = true;
            randomizeImages();
            localStorage.setItem('randomOption', true);
        }else{
            randomOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('randomOption', false);
        }
    })

})





// create nave menu 
//get all sections names
let AllSections = document.querySelectorAll('section');
//get all sections names    
let sectionsNames = [];
AllSections.forEach(section => {
    sectionsNames.push(section.getAttribute('id'));
});

//create elements function and handle active class
createElementsFunction = (name,links) => {
   //create li and a elements
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = `#${name}`;
    a.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    a.className = 'section-link';
    //append a to li and li to navLinks
    li.appendChild(a);
    links.appendChild(li);
    //add click event to the link
    a.addEventListener('click', (e) => {
        
         menuHandleActive(e);
    });
}



let navLinks = document.querySelector('.header-area .links');
//create main menu links
sectionsNames.forEach(name=>{
    createElementsFunction(name,navLinks);
    //create elements function
})

//create toggle menu
let toggleMenuLinks = document.querySelector('nav .nav-links');
sectionsNames.forEach(name => {
    createElementsFunction(name, toggleMenuLinks);
});
//handle active function 
menuHandleActive = (e) => {
    e.preventDefault();
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    e.target.parentElement.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
    e.target.classList.add('active');
}

//toggle menu button
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-button');
    const navLinks = document.querySelector('.nav-links');

    toggleButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggleButton.classList.toggle('active'); // لتغيير شكل زر البرجر
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !toggleButton.contains(event.target)) {
            navLinks.classList.remove('active');
            toggleButton.classList.remove('active');
        }
    });

    // إغلاق القائمة عند النقر على أحد الروابط (لتحسين تجربة المستخدم على الجوال)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleButton.classList.remove('active');
        });
    });
});




// create overlay element
let gallerImgs = document.querySelectorAll('.gallery img');
gallerImgs.forEach(img => {
    img.addEventListener("click", (e)=>{
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        overlay.classList.add("active");
        // creat popup box 
        let popupBox = document.createElement("div");
        popupBox.className="popupBox";
        document.body.appendChild(popupBox);
         //create image heading
         if(img.alt !== null){
            let imgHeading = document.createElement("h3")
            let headingText = document.createTextNode(img.alt);
            imgHeading.appendChild(headingText);
            popupBox.appendChild(imgHeading)

        }
        //create image
        let popUpImg = document.createElement("img");
        popUpImg.src = img.src;
        popupBox.appendChild(popUpImg);

       

        // create close span
        let closeButton = document.createElement("span");
        let closeButtonTxt = document.createTextNode("X");
        closeButton.appendChild(closeButtonTxt);
        closeButton.className = "close-btn";
        popupBox.appendChild(closeButton)

        // cose img
        closeButton.addEventListener("click", (e)=>{
            if(e.target.className == "close-btn"){
                e.target.parentElement.remove();
                overlay.classList.remove("active");
            }
        })
    })
})


//start bullet 
//create bullets
let bulletsContainer = document.querySelector('.nav-bullets');
sectionsNames.forEach(bullet => {
    let bulletDiv = document.createElement('div');
    bulletDiv.className = 'bullet';
    bulletDiv.dataset.section = `.${bullet}`;
    let tooltipDiv = document.createElement('div');
    tooltipDiv.className = 'tooltip';
    tooltipDiv.textContent = bullet.charAt(0).toUpperCase() + bullet.slice(1);
    bulletDiv.appendChild(tooltipDiv);
    bulletsContainer.appendChild(bulletDiv);
});

let NavBullet = document.querySelectorAll('.nav-bullets .bullet');

NavBullet.forEach(bullet=>{
    bullet.addEventListener("click", (e)=>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
        handleActive(e);
    })
})

//handle active class on scroll and progress function on scroll
window.onscroll = function() {

    progress()
    let sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200 && window.scrollY < section.offsetTop + section.offsetHeight) {
            //remove active class from all bullets
            NavBullet.forEach(bullet => {
                bullet.classList.remove('active');
            });
            //add active class to the current section bullet
            document.querySelector(`.nav-bullets .bullet[data-section=".${section.id}"]`).classList.add('active');
        }
    });
}

//reset all settings in local storage
let resetButton = document.querySelector('.reset-btn');

resetButton.addEventListener('click', () => {
    //reset colors
    localStorage.removeItem('color-option');
    // document.documentElement.style.setProperty('--main--color', '#333');
    colorsLi.forEach(element => {
        element.classList.remove('active');
    });
    //reset random option
    localStorage.removeItem('randomOption');
    randomOption = true;
    randomButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.random === 'yes') {
            btn.classList.add('active');
        }
    });
    //scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    ///refresh page
    window.location.reload();
});


//handle active class function
handleActive = (e) => {
    e.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
    e.target.classList.add('active');
}
//progress function
progress = () => {
    let skillsOffsetTop = ourSkills.scrollTop;
    let skillsOffsetHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;    
    let windowScrollTop = this.scrollY;
    if(windowScrollTop > (skillsOffsetTop + skillsOffsetHeight - windowHeight)){
        let ourSkillsEles = document.querySelectorAll(".skill-box .skill-progress span")
        ourSkillsEles.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

//scroll to top button
let scrollToTopButton = document.querySelector('.scroll-to-top');   
// Show or hide the scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY >= 500) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//start footer
// create links 
let footerLinks = document.querySelector('.footer-section .links');
//create footer links
sectionsNames.forEach(name => {
    createElementsFunction(name, footerLinks);
});

//footer year 
const yearSpan = document.querySelector('.year-span');
    if (yearSpan) { // التأكد من وجود العنصر قبل محاولة تحديثه
        yearSpan.textContent = new Date().getFullYear();

    }