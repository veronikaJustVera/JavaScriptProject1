const tabs = () => {
    /**
     * Bind tabs logic to elements
     * @param {string} headerSelector - tabs parent
     * @param {string} tabSelector - tabs selector
     * @param {string} contentSelector - content to show
     * @param {string} activeClass - class add to active tab (without '.')
     * @param {string} displayValue - css property display that apply to content
     */
    function bindTabs(headerSelector, tabSelector, contentSelector, activeClass, displayValue = 'block') {
        const header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);

        _hideTabContent();
        _showTabContent();

        header.addEventListener('click', e => {
            const target = e.target,
                  tabClassName = tabSelector.split('.').join('');

            if(target &&
              (target.classList.contains(tabClassName) || 
               target.parentNode.classList.contains(tabClassName))) 
            {
                tab.forEach((item, key) => {
                    if(target == item || target.parentNode == item) {
                        _hideTabContent();
                        _showTabContent(key);
                    }
                });
            }
        });
        /**
         * Hide all tabs
         */
        function _hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });
            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }
        /**
         * Show tab by its order (by default - first tab)
         * @param {integer} order - number of tab that should be shown
         */
        function _showTabContent(order = 0) {
            content[order].style.display = displayValue;
            tab[order].classList.add(activeClass);
        }
    }

    bindTabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    bindTabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    bindTabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
};
export default tabs;