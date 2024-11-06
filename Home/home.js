function zoomImage(element) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = element.querySelector('img').src;
    modal.style.display = 'flex';
}

function closeZoom() {
    document.getElementById('modal').style.display = 'none';
}
