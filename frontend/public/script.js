// Variables
const API_URL = '/api/videojuegos';
const gamesList = document.getElementById('gamesList');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');
const editModal = document.getElementById('editModal');
const closeModal = document.querySelector('.close');
const searchInput = document.getElementById('searchInput');
const loadingSpinner = document.getElementById('loadingSpinner');
const mensaje = document.getElementById('mensaje');

let allGames = [];

// Cargar videojuegos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadGames();
    setupEventListeners();
});

// Configurar listeners
function setupEventListeners() {
    addForm.addEventListener('submit', handleAddGame);
    editForm.addEventListener('submit', handleEditGame);
    closeModal.addEventListener('click', closeEditModal);
    searchInput.addEventListener('input', handleSearch);

    // Cerrar modal al hacer click fuera
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
}

// Cargar todos los videojuegos
async function loadGames() {
    try {
        loadingSpinner.style.display = 'block';
        gamesList.innerHTML = '';

        const response = await fetch(API_URL);
        allGames = await response.json();

        loadingSpinner.style.display = 'none';

        if (allGames.length === 0) {
            gamesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No hay videojuegos en el catálogo</p>';
            return;
        }

        displayGames(allGames);
    } catch (error) {
        console.error('Error al cargar videojuegos:', error);
        loadingSpinner.innerHTML = '❌ Error al conectar con el servidor';
    }
}

// Mostrar videojuegos
function displayGames(games) {
    gamesList.innerHTML = '';

    if (games.length === 0) {
        gamesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No se encontraron videojuegos</p>';
        return;
    }

    games.forEach(game => {
        const gameCard = createGameCard(game);
        gamesList.appendChild(gameCard);
    });
}

// Crear tarjeta de videojuego
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <h3>${game.nombre}</h3>
        <div class="game-info">
            <p><strong>Género:</strong> ${game.genero}</p>
            <p><strong>Plataforma:</strong> ${game.plataforma}</p>
        </div>
        <div class="game-price">$${parseFloat(game.precio).toFixed(2)}</div>
        <div class="game-actions">
            <button class="btn btn-edit" onclick="openEditModal(${game.id})">✏️ Editar</button>
            <button class="btn btn-delete" onclick="deleteGame(${game.id})">🗑️ Eliminar</button>
        </div>
    `;
    return card;
}

// Agregar nuevo videojuego
async function handleAddGame(e) {
    e.preventDefault();

    const formData = {
        nombre: document.getElementById('nombre').value,
        genero: document.getElementById('genero').value,
        plataforma: document.getElementById('plataforma').value,
        precio: parseFloat(document.getElementById('precio').value)
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showMessage('✅ Videojuego agregado correctamente', 'success');
            addForm.reset();
            loadGames();
        } else {
            showMessage('❌ Error al agregar el videojuego', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('❌ Error de conexión', 'error');
    }
}

// Abrir modal de edición
async function openEditModal(id) {
    const game = allGames.find(g => g.id === id);
    if (!game) return;

    document.getElementById('editId').value = game.id;
    document.getElementById('editNombre').value = game.nombre;
    document.getElementById('editGenero').value = game.genero;
    document.getElementById('editPlataforma').value = game.plataforma;
    document.getElementById('editPrecio').value = game.precio;

    editModal.style.display = 'block';
}

// Cerrar modal de edición
function closeEditModal() {
    editModal.style.display = 'none';
    editForm.reset();
}

// Editar videojuego
async function handleEditGame(e) {
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const formData = {
        nombre: document.getElementById('editNombre').value,
        genero: document.getElementById('editGenero').value,
        plataforma: document.getElementById('editPlataforma').value,
        precio: parseFloat(document.getElementById('editPrecio').value)
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showMessage('✅ Videojuego actualizado correctamente', 'success');
            closeEditModal();
            loadGames();
        } else {
            showMessage('❌ Error al actualizar el videojuego', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('❌ Error de conexión', 'error');
    }
}

// Eliminar videojuego
async function deleteGame(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este videojuego?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showMessage('✅ Videojuego eliminado correctamente', 'success');
            loadGames();
        } else {
            showMessage('❌ Error al eliminar el videojuego', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('❌ Error de conexión', 'error');
    }
}

// Buscar videojuegos
function handleSearch(e) {
    const query = e.target.value.toLowerCase();

    const filtered = allGames.filter(game =>
        game.nombre.toLowerCase().includes(query) ||
        game.genero.toLowerCase().includes(query) ||
        game.plataforma.toLowerCase().includes(query)
    );

    displayGames(filtered);
}

// Mostrar mensajes
function showMessage(text, type) {
    mensaje.textContent = text;
    mensaje.className = `mensaje ${type}`;

    setTimeout(() => {
        mensaje.className = 'mensaje';
    }, 3000);
}
