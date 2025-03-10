let radio;
let button;
let questions;
let currentQuestionIndex = 0;
let correctAnswer;
let resultText = ''; // 用於顯示結果的文字
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadQuestion();
}

function draw() {
  background("#90e0ef");
  textAlign(CENTER);
  textSize(32); // 放大文字
  if (currentQuestionIndex < questions.getRowCount()) {
    text(questions.getString(currentQuestionIndex, '題目'), width / 2, height / 2 - 150);
    textSize(24);
    text(resultText, width / 2, height / 2 + 100); // 顯示結果
  } else {
    text(resultText, width / 2, height / 2 - 50); // 顯示結果
    textSize(24);
    text(`答對題數：${correctCount}`, width / 2, height / 2);
    text(`答錯題數：${incorrectCount}`, width / 2, height / 2 + 30);
    text('413730465花生', width / 2, height / 2 + 60);
  }

  // 顯示答對和答錯題數
  textAlign(LEFT);
  textSize(20);
  text(`答對題數：${correctCount}`, 10, 30);
  text(`答錯題數：${incorrectCount}`, 10, 60);
  text('413730465花生', 10, 90);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupElements();
}

function loadQuestion() {
  if (radio) radio.remove(); // 移除舊的 radio
  if (button) button.remove(); // 移除舊的 button

  let options = [
    questions.getString(currentQuestionIndex, '選項1'),
    questions.getString(currentQuestionIndex, '選項2'),
    questions.getString(currentQuestionIndex, '選項3'),
    questions.getString(currentQuestionIndex, '選項4')
  ];
  correctAnswer = questions.getString(currentQuestionIndex, '正確答案');

  shuffle(options, true); // 打亂選項順序

  radio = createRadio();
  options.forEach(option => radio.option(option));
  radio.style('width', '600px'); // 調整寬度以顯示在同一排
  radio.position(width / 2 - 300, height / 2 - 50); // 調整位置
  radio.style('background-color', '#ffffff'); // 設置背景顏色
  
  button = createButton('提交');
  button.position(width / 2 - button.width / 2, height / 2 + 50);
  button.mousePressed(handleSubmit);
}

function handleSubmit() {
  let selected = radio.value();
  if (selected === correctAnswer) {
    resultText = '答對了！';
    correctCount++;
  } else {
    resultText = '答錯了，正確答案是：' + correctAnswer;
    incorrectCount++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.getRowCount()) {
    resultText = ''; // 清空結果文字
    radio.remove(); // 移除舊的 radio
    button.remove(); // 移除舊的 button
    loadQuestion();
  } else {
    resultText = `測驗結束！答對題數：${correctCount}，答錯題數：${incorrectCount}`;
    if (radio) radio.remove();
    if (button) button.remove();
    // 移除選項文字
    removeElements();
  }
}

function setupElements() {
  if (radio) radio.remove(); // 移除舊的 radio
  if (button) button.remove(); // 移除舊的 button

  let options = [
    questions.getString(currentQuestionIndex, '選項1'),
    questions.getString(currentQuestionIndex, '選項2'),
    questions.getString(currentQuestionIndex, '選項3'),
    questions.getString(currentQuestionIndex, '選項4')
  ];
  correctAnswer = questions.getString(currentQuestionIndex, '正確答案');

  shuffle(options, true); // 打亂選項順序

  radio = createRadio();
  options.forEach(option => radio.option(option));
  radio.style('width', '600px'); // 調整寬度以顯示在同一排
  radio.position(width / 2 - 300, height / 2 - 50); // 調整位置
  radio.style('background-color', '#ffffff'); // 設置背景顏色
  
  button = createButton('提交');
  button.position(width / 2 - button.width / 2, height / 2 + 50);
  button.mousePressed(handleSubmit);
}