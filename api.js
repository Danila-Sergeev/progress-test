import { setAnimated, setHidden, setValue } from "./index.js";

// API Progress Block
const progressBlock = {
  // Установка значения прогресса
  setValue: function (value) {
    setValue(value);
  },

  // Запуск анимации
  startAnimation: function () {
    setAnimated(true);
  },

  // Остановка анимации
  stopAnimation: function () {
    setAnimated(false);
  },

  // Скрытие прогресс бара
  hide: function () {
    setHidden(true);
  },

  // Показ прогресс бара
  show: function () {
    setHidden(false);
  },
};

export default progressBlock;
