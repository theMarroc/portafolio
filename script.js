/*Código de cada seccion colapsable-------------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector('#skillsBtn');
    const Toggle = document.querySelector('#skillsToggle');

    Btn.addEventListener('click', () => {
        Toggle.classList.toggle('hidden');
    })
})
document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector('#hobbiesBtn');
    const Toggle = document.querySelector('#hobbiesToggle');

    Btn.addEventListener('click', () => {
        Toggle.classList.toggle('hidden');
    })
}) 
document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector('#aboutmeBtn');
    const Toggle = document.querySelector('#aboutmeToggle');

    Btn.addEventListener('click', () => {
        Toggle.classList.toggle('hidden');
    })
})
document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector('#trainingBtn');
    const Toggle = document.querySelector('#trainingToggle');

    Btn.addEventListener('click', () => {
        Toggle.classList.toggle('hidden');
    })
})
document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector('#projectsBtn');
    const Toggle = document.querySelector('#projectsToggle');

    Btn.addEventListener('click', () => {
        Toggle.classList.toggle('hidden');
    })
}) 

/*Código del aside de los hobbies-------------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
    const aside = document.querySelector('#hobbiesAside');
    
    const hobbyInfo = {
        gaming: {
            video: `<iframe width="100%" height="60%" src="https://www.youtube.com/embed/y7tGkDQkyek?si=JPz0dZLqxWIor0pW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
            title: `<h3>Industria del Gaming</h3>`,
            content: `<p style="font-family: 'Roboto', sans-serif;">Mi hobbie principal es el gaming y el juego en el que mas desperdicié mi vida es el World of Warcraft</p>`
        },
        calistenia: {
            image: `<img style="height:60%;  width:100%" src="./assets/li_calistenia.jpg" alt="Calistenia">`,
            title: `<h3>Calistenia</h3>`,
            content: `<p style="font-family: 'Roboto', sans-serif; text-align:justify;">La calistenia es un proceso físico y mental en cual se involucran diferentes ejercicios de peso corporal y espacios libres. Etimológicamente la palabra proviene del griego kalos (belleza) y sthenos (fortaleza).</p>`
        },
        musica: {
            video: `<iframe width="100%" height="60%" src="https://www.youtube.com/embed/LL7yklrrnzs?si=sqazs0hCpHIOSAN8"></iframe>`,
            title: `<h3>Música</h3>`,
            content: `<p style="font-family: 'Roboto', sans-serif;">Disfruto de la música como cualquier otra persona, no soy melómano.</p>`
        },
        anime: {
            image: `<img style="height:60%; width:100%" src="./assets/li_anime.jpg" alt="Guts y Griffith de manga Berserk">`,
            title: `<h3>Animé</h3>`,
            content: `<p style="font-family: 'Roboto', sans-serif; text-align:justify;">Me gustan las series de animé de los géneros seinen y comedia.</p>`
        },
        escribir: {
            image: `<img style="height:60%; width:100%" src="./assets/li_escribir.jpg" alt="Edicion mía de un poema Haiku">`,
            title: `<h3>Verso... Prosa...</h3>`,
            content: `<p style="font-family: 'Roboto', sans-serif;">Yo escribo, borro, reescribo. <br>Borro nuevamente, y después. <br>Una amapola florece. <br>Katsushika Hokusai </p>`
        },
        idiomas: {
            image: `<img style="height:60%; width:100%" src="./assets/li_duolingo_profile.jpg" alt="Edicion mía de un poema Haiku">`,
            title: `<h3>Aprender Idiomas</h3>`,
            content: `<p style="font-family: 'Roboto', sans-serif;">Disfruto de aprender idiomas como el Japonés y el Italiano. A la vez que refuerzo mi nivel de Inglés.</p>`
        }
    };
    
    document.querySelectorAll('.hobbies__element').forEach(element => {
        element.addEventListener('click', () => {
            const hobby = element.getAttribute('data-hobby');
            
            if (hobbyInfo[hobby]) {
                aside.innerHTML = `
                    ${hobbyInfo[hobby].image || ''}
                    ${hobbyInfo[hobby].video || ''}
                    ${hobbyInfo[hobby].title || ''}
                    ${hobbyInfo[hobby].content || ''}                  
                `;
            }
        });
    });
});

/*Código del formulario de contacto-------------------------------------------*/

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const to_name = "Marco"
    const from_name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    
    // Uso de EmailJS
    emailjs.send("service_se44xqb", "template_feuoser", {
        from_name: from_name,
        to_name: to_name,
        reply_to: email,
        message: message
    }).then(function(response) {
       alert("Mensaje enviado exitosamente!");
    }, function(error) {
       alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
    });
});

const btn = document.getElementById('formBtn');

document.getElementById('contactForm')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'service_se44xqb';
   const templateID = 'template_feuoser';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar Email';
      alert('Enviado!');
    }, (err) => {
      btn.value = 'Enviar Email';
      alert(JSON.stringify(err));
    });
});

/*Código de los botones de proyecto-------------------------------------*/