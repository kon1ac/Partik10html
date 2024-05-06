function addNewFilm() {
    var title = document.getElementById('Название').value;
    var director = document.getElementById('Режиссер').value;
    var year = document.getElementById('Год').value;

    if (title && director && year) {
        var film = {
            title: title,
            director: director,
            year: year
        };

        var filmsList = JSON.parse(localStorage.getItem('films')) || [];
        filmsList.push(film);
        localStorage.setItem('films', JSON.stringify(filmsList));

        document.getElementById('Название').value = '';
        document.getElementById('Режиссер').value = '';
        document.getElementById('Год').value = '';

        displayFilms();
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}

function displayFilms() {
    var filmsList = JSON.parse(localStorage.getItem('films')) || [];
    var filmsListContainer = document.getElementById('films-list');
    filmsListContainer.innerHTML = '';

    if (filmsList.length === 0) {
        filmsListContainer.innerHTML = '<p>Нет фильмов для отображения.</p>';
    } else {
        var html = '<ul>';
        filmsList.forEach(function(film, index) {
            html += '<li>' + film.title + ' - ' + film.director + ' (' + film.year + ')' +
                '<button class="btn btn-sm btn-primary mr-2" onclick="editFilm(' + index + ')">Изменить</button>' +
                '<button class="btn btn-sm btn-danger" onclick="deleteFilm(' + index + ')">Удалить</button>' +
                '</li>';
        });
        html += '</ul>';
        filmsListContainer.innerHTML = html;
    }
}

function editFilm(index) {
    var filmsList = JSON.parse(localStorage.getItem('films')) || [];
    var film = filmsList[index];
    var newTitle = prompt('Введите новое название', film.title);
    var newDirector = prompt('Введите нового режиссера', film.director);
    var newYear = prompt('Введите новый год', film.year);

    if (newTitle && newDirector && newYear) {
        film.title = newTitle;
        film.director = newDirector;
        film.year = newYear;
        filmsList[index] = film;

        localStorage.setItem('films', JSON.stringify(filmsList));
        displayFilms();
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}

function deleteFilm(index) {
    var confirmation = confirm('Вы уверены, что хотите удалить этот фильм?');
    if (confirmation) {
        var filmsList = JSON.parse(localStorage.getItem('films')) || [];
        filmsList.splice(index, 1);
        localStorage.setItem('films', JSON.stringify(filmsList));
        displayFilms();
    }
}

window.onload = function() {
    displayFilms();
};
