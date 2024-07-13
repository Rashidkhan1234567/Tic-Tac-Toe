"use strict";
$(document).ready(() => {
  let main_btn = document.querySelectorAll(".main_btn");
  let winDisplay = document.getElementById("win");
  let buttonClickSound = new Audio("Sounds/Button Click Sound.mp3");
let All_Button = new Audio ("Sounds/All Button.mp3")
let winingSound = new Audio ("Sounds/Wining Sound.mp3")
let losingSound = new Audio ("Sounds/Losing Sound.mp3")
  //    patterns

  let patterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 4, 7],
  ];

  let turn = true;
  let count = 0;

  main_btn.forEach((e) => {
    e.onclick = () => {
      buttonClickSound.play();
      if (turn) {
        e.innerHTML = "X";
        turn = false;
        e.disabled = true;
      } else {
        e.innerHTML = "O";
        turn = true;
        e.disabled = true;
      }
      $(e).css(
        "box-shadow",
        "inset 7px 7px 5px rgb(113, 121, 124) , inset -7px -7px 5px rgb(113, 121, 124)"
      );
      count++;
      if (count === 9) {
        gameDraw();
      }
      checkWinner();
    };
  });

  //    Reset Button

  $("#reset").on("click", () => {
    All_Button.play()
    main_btn.forEach((e) => {
      $(e).css(
        "box-shadow",
        "inset 0px 0px 0px rgb(113, 121, 124) , inset -0px -0px 0px rgb(113, 121, 124)"
      );
      e.innerHTML = "";
      e.disabled = false;
      turn = true;
      count = 0;
    });
  });

  //  Game over

  const gameDraw = () => {
    winDisplay.innerText = `Game was a Draw.`;
    count = 0;
    losingSound.play()
    ChangeDisplay();
    disableBoxes();
  };

  //    New Game Button

  $("#newGame_btn").click(() => {
    All_Button.play()

    $(".result").css("display", "none");
    $(".game").css("display", "grid");
    for (const btn of main_btn) {
      btn.disabled = false;
      turn = true;
      count = 0;
      $(btn).css(
        "box-shadow",
        "inset 0px 0px 0px rgb(113, 121, 124) , inset -0px -0px 0px rgb(113, 121, 124)"
      );
      btn.innerHTML = "";
    }
  });

  //    Show Winner

  const showWinner = (winner) => {
    winDisplay.innerHTML = `Winner is ${winner} 🎉🎉🎉`;
    disableBoxes();
    count = 0;
  };

  //     Disable btns

  const disableBoxes = () => {
    for (let btn of main_btn) {
      btn.disabled = true;
    }
  };

  //   check  winner

  function checkWinner() {
    for (const pattern of patterns) {
      let [a, b, c] = pattern;
      let patVal1 = main_btn[a - 1].innerHTML;
      let patVal2 = main_btn[b - 1].innerHTML;
      let patVal3 = main_btn[c - 1].innerHTML;

      if (patVal1 != "" && patVal2 != "" && patVal3 != "") {
        if (patVal1 === patVal2 && patVal2 === patVal3) {
          showWinner(patVal1);
          count = 0;
          winingSound.play()
          ChangeDisplay();
          return true;
        }
      }
    }
  }

  //    Change Display

  const ChangeDisplay = () => {
    let gameDisplay = document.querySelector(".game");
    gameDisplay.style.display = "none";
    let resultDisplay = document.querySelector(".result");
    resultDisplay.style.display = "grid";
  };
});
