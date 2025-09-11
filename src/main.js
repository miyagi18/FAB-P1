// Модальное окно
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialogBtn');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие модалки
openBtn?.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модалки
closeBtn?.addEventListener('click', () => dlg.close('cancel'));

// Закрытие по клику на бэкдроп
dlg?.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close('cancel');
});

// Возврат фокуса после закрытия
dlg?.addEventListener('close', () => {
    lastActive?.focus();
});

// Валидация формы
form?.addEventListener('submit', (e) => {
    // Сброс кастомных сообщений
    [...form.elements].forEach(el => {
        el.setCustomValidity?.('');
        el.removeAttribute('aria-invalid');
    });

    // Проверка валидности
    if (!form.checkValidity()) {
        e.preventDefault();
        
        // Показ ошибок
        [...form.elements].forEach(el => {
            if (el.willValidate && !el.checkValidity()) {
                el.setAttribute('aria-invalid', 'true');
                
                // Кастомные сообщения
                if (el.validity.valueMissing) {
                    el.setCustomValidity('Это поле обязательно для заполнения');
                } else if (el.validity.typeMismatch) {
                    el.setCustomValidity('Пожалуйста, введите корректное значение');
                } else if (el.validity.patternMismatch) {
                    el.setCustomValidity('Пожалуйста, соблюдайте требуемый формат');
                }
            }
        });
        
        form.reportValidity();
        return;
    }

    // Успешная отправка
    e.preventDefault();
    alert('Форма успешно отправлена!');
    dlg.close('success');
    form.reset();
});

// Маска для телефона (дополнительное задание)
const phone = document.getElementById('phone');
phone?.addEventListener('input', (e) => {
    const input = e.target;
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('8')) {
        value = '7' + value.slice(1);
    }
    
    if (value.startsWith('7') && value.length > 1) {
        let formattedValue = '+7 (';
        
        if (value.length > 1) {
            formattedValue += value.slice(1, 4);
        }
        
        if (value.length >= 4) {
            formattedValue += ') ';
        }
        
        if (value.length >= 5) {
            formattedValue += value.slice(4, 7);
        }
        
        if (value.length >= 8) {
            formattedValue += '-' + value.slice(7, 9);
        }
        
        if (value.length >= 10) {
            formattedValue += '-' + value.slice(9, 11);
        }
        
        input.value = formattedValue;
    }
});