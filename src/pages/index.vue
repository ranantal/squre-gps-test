<template>
  <section class="about">
    <h1 class="header-1">
      Тестовое задание SquareGPS
    </h1>

    <p class="text">
      Необходимо с помощью <strong>Vuejs, Vuex, VueRouter, Vuetify</strong> написать приложение. Хэдер
      приложения должен содержать меню из 2-х пунктов: <strong>О задании</strong> и <strong>Карта</strong>. В основной
      части приложения должно отображаться содержимое разделов.
    </p>

    <h2 class="header-2">
      Раздел “О задании”
    </h2>

    <p class="text">
      В разделе должен быть текст этого задания, сверстанный аналогично.
    </p>

    <h2 class="header-2">
      Раздел “Карта”
    </h2>

    <p class="text">
      На экране должны быть карта и список (см. пример):
    </p>

    <ol>
      <li class="text">
        При клике на кнопку добавления, карта должна перейти в режим добавления
        маркера: в месте клика должен появится маркер, а в списке - запись с адресом
        точки.

        <ol class="inner-list">
          <li class="text">
            Для поиска адреса можно использовать любое бесплатное API для
            геокодирования, например: https://geocode.maps.co/.
          </li>
          <li class="text">
            В случае, если адрес не найден, необходимо вывести ошибку и не
            добавлять маркер в список.
          </li>
        </ol>
      </li>

      <li class="text">
        При клике на маркер должна подсвечиваться запись в списке.
      </li>

      <li class="text">
        При клике на запись в списке карта должна центрироваться на маркере.
      </li>

      <li class="text">
        Маркеры должны храниться локально и не пропадать после перезагрузки
        страницы.
      </li>

      <li class="text">
        В адресной строке должен отображаться id выбранного маркера.
      </li>
    </ol>

    <p class="text">
      Локальное хранение данных должно быть организовано в виде сервиса,
      эмулирующего бекенд. (Необходим класс Backend, который псевдо-асинхронно
      сохраняет данные в localStorage)
    </p>

    <p class="text">
      <strong>
        Дополнительно:
      </strong>
    </p>

    <ol>
      <li class="text">
        Продумать отображение на мобильных устройствах.
      </li>

      <li class="text">
        Предусмотреть локализацию.
      </li>

      <li class="text">
        Необходимо с помощью <strong>jest</strong> написть 1 модульный тест на любой компонент.
      </li>
    </ol>

    <p class="text">
      <strong>Напоминание:</strong> тестовое задание призвано показать умение писать хороший
      модульный код, а также умение пользоваться указанными технологиями и не только.
      Этим кодом нужно гордиться.
    </p>

    <p class="text">
      Пример:
    </p>
    <img alt="Example" class="example-image" src="/example.jpeg">
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
ol {
  margin-left: 16px;
}

.header-1 {
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 500;
}

.header-2 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 400;
}

.text {
  margin-bottom: 8px;
  font-size: 11px;
}

.inner-list {
  margin-top: 8px;
  list-style-type: lower-alpha;
}

.about {
  display: flex;
  flex-direction: column;;
  padding: 32px;
}

.example-image {
  margin: 0 auto;
  width: 538px;
}

@media (max-width: 600px) {
  .about {
    padding: 16px;
  }
  
  .example-image {
    width: 100%;
    max-width: 400px;
  }
}
</style>
