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
        const card = document.querySelector('.card1')
        const cardWidth = card.offsetWidth;  // Ancho de la tarjeta
        const gap = parseFloat(getComputedStyle(carousel1).gap) || 0;
        const totalCardWidth = cardWidth + gap;

        carousel1.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`
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
            cards1.forEach(card => {
                card.style.flex = `0 0 98%`;
            })

            updateCarousel1();
        } else if (window.innerWidth < 1030) {
            visibleCards1 = 2;
            cards1.forEach(card => {
                card.style.flex = `0 0 48%`;
            })
            updateCarousel1();
        } else if (window.innerWidth < 1445) {
            visibleCards1 = 3;
            cards1.forEach(card => {
                card.style.flex = `0 0 32%`;
            })
            updateCarousel1();
        } else if (window.innerWidth < 1925) {
            cards1.forEach(card => {
                card.style.flex = `0 0 23.5%`;
            })
            visibleCards1 = 4;
            updateCarousel1();
        } else if (window.innerWidth > 1925) {
            visibleCards1 = 4;
            cards1.forEach(card => {
                card.style.flex = `0 0 24.2%`;
            })
            visibleCards1 = 4;
            updateCarousel1();
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

    window.addEventListener('load', () => {
        updateVisibleCards2();  // Ejecutar solo después de que todo esté cargado
    });

    function updateCarousel2() {
        const card = document.querySelector('.card2')
        const cardWidth = card.offsetWidth;
        const gap = parseFloat(getComputedStyle(carousel2).gap) || 0;
        const totalCardWidth = cardWidth + gap;

        carousel2.style.transform = `translateX(-${currentIndex2 * totalCardWidth}px)`
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

    function updateVisibleCards2() {
        if (window.innerWidth < 768) {
            visibleCards2 = 1;
            cards2.forEach(card => {
                card.style.flex = `0 0 98%`;
            })
            updateCarousel2();
        } else if (window.innerWidth < 1030) {
            visibleCards2 = 2;
            cards2.forEach(card => {
                card.style.flex = `0 0 48%`;
            })
            updateCarousel2();
        } else if (window.innerWidth < 1445) {
            visibleCards2 = 3;
            cards2.forEach(card => {
                card.style.flex = `0 0 32%`;
            })
            updateCarousel2();
        } else if (window.innerWidth < 1925) {
            cards2.forEach(card => {
                card.style.flex = `0 0 24%`;
            })
            visibleCards2 = 4;
            updateCarousel2();
        } else {
            visibleCards2 = 4;
            cards2.forEach(card => {
                card.style.flex = `0 0 24.3%`;
            })
            visibleCards2 = 4;
            updateCarousel2();
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
            icon: 'error',
            confirmButtonColor: '#22282f'
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