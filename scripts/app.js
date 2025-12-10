// DOM Content Loaded Event
let emprendimientos = []; // Global state for data
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const navbarToggle = document.getElementById('navbarToggle');
    const navLinks = document.getElementById('navLinks');

    // Si el hash es #register, mostrar el formulario de registro
    if (window.location.hash === '#register' && wrapper) {
        wrapper.classList.add('active');
    }
    // Toggle Mobile Menu
    if (navbarToggle && navLinks) {
        navbarToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navbarToggle.classList.remove('active');
            });
        });
    }

    // ANIMATION FOR LOGIN AND REGISTER
    if (registerLink && wrapper) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.classList.add('active');
        });
    }

    if (loginLink && wrapper) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.classList.remove('active');
        });
    }

    // Capturar datos del formulario de login y registro

    // Selecciona ambos formularios por clase o id
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Método 1: Usando FormData (requiere atributo name en inputs)
            const formData = new FormData(loginForm);
            const data = {};

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Método 2: Captura directa de inputs (backup si FormData falla)
            if (Object.keys(data).length === 0) {
                const usernameInput = loginForm.querySelector('input[name="username"]');
                const passwordInput = loginForm.querySelector('input[name="password"]');

                if (usernameInput && passwordInput) {
                    data.username = usernameInput.value.trim();
                    data.password = passwordInput.value.trim();
                }
            }

            // Validación básica
            if (!data.username || !data.password) {
                alert('Por favor completa todos los campos');
                return;
            }

            console.log('Login form data:', data);
            alert('Login exitoso');

            window.location.href = '../pages/private/profile.html';

            // fetch('http://localhost:3000/users', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
            //     .then(response => {
            //         if (response.ok) {
            //             alert('Login exitoso');
            //             // Save simple session
            //             localStorage.setItem('userSession', JSON.stringify({
            //                 username: data.username,
            //                 email: data.email,
            //                 loggedIn: true
            //             }));
            //             window.location.href = '../index.html'; // Redirect to home
            //         } else {
            //             alert('Error al iniciar sesión. Asegúrate de que el servidor esté corriendo.');
            //         }
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //         alert('No se pudo conectar con el servidor. Ejecuta: npx json-server --watch html/data/users.json');
            //     });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Método 1: Usando FormData (requiere atributo name en inputs)
            const formData = new FormData(registerForm);
            const data = {};

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Método 2: Captura directa de inputs (backup si FormData falla)
            if (Object.keys(data).length === 0) {
                const usernameInput = registerForm.querySelector('input[name="username"]');
                const emailInput = registerForm.querySelector('input[name="email"]');
                const passwordInput = registerForm.querySelector('input[name="password"]');

                if (usernameInput && emailInput && passwordInput) {
                    data.username = usernameInput.value.trim();
                    data.email = emailInput.value.trim();
                    data.password = passwordInput.value.trim();
                }
            }

            // Validación básica
            if (!data.username || !data.email || !data.password) {
                alert('Por favor completa todos los campos');
                return;
            }

            // Validación de email básica
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Por favor ingresa un email válido');
                return;
            }

            console.log('Register form data:', data);
            alert('Registro exitoso');
            window.location.href = '../pages/login.html';


            // Aquí puedes hacer un fetch/AJAX al backend
            // Ejemplo:
            // fetch('/api/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
        });
    }

    // Cargar y crear los avatares de creadores desde JSON local
    fetch('../data/teamData.json')
        .then(response => response.json())
        .then(creators => {
            const container = document.getElementById('creators-container');
            if (container && Array.isArray(creators) && creators.length > 0) {
                container.innerHTML = '';

                creators.forEach(creator => {

                    const link = document.createElement('a');
                    link.href = creator.url;
                    link.target = '_blank';
                    link.setAttribute('aria-label', `Perfil de ${creator.name}`);
                    link.className = 'social-icon';

                    const img = document.createElement('img');
                    img.src = creator.image;
                    img.alt = creator.name;
                    img.onerror = function () {
                        this.src = '../images/no-img.jpg';
                        this.onerror = null; // Prevenir loops infinitos
                    };

                    link.appendChild(img);
                    container.appendChild(link);
                });
            }
        })
        .catch(error => console.error('Error loading team data:', error));

    // Load team data (this should be in a separate JSON file)
    fetch('../data/teamContact.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('team-container');
            if (!container) return;

            data.forEach(member => {

                // Crear el elemento de imagen con manejo de error
                const img = document.createElement('img');
                img.src = member.image;
                img.alt = member.name;

                // Si la imagen no se puede cargar, usar la imagen por defecto
                img.onerror = function () {
                    this.src = '../images/no-img.jpg';
                    this.onerror = null; // Prevenir loops infinitos
                };

                // Crear el elemento del miembro del equipo
                const memberDiv = document.createElement('div');
                memberDiv.className = 'team-member';

                const h3 = document.createElement('h3');
                h3.textContent = member.name;

                const p = document.createElement('p');
                p.textContent = member.role || '';

                memberDiv.appendChild(img);
                memberDiv.appendChild(h3);
                memberDiv.appendChild(p);

                container.appendChild(memberDiv);
            });
        })
        .catch(error => console.error('Error loading team data:', error));






    // FAQ Accordion  LOADING DATA FROM JSON
    fetch('../data/FAQ.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('faq-container');
            if (!container) return;


            data.forEach(item => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.innerHTML = `
                    <div class="faq-question">
                        <i class='bx bx-question-mark'></i>
                        <h3>${item.question}</h3>
                        <i class='bx bx-chevron-down toggle-icon'></i>
                    </div>
                    <div class="faq-answer">
                        <p>${item.answer}</p>
                    </div>
                `;
                container.appendChild(faqItem);
            });
        })
        .catch(error => console.error('Error loading FAQ data:', error));



    // FAQ Accordion - Event Delegation Implementation
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
        faqContainer.addEventListener('click', (e) => {
            const question = e.target.closest('.faq-question');
            if (!question) return;

            const item = question.parentElement;
            const icon = item.querySelector('.toggle-icon');

            // Toggle this item
            item.classList.toggle('active');

            // Toggle icon
            if (icon) {
                icon.style.transform = item.classList.contains('active')
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)';
            }

            // Close others
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.toggle-icon');
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    }


    const path = window.location.pathname.toLowerCase();

    // Seleccionar todos los links del footer
    const aboutLink = document.querySelector('a[href="/pages/aboutUs.html"]');
    const termsLink = document.querySelector('a[href="/pages/Terms.html"]');
    const privacyLink = document.querySelector('a[href="/pages/Privacy.html"]');
    const helpLink = document.querySelector('a[href="/pages/Help.html"]');
    const faqLink = document.querySelector('a[href="/pages/FAQ.html"]');
    const contactLink = document.querySelector('a[href="/pages/Contact.html"]');
    const contactLink2 = document.querySelector('a[href="../pages/Contact.html"]');
    const emprendedoresLink = document.querySelector('a[href="../pages/emprendedores.html"]');



    // Switch con true para evaluar condiciones
    switch (true) {
        case path.includes('aboutus.html'):
            aboutLink?.classList.add('active');
            break;
        case path.includes('terms.html'):
            termsLink?.classList.add('active');
            break;
        case path.includes('privacy.html'):
            privacyLink?.classList.add('active');
            break;
        case path.includes('help.html'):
            helpLink?.classList.add('active');
            break;
        case path.includes('faq.html'):
            faqLink?.classList.add('active');
            break;
        case path.includes('contact.html'):
            contactLink?.classList.add('active');
            contactLink2?.classList.add('active');
            break;
        case path.includes('emprendedores.html'):
            emprendedoresLink?.classList.add('active');
            break;
        default:
            // No hacer nada si no coincide ninguna página
            break;
    }




    // Global state for filtering
    let currentCategory = 'todos';

    // Load emprendimientos data
    fetch('../data/emprendimientosData.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            emprendimientos = data; // Store fetched data globally
            renderEmprendimientos(emprendimientos); // Initial render of all emprendimientos
        })
        .catch(error => console.error('Error loading emprendimientos data:', error));

    // Search Input Listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => applyFiltersAndSearch(currentCategory));
    }

    // Filter Buttons Listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update current category based on button text or ID
            // Using textContent for simplicity as per HTML, mapping 'Todos' to 'all'
            const categoryText = btn.textContent.trim();
            currentCategory = categoryText === 'Todos' ? 'todos' : categoryText;

            applyFiltersAndSearch(currentCategory);
        });
    });

    // Console message
    console.log('Application initialized successfully!');
}

