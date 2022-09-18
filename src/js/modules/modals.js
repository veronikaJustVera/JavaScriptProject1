const modals = () => {
    /**
     * Bind modal ligic to elements
     * @param {string} evt - trigger modal event ('click')
     * @param {string} triggerSelector 
     * @param {string} modalSelector 
     * @param {string} closeSelector 
     */
    function bindModal(evt, triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, needCheckInputs = false, checkInputsParentSelector = '') {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelectorAll(closeSelector);
            

        trigger.forEach(item => {
            item.addEventListener(evt, e => {
                // reset open links
                if(e.target) {
                    e.preventDefault();
                }
                // check if required inputs filled in previous window
                let inputsChecked = true;
                if(needCheckInputs && checkInputsParentSelector) {
                    const inputsForCheck = document.querySelectorAll(checkInputsParentSelector + ' input');
                    inputsForCheck.forEach(inputForCheck => {
                        if(!inputForCheck.value && inputsChecked) {
                            const errorElement = document.createElement('div');
                            errorElement.classList.add('status', 'modal-error');
                            errorElement.textContent = "Ошибка! Заполните поля";
                            inputForCheck.parentElement.after(errorElement);
                            setTimeout(() => {
                                errorElement.style.display = 'none';
                            }, 2000);
                            return inputsChecked = false;
                        }
                    });
                }
                if(inputsChecked) {
                    _closeAllModals();
                    // show modal
                    _toggleModal(modal);
                }
            });
        });
        // close modal
        close.forEach(item => {
            item.addEventListener(evt, () => {
                _closeAllModals();
                _toggleModal(modal, false);
            });
        });
        modal.addEventListener(evt, e => {
            if(e.target === modal && closeClickOverlay) {
                _closeAllModals();
                _toggleModal(modal, false);
            }
        });
    }
    /**
     * Show modal after spending some time on site
     * @param {string} modalSelector
     * @param {integer} time 
     */
    function showWaitingModal(modalSelector, time) {
        setTimeout(() => {
            _toggleModal(document.querySelector(modalSelector));
        }, time);
    }

    /**
     * @returns scrollbar width (px)
     */
    function _calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        div.style.overflowY = 'scroll';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();
        return scrollWidth;
    }
    const scrollValue = _calcScroll();

    /**
     * Show/hide modal
     * @param {node} modal 
     * @param {boolean} show 
     */
    function _toggleModal(modal, show = true) {
        modal.style.display = show ? 'block' : 'none';
        document.body.classList.toggle('modal-open');
        document.body.style.paddingRight = show ? scrollValue + 'px' : '0px';
    }
    function _closeAllModals() {
        const modalsElements = document.querySelectorAll('[data-modal]');
        modalsElements.forEach(modalsElement => {
            modalsElement.style.display = 'none';
        });
    }

    showWaitingModal('.popup_call', 3000);
    bindModal('click', '.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('click', '.trigger_call_popup', '.popup_call', '.popup_call .popup_close');
    bindModal('click', '.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('click', '.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, true, '.popup_calc');
    bindModal('click', '.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
}; 
export default modals;