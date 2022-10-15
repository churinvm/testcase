// Проверка введенных данных с помощью регулярных выражений
function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
// Обработка действий формы
$(document).ready(function () {
    $('#NumberForm').on('submit', function (event) {
        event.preventDefault();
        let numberForSend = $('#numberForSend').val();
        // Проверяем введенное число на стороне пользователя
        if (isNumber(numberForSend)) {
            // Отправляем введенное число на сторону сервера для повторной проверки и формарования адреса АПИ запроса
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: '/checknumber',
                type: "POST",
                data:{ "numberForSend": numberForSend },
            success: function (response) {
                    // Отправляем запрос по адресу и получаем описание числа
                $.ajax({
                    url: response,
                    type: "GET",
                    success: function (response) {
                        // Выводим информацию о числе на странице
                        document.getElementById("numberDiscription").innerHTML = response;
                    },
                    error: function(response){
                        alert('Ошибка связи с АПИ сервером');
                    }
                });
            },
                error: function(response){
                    alert("Ошибка проверки введенного числа");
                }
        });
        }
        else{
            alert("Ошибка проверки числа");
            document.getElementById("numberDiscription").innerHTML = "Это просто удивительно, но "
                + numberForSend + " - не прошло наших многократных проверок и не соответствует нашим требованиям.";
        };
    });
    $("#getTestInfo").click(function(e) {
        const contentHTML = "<h1><strong>Тестовое задание</strong></h1>\n" +
            "<h2><strong>Проверка следующих навыков:</strong></h2>\n" +
            "<ul>\n" +
            "<li>Понимание MVC подхода</li>\n" +
            "<li>Знание php, js, css, html (приветствуются фреймворки и библиотеки)</li>\n" +
            "<li>Понимания принципов работы API</li>\n" +
            "</ul>\n" +
            "<h2><strong>Задание</strong></h2>\n" +
            "<p>Создать, стилизованную страницу (возможно использование фреймворков, например bootstrap) с формой ввода числа.</p>\n" +
            "<p>Форма отправляется средствами ajax без перезагрузки страницы.</p>\n" +
            "<p>Сделать валидацию формы на стороне html и на серверной стороне. Выводить информацию об ошибке на страницу.<br /> <br /> Серверная часть должна иметь подход MVC, можно использовать framework codeigniter или lavarel.</p>\n" +
            "<p>Используя число, полученное с формы, используя API <a href=\"http://numbersapi.com/#42\">http://numbersapi.com/#42</a>, вывести информацию о числе на страницу без перезагрузки страницы</p>\n" +
            "<h2><strong>Отчёт</strong></h2>\n" +
            "<p>Отчёт предоставить в виде архива.</p>"
        document.getElementById("infoHTML").innerHTML = contentHTML;
    });
    $("#getTestExecutionInfo").click(function(e) {
        const contentHTML = "<h2><strong>Выполнение</strong></h2>\n" +
            "<ol>\n" +
            "<li>Установка свежего Laravel</li>\n" +
            "<li>Добавление контроллера NumberController</li>\n" +
            "<li>Редактирование routes</li>\n" +
            "<li>Редактирование шаблона главной стараницы</li>\n" +
            "<li>Вынос скриптов в отдельный файл</li>\n" +
            "<li>Создание репозитория Git</li>\n" +
            "<li>Выкладка на сервер</li>\n" +
            "</ol>\n" +
            "<h2><strong>Итоги</strong></h2>\n" +
            "<p>Настройка установка - 20 минут</p>\n" +
            "<p>На первичную реализацию ушло - 40 минут</p>\n" +
            "<p>Написание поясняющих комментариев и информационной части - 20 минут</p>\n" +
            "<p>Декомпозиция по классам и файлам - 40 минут</p>\n" +
            "<p>Настройка сервера на 1ГБ - 20 минут</p>\n" +
            "<p>Выкладка на сервер в режиме продакшин и на GitHub  - 20 минут</p>" +
            "<h2><strong>Общее время выполнения: 2 часа 20 минут</strong></h2>\n"


        document.getElementById("infoHTML").innerHTML = contentHTML;
    });
    $("#clearTestInfo").click(function(e) {
        document.getElementById("infoHTML").innerHTML = "";
    });
});