function renderEmprendimientos(dataToRender) {
    const grid = document.getElementById('emprendimientosGrid');
    if (!grid) return;

    grid.innerHTML = ''; // Clear existing cards

    if (dataToRender.length === 0) {
        grid.innerHTML = '<p class="no-results">No se encontraron emprendimientos que coincidan con tu búsqueda.</p>';
        return;
    }

    dataToRender.forEach(emprendimiento => {
        const card = document.createElement('div');
        card.className = 'emprendimiento-card';
        card.innerHTML = `
                <div class="emprendimiento-image">${emprendimiento.emoji}</div>
                <div class="emprendimiento-info">
                    <span class="emprendimiento-categoria">${emprendimiento.categoria}</span>
                    <h3>${emprendimiento.nombre}</h3>
                    <p>${emprendimiento.descripcion}</p>
                </div>
                <div class="emprendimiento-footer">
                    <a href="${emprendimiento.id === 1 ? '/pages/profileBusine.html' : 'javascript:void(0)'}" class="btn-ver-tienda">Ver Tienda</a>
                    <button class="btn-contactar" onclick="openContactModal(${emprendimiento.id})">Contactar</button>
                </div>
            `;
        grid.appendChild(card);
    });
}

// Function to apply filters and search
function applyFiltersAndSearch(category) {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoryFilter = category || 'todos';

    let filteredData = emprendimientos.filter(emprendimiento => {
        const matchesSearch = emprendimiento.nombre.toLowerCase().includes(searchTerm) ||
            emprendimiento.descripcion.toLowerCase().includes(searchTerm) ||
            emprendimiento.categoria.toLowerCase().includes(searchTerm);

        const matchesCategory = categoryFilter === 'todos' || emprendimiento.categoria.toLowerCase() === categoryFilter.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    renderEmprendimientos(filteredData);
}

function openContactModal(id) {
    const emprendimiento = emprendimientos.find(e => e.id === id);
    if (!emprendimiento) return;

    document.getElementById('modalEmprendimientoNombre').textContent = emprendimiento.nombre;
    document.getElementById('modalEmprendimientoCategoria').textContent = emprendimiento.categoria;
    document.getElementById('modalEncargado').textContent = emprendimiento.encargado;

    const telefonoLink = document.getElementById('modalTelefono');
    telefonoLink.textContent = emprendimiento.telefono;
    telefonoLink.href = `tel:${emprendimiento.telefono}`;

    const correoLink = document.getElementById('modalCorreo');
    correoLink.textContent = emprendimiento.correo;
    correoLink.href = `mailto:${emprendimiento.correo}`;

    document.getElementById('contactModal').classList.add('active');
}

/**
 * Cierra el modal de contacto
 */
function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
}