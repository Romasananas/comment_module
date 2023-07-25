const dropdownList = document.querySelectorAll('.dropdown');
dropdownList.forEach(function(dropdown) {
    const btn = dropdown.querySelector('.dropdown_btn');
    const list = dropdown.querySelector('.dropdown_list');
    const listItems = dropdown.querySelectorAll('.dropdown_list-item');

    btn.addEventListener('click', function() {
        list.classList.toggle('hide');
        this.classList.toggle('active');
        this.classList.toggle('arrow_up');
        console.log(dropdownList);
    });

    listItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            const input = dropdown.querySelector('.dropdown_input-hidden');
            btn.innerText = this.innerText;
            list.classList.add('hide');
            btn.classList.toggle('arrow_up');
            input.value = this.dataset.value;

        })
    })

    document.addEventListener('click', function(e) {
        if (e.target !== btn) {
            list.classList.add('hide');
            btn.classList.remove('active');
            btn.classList.remove('arrow_up');
        }
    })

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            list.classList.add('hide');
            btn.classList.remove('active');
            btn.classList.add('arrow_up');
        }
    })
})


