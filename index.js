document.addEventListener('DOMContentLoaded', () => {

    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === current) link.classList.add('active');
    });


    const menCatalog = document.getElementById('men-catalog');
    if (menCatalog) {
        const menItems = [
            {img:'img/rub white.jpg', title:'Белая рубашка', desc:'Классическая белая рубашка из хлопка.'},
            {img:'img/jeans.jpg', title:'Джинсы', desc:'Удобные синие джинсы прямого кроя.'},
            {img:'img/leather jacket.jpg', title:'Кожаная куртка', desc:'Черная куртка из натуральной кожи.'},
            {img:'img/vetrovka.jpg', title:'Ветровка осенняя', desc:'Необходимая вещь осенью.'},
            {img:'img/classic trousers.jpg', title:'Классические брюки', desc:'База каждого гардероба.'}
        ];
        menItems.forEach(item => {
            menCatalog.insertAdjacentHTML('beforeend', `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="card h-100">
            <img src="${item.img}" class="card-img-top img-fluid" alt="${item.desc}" title="${item.title}">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.desc}</p>
              <label>Количество:
                <input type="number" min="0" value="0" data-name="${item.title}" class="form-control form-control-sm">
              </label>
            </div>
          </div>
        </div>`);
        });

        document.getElementById('orderAllMen').addEventListener('click', () => collectAndSearch('#men-catalog'));
    }


    const womenCatalog = document.getElementById('women-catalog');
    if (womenCatalog) {
        const womenItems = [
            {img:'img/dvybort.jpg', title:'Двубортное пальто', desc:'Стильный элемент одежды для ваших образов.'},
            {img:'img/trench.jpg', title:'Тренч', desc:'Необходимо в дождливую погоду.'},
            {img:'img/women pyx.jpg', title:'Зимнее пальто на пуху', desc:'Чтобы любая погода была нипочем.'},
            {img:'img/everydaydress.jpg', title:'Платье на каждый день', desc:'Голубое платье с пуговицами.'},
            {img:'img/office dress.jpg', title:'Офисное платье', desc:'Строгое черное платье с поясом.'},
            {img:'img/eveningdress.jpg', title:'Вечернее платье', desc:'Бежевое вечернее воздушное платье.'}
        ];
        womenItems.forEach(item => {
            womenCatalog.insertAdjacentHTML('beforeend', `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="card h-100">
            <img src="${item.img}" class="card-img-top img-fluid" alt="${item.desc}" title="${item.title}">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.desc}</p>
              <label>Количество:
                <input type="number" min="0" value="0" data-name="${item.title}" class="form-control form-control-sm">
              </label>
            </div>
          </div>
        </div>`);
        });

        document.getElementById('orderAllWomen').addEventListener('click', () => collectAndSearch('#women-catalog'));
    }

    function collectAndSearch(selector) {
        const inputs = document.querySelectorAll(`${selector} input[type="number"]`);
        const queryParts = [];
        inputs.forEach(inp => {
            const qty = Number(inp.value);
            if (qty > 0) queryParts.push(`${inp.dataset.name}:${qty}`);
        });

        if (queryParts.length === 0) {
            alert('Выберите хотя бы один товар.');
            return;
        }

        const query = encodeURIComponent(queryParts.join(', '));
        const yandexUrl = `https://ya.ru/search/?text=${query}`;
        window.open(yandexUrl, '_blank');
    }

    const sendBtn = document.getElementById('sendOrder');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const form = document.getElementById('orderForm');
            const inputs = form.querySelectorAll('input');
            const result = [];

            let isValid = true;
            inputs.forEach(inp => {

                if (inp.type === 'text') {
                    if (!inp.value.trim()) {
                        alert('Введите название товара');
                        inp.focus();
                        isValid = false;
                        return;
                    }
                }
                if (inp.type === 'number') {
                    if (!inp.value || Number(inp.value) < 1) {
                        alert('Введите корректное количество (1 или больше)');
                        inp.focus();
                        isValid = false;
                        return;
                    }
                }
                if (inp.type === 'radio') {
                    const radios = form.querySelectorAll(`input[name="${inp.name}"]`);
                    const oneChecked = Array.from(radios).some(r => r.checked);
                    if (!oneChecked) {
                        alert('Выберите способ оплаты');
                        isValid = false;
                        return;
                    }
                }
            });

            if (!isValid) return;
            inputs.forEach(inp => {
                if (inp.type === 'radio' && !inp.checked) return;
                result.push(`${inp.name}:${inp.value}`);
            });

            const query = encodeURIComponent(result.join(', '));
            const yandexUrl = `https://ya.ru/search/?text=${query}`;
            window.open(yandexUrl, '_blank');
        });
    }


});
