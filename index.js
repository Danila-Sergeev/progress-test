const valueInput = document.getElementById("value-input");
const animateInput = document.getElementById("animate-input");
const hideInput = document.getElementById("hide-input");
const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d"); //Получаем контекст для рисования

//устанавливаем начальное и конечное значение углов
const startAngle = Math.PI;
const endAngle = 3 * Math.PI;

//Устанавливаем шаг
const stepAngle = Math.PI / 108;
let curAngle = startAngle;

let animationRunning = true; // Флаг для отслеживания запуска анимации

//Устанавливаем цвет прогрсс бара
var grad = ctx.createLinearGradient(0, 0, 100, 0);
grad.addColorStop(0, "#005CFF");

//Функция рисования дуги
function drawArc(start, end, strokeStyle) {
  ctx.save();
  ctx.translate(70, 70);
  ctx.rotate(Math.PI / 2);
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.arc(0, 0, 60, start, end);
  ctx.stroke();
  ctx.restore();
}

function drawSpeed(start, end, cur) {
  drawArc(start, end, "#eaf0f5");
  drawArc(start, cur, grad);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //Очищаем холст

  if (!hideInput.checked) {
    curAngle = Math.min(curAngle + stepAngle, endAngle); //Увеличиваем угол на шаг и обновляем
    drawSpeed(startAngle, endAngle, curAngle);
  }

  if (curAngle >= endAngle) {
    curAngle = startAngle;
  }

  if (animationRunning) {
    //Запускаем след цикл анимации
    requestAnimationFrame(draw);
  }
}

drawSpeed(startAngle, endAngle, startAngle); //Начальная отрисовка

//Обработчики событий "change" и input" для чекбокса анимации, скрытия и инпута ввода процента

animateInput.addEventListener("change", () => {
  setAnimated(animateInput.checked);
});

hideInput.addEventListener("change", () => {
  setHidden(hideInput.checked);
});

valueInput.addEventListener("input", () => {
  setValue(parseInt(valueInput.value));
});

// Функции для установки состояния

function setAnimated(isAnimated) {
  valueInput.value = 0;
  animationRunning = isAnimated;
  draw();
}

function setHidden(isHidden) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.classList.toggle("hidden", isHidden);
  if (!isHidden) {
    drawSpeed(startAngle, endAngle, curAngle);
  }
}

function setValue(percent) {
  if (percent >= 0 && percent <= 100) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!hideInput.checked) {
      curAngle = startAngle + ((endAngle - startAngle) * percent) / 100;
      drawSpeed(startAngle, endAngle, curAngle);
    }
  } else {
    curAngle = startAngle;
    drawSpeed(startAngle, endAngle, curAngle);
  }
}

// Инициализация значений при загрузке страницы
setValue(0);
setAnimated(false);
setHidden(false);
