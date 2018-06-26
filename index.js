const url = 'https://api.jikan.moe/anime/1/episodes';
const modalCont = document.getElementById('modal');

axios.get(url)
    .then(response => response.data.episode)
    .then(renderEpisodesList)
    
function renderEpisodesList(episodes) {
    const list = episodes.map(episode => { 
        return `
            <span style="display: block;" href="" data-id="${episode.id}">${episode.title}</span>
        `}).join('');
    
    app.innerHTML = `<div> ${list} </div>`
    addListeners();    
}

function addListeners() {
    document.querySelectorAll('span').forEach(elem => {
        elem.addEventListener('click', () => {
            const id = elem.dataset.id;
            axios.get(`${url}/${id}`)
                .then(response => response.data)
                .then(renderModal) 
        });
    });
}

function renderModal(data) {
    const modal = `
        <div class="modal-container">
            <div class="inner-modal">
                <img src="${data.image_url}"/>
                <div class="text">
                    ${data.background}
                </div>
                <div class="reting">${data.rating}</div>
                <i class="close-modal">Close</i>
            </div>
        </div> 
    `;
    
    modalCont.innerHTML += modal;
    modalCont.style = 'display: block;'
    document.querySelector('.close-modal').addEventListener('click', () => {
        modalCont.innerHTML = '';
        modalCont.style = '';
        });
}
