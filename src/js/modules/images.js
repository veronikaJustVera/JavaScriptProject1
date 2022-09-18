const images = () => {
    const imagePopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img');

    imagePopup.classList.add('popup', 'popup_img');
    workSection.appendChild(imagePopup);
    imagePopup.appendChild(bigImage);

    workSection.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;

        if(target && target.classList.contains('preview')) {
            _toggleImagePopup();
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
        }

        if(target && target.matches('div.popup_img')) {
            _toggleImagePopup(false);
        }

        function _toggleImagePopup(show = true) {
            imagePopup.style.display = show ? 'flex' : 'none';
        }
    });
};
export default images;