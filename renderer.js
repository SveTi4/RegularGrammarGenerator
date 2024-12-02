console.log('Приложение запущено');

function showAuthor() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Автор</h2>
    <p>Милорд, разработчик данного приложения.</p>
  `;
}

function showTopic() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Тема</h2>
    <p>Программа строит ДКА по описанию языка и проверяет цепочки.</p>
  `;
}

function selectInputMethod() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Выбор данных</h2>
    <p>Пока эта функция в разработке.</p>
  `;
}

function startCalculation() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Расчёты</h2>
    <p>Здесь будут отображаться результаты проверки цепочек.</p>
  `;
}

function saveResults() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Запись результатов</h2>
    <p>Функция записи в файл пока не реализована.</p>
  `;
}

function showHelp() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Справка</h2>
    <p>В справке будет описан формат ввода данных и примеры цепочек.</p>
  `;
}
