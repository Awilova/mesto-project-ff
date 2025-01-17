# Место
### Описание
Интерактивный проект об интересных местах нашей планеты на JS.
### Особенности
- проект выполнен адаптивным под различное разрешение устройств;
- использованы флексбокс-вёрстка, гриды;
- наименование блоков, элементов, а также файловая структура соответствуют методологии БЭМ;
- проект выполнен на JavaScript;
- используются массивы для заполнения однотипных карточек мест;
- реализованы попап-формы для редактирования профиля, фото профиля, добавления карточки;
- закрытие форм реализовано по нажатию на крестик, "esc", оверлэй;
- реализован функционал валидации форм;
- сборка проекта выполнена сборщиком Webpack;
- настроено подключение сайта к серверу, запросы отправляются на сервер и получаются ответы от сервера, обрабатываются необходимым образом. 
### Установка и запуск
Клонируйте репозиторий и перейдите в его директорию:
```
git clone git@github.com:Awilova/mesto-project-ff.git
cd mesto-project-ff
```
Установите зависимости:
```
npm ci
```
Соберите проект:
```
npm run build
```
Для запуска в режиме разработки выполните команду:
```
npm run dev
```
Приложение будет доступно по адресу: [http://localhost:8080](http://localhost:8080)
