## Виджет Погода 
Реализован с использованием фреймворка Vue.js. Для написания CSS использован препроцессор Sass/SCSS. Данные о погоде берутся с открытого [API](https://openweathermap.org/api).  

### Функционал:
- при загрузке виджета отображается информация о погоде в соответствии с текущим местоположением пользователя;
- виджет можно настроить. Есть возможность добавлять и удалять локации. Порядок отображения локаций можно менять путём перетаскивания соответствующей строки в списке локаций;
- настройки виджета сохраняются при перезагрузке страницы.

## Развернуть локально:  
1. Скопируйте репозиторий, выполнив в термиале команду:  
`$ git clone https://github.com/EvgeniyL0/weather-widget.git`.  
  
2. Установите необходимые пакеты: `$ npm install`.  
  
3. Выполните команду: `$ npm run build`.  
  
4. Для демонстрации работы виджета откройте файл `demo.html` в папке `dist` в каталоге проекта.  
  
5. Для использования виджета вставьте элемент `<weather-widget></weather-widget>` в нужное место на своей странице, подключите `weather-widget.js` (или его минифицированную версию):  
```HTML
<script src="https://unpkg.com/vue"></script>
<script src="path/to/weather-widjet.js"></script>
<!-- Разметка -->
<weather-widget></weather-widget>
<!-- Разметка -->```