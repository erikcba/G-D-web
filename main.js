document.addEventListener('DOMContentLoaded', function () {
    //Primer carrusel

    const carousel1 = document.querySelector('.carousel1');
    const cards1 = carousel1.querySelectorAll('.card1');
    const prevButton1 = document.querySelector('.prev1');
    const nextButton1 = document.querySelector('.next1');

    let currentIndex = 0;
    const totalCards1 = cards1.length;
    let visibleCards1 = 4;

    function updateCarousel1() {
        const cardWidth = carousel1.offsetWidth / visibleCards1;
        carousel1.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function moveNext() {
        currentIndex = (currentIndex + 1) % (totalCards1 - visibleCards1 + 1);
        updateCarousel1();
    }

    function movePrev() {
        currentIndex = currentIndex === 0 ? totalCards1 - visibleCards1 : currentIndex - 1;
        updateCarousel1();
    }

    nextButton1.addEventListener('click', moveNext);
    prevButton1.addEventListener('click', movePrev);

    cards1.forEach(card => {
        card.style.flex = `0 0 24%`;
    });

    function updateVisibleCards1() {
        if (window.innerWidth < 768) {
            visibleCards1 = 1;
        } else if (window.innerWidth < 1024) {
            visibleCards1 = 2;
        } else if (window.innerWidth < 1280) {
            visibleCards1 = 3;

        } else if (window.innerWidth < 1920) {
            cards2.forEach(card => {
                card.style.flex = `0 0 25%`;
            })
            visibleCards2 = 4;
            updateCarousel1();
        } else {
            visibleCards1 = 4;
        }
        updateCarousel1();
    }

    window.addEventListener('resize', updateVisibleCards1);

    updateCarousel1();


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Carrusel 2
    const carousel2 = document.querySelector('.carousel2');
    const cards2 = carousel2.querySelectorAll('.card2');
    const prevButton2 = document.querySelector('#prev2');
    const nextButton2 = document.querySelector('#next2');

    let currentIndex2 = 0;
    const totalCards2 = cards2.length;
    let visibleCards2 = 4;

    function updateCarousel2() {
        const cardWidth = carousel2.offsetWidth / visibleCards2;
        carousel2.style.transform = `translateX(-${currentIndex2 * cardWidth}px)`;
    }

    function moveNext2() {
        currentIndex2 = (currentIndex2 + 1) % (totalCards2 - visibleCards2 + 1);
        updateCarousel2();
    }

    function movePrev2() {
        currentIndex2 = currentIndex2 === 0 ? totalCards2 - visibleCards2 : currentIndex2 - 1;
        updateCarousel2();
    }

    nextButton2.addEventListener('click', moveNext2);
    prevButton2.addEventListener('click', movePrev2);

    cards2.forEach(card => {
        card.style.flex = `0 0 24%`;
    });

    function updateVisibleCards2() {
        if (window.innerWidth < 768) {
            visibleCards2 = 1;
        } else if (window.innerWidth < 1024) {
            visibleCards2 = 2;
        } else if (window.innerWidth < 1280) {
            visibleCards2 = 3;
        } else if (window.innerWidth < 1920) {
            cards2.forEach(card => {
                card.style.flex = `0 0 25%`;
            })
            visibleCards2 = 4;
        } else {
            visibleCards2 = 4;
        }
        updateCarousel2();
    }

    window.addEventListener('resize', updateVisibleCards2);

    updateCarousel2();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Mostrar ocultar seccion proceso de trabajo

const openBtn = document.getElementById('open')
const procesoSection = document.getElementById('procesoTrabajoCarrusel')
const procesoTitulo = document.getElementById('procesoTitulo')
const closeBtn = document.getElementById('close')

openBtn.addEventListener('click', () => {
    procesoSection.classList.remove('hidden')
    procesoSection.classList.add('flex')
    procesoTitulo.classList.add('hidden')
})

closeBtn.addEventListener('click', () => {
    procesoSection.classList.add('hidden')
    procesoSection.classList.remove('flex')
    procesoTitulo.classList.remove('hidden')
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Formulario
import Swal from 'sweetalert2';

const nombre = document.getElementById('nombre');
const empresa = document.getElementById('empresa');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const submitBtn = document.getElementById('submitBtn');
const texto = document.getElementById('texto');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let nombreValue = nombre.value.trim();
    let empresaValue = empresa.value.trim();
    let emailValue = email.value.trim();
    let telefonoValue = telefono.value.trim();
    let textoValue = texto.value.trim();
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse.length > 0) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa el captcha.',
            icon: 'error'
        });
        return;
    }

    if (nombreValue === '' || empresaValue === '' || emailValue === '' || telefonoValue === '' || textoValue === '') {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, complete todos los campos del formulario.',
            icon: 'error',
            confirmButtonColor: '#22282f'
        });
    } else {
        const formData = {
            nombre: nombreValue,
            empresa: empresaValue,
            texto: textoValue,
            email: emailValue,
            telefono: telefonoValue,
        };

        fetch('https://formspree.io/f/mbjbgprn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición');
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    title: "Éxito",
                    text: "El formulario se ha enviado correctamente.",
                    icon: "success",
                    confirmButtonColor: '#22282f',
                });
                nombre.value = '';
                empresa.value = '';
                email.value = '';
                telefono.value = '';
                texto.value = '';
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al enviar el formulario.',
                    icon: 'error',
                    confirmButtonColor: '#22282f',
                });
                console.error('Error:', error);
            });
    }
});