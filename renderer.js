// // Функция для отображения информации об авторе
// window.showAuthorInfo = function () {
//   const contentDiv = document.getElementById('content');
//   contentDiv.innerHTML = `
//     <h2>Автор</h2>
//     <p>Разработчик: Милорд.</p>
//     <p>Email: example@example.com</p>
//   `;
//   console.log('Кнопка "Автор" нажата');
// };
//
// // Функция для отображения информации о теме
// window.showTopicInfo = function () {
//   const contentDiv = document.getElementById('content');
//   contentDiv.innerHTML = `
//     <h2>Тема</h2>
//     <p>Визуализация конечного детерминированного автомата (DFA).</p>
//   `;
//   console.log('Кнопка "Тема" нажата');
// };
//
// // Функция для установки метода ввода данных
// window.setDataInputMethod = function (method) {
//   const contentDiv = document.getElementById('content');
//   if (method === 'keyboard') {
//     contentDiv.innerHTML = `
//       <h2>Ввод данных с клавиатуры</h2>
//       <form id="data-form">
//         <label for="dfa-input">Введите описание DFA:</label><br>
//         <textarea id="dfa-input" rows="5" cols="30" placeholder="Формат: ..."></textarea><br><br>
//         <button type="button" onclick="submitKeyboardData()">Отправить</button>
//       </form>
//     `;
//   } else if (method === 'file') {
//     contentDiv.innerHTML = `
//       <h2>Чтение данных из файла</h2>
//       <input type="file" id="file-input" accept=".txt">
//       <button type="button" onclick="submitFileData()">Загрузить</button>
//     `;
//   }
//   console.log(`Метод задания данных: ${method}`);
// };
//
// // Функция для выполнения расчётов
// window.performCalculations = function () {
//   const contentDiv = document.getElementById('content');
//   contentDiv.innerHTML = `
//     <h2>Расчёты</h2>
//     <p>Здесь будут отображены результаты расчётов DFA.</p>
//   `;
//   console.log('Кнопка "Расчёты" нажата');
// };
//
// // Функция для записи результатов в файл
// window.saveResults = function () {
//   const contentDiv = document.getElementById('content');
//   contentDiv.innerHTML = `
//     <h2>Запись результатов</h2>
//     <p>Результаты записаны в файл.</p>
//   `;
//   console.log('Кнопка "Запись результатов" нажата');
// };
//
// // Функция для обработки данных, введённых с клавиатуры
// window.submitKeyboardData = function () {
//   const inputData = document.getElementById('dfa-input').value;
//   if (!inputData) {
//     alert('Введите данные!');
//     return;
//   }
//   const contentDiv = document.getElementById('content');
//   contentDiv.innerHTML = `
//     <h2>Данные получены</h2>
//     <p>${inputData}</p>
//   `;
//   console.log('Данные с клавиатуры отправлены:', inputData);
// };
//
// // Функция для обработки данных из файла
// window.submitFileData = function () {
//   const fileInput = document.getElementById('file-input');
//   const file = fileInput.files[0];
//
//   if (!file) {
//     alert('Выберите файл!');
//     return;
//   }
//
//   const reader = new FileReader();
//   reader.onload = function (event) {
//     const contentDiv = document.getElementById('content');
//     contentDiv.innerHTML = `
//       <h2>Данные из файла</h2>
//       <pre>${event.target.result}</pre>
//     `;
//     console.log('Данные из файла:', event.target.result);
//   };
//   reader.readAsText(file);
// };
