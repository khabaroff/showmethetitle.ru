# showmethetitle.ru

<img src="showmethetitle.gif" alt="showmethetitle.ru" width="100%" />

Пародия на проекты с кликбейт-заголовками, которые провоцируют клики.

Запущен 1 апреля 2015 года.

Изначально тексты генерировались из трех частей: 20 вариантов начала, 112 вариантов продолжения и 105 вариантов завершения. Это давало больше 230 тысяч комбинаций.

За первую неделю зашло больше 40 тысяч пользователей, накликали больше 400 тысяч рефрешей и пошерили больше 4000 раз в Facebook. Навальный твитнул.

В текущем обновлении 2026:
- Vite вместо legacy Gulp-сборки
- vanilla JS без jQuery и Google Analytics
- тексты в [`src/data/titles.json`](src/data/titles.json)
- адаптивная типографика с `clamp()` и дополнительным fit-проходом

Продакшен URL: <https://khabaroff.com/showmethetitle.ru/>

История проекта: <https://khabaroff.com/showmethetitle-ru/>

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm test
npm run build
```

Готовая статика собирается в `dist/`.

## Авторы

- Сергей Хабаров: прогинг, верстка, тексты
- Вася Подтынников: дизайн, тексты
- Женя Орешин: тексты
- Саша Баталов: супервайзинг и советы

Обновленные сорсы на GitHub: <https://github.com/khabaroff/showmethetitle.ru>
