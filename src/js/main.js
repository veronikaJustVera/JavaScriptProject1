import './slider';
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';


window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    let modalState = {};
    changeModalState(modalState);

    modals();
    tabs();
    images();
    forms(modalState);

    let deadline = '2022-12-31';
    timer('.container1', deadline);
});