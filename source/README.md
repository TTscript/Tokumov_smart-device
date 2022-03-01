Для того чтобы запустить сборку проекта необходимо установить зависимости командой - npm i. 

После установки для запуска сборки применяется команда npm run build.
Для запуска локального сервера npm start.

Проверить проект на наличие ошибок - npm test.
Для корректной работы тестирования необходимо зайти в корень проекта затем зайти в папку node_modules -> stylelint-config-htmlacademy -> node_modules -> stylelint-config-recommended -> index.js -> удалить 19 строку (название строки: 'function-calc-no-invalid': true,) и сохранить изменения.

Кроме того, необходимо проделать похожую процедуру для другой папки - node_modules -> stylelint-config-htmlacademy -> index.js -> удалить 45 строку (название строки: 'property-no-vendor-prefix': true,) и сохранить изменения.
