import checkTypeInputs from './checkTypeInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelector('#width'),
          windowHeight = document.querySelector('#height'),
          windowType = document.querySelector('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkTypeInputs('#width', '[^\\d]+');
    checkTypeInputs('#height', '[^\\d]+');

    function bindActionToElements(event, element, property) {
        if(NodeList.prototype.isPrototypeOf(element)) {
            element.forEach((item, key) => {
                _bindSingleElement(item, event, property, key, element);
            });
        }
        else {
            _bindSingleElement(element, event, property);
        }

    };

    function _bindSingleElement(element, event, property, key = false, elements = {}) {
        element.addEventListener(event, () => {
            switch(element.nodeName) {
                // type of window
                case 'SPAN':
                    state[property] = key;
                    break;
                // profile of window
                case 'INPUT':
                    if(element.getAttribute('type') === 'checkbox') {
                        state[property] = key === 0 ? "Холодное" : "Теплое";
                        elements.forEach((box, j) => {
                            box.checked = key === j ? true : false;                            
                        });
                    }
                    else {
                        state[property] = element.value;
                    }
                    break;
                case 'SELECT': {
                    state[property] = element.value;
                    break;
                }
            }
        });
    }

    bindActionToElements('click', windowForm, 'form');
    bindActionToElements('input', windowWidth, 'width');
    bindActionToElements('input', windowHeight, 'height');
    bindActionToElements('change', windowType, 'type');
    bindActionToElements('change', windowProfile, 'profile');
};

export default changeModalState;