# Обновление объявлений

## Подготовка

1. Настроить пути для phantomjs и casper.js
    1. Зайти в Панель управления → Система и безопасность → Система
    2. Перейти в Дополнительные параметры системы → Дополнительно → Переменные среды
    3. В блоке "Системные переменные" в переменную Path добавить пути до
        phantomjs\bin и node_modules\casperjs\bin.
        Брать пути через проводник. В путях должны быть только английские сбуквы.

## Запуск
1. Запустить коммандную строку и перейти в папку updatingAds
2. Чтобы запустить обновления объявлений для сайтов, где нужно обновлять
 1 раз в час постоянно, в коммендной строке выполнить
```
casperjs index.js
```
3. Чтобы запустить обновления объявлений для сайтов,
    у которых особое расписание обновления объявлений,
    в отдельной коммендной строке выполнить
   ```
   casperjs updateAdsByTyme.js
   ```
## Прочее
- Предпочтительнее использовать консоль ConEmu
- Для отображения русских символов к ConEmu в Settings→Environment под строкой PATH=
выставьте значение
```
chcp utf8
```