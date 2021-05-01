 
   const selectBox = document.querySelector('.select_box'),
	selectXBtn = selectBox.querySelector('.playerX'),
	selectOBtn = selectBox.querySelector('.playerO'),
	play_board = document.querySelector('.play_board'),
	allBox = document.querySelectorAll('section span'),
	players = document.querySelector('.players'),
	result_box = document.querySelector('.result_box'),
	wonText = result_box.querySelector('.won_text');
	replaybtn = result_box.querySelector("button")


window.onload = () =>
{

	for(let i =0;i <allBox.length;i++){

		allBox[i].setAttribute('onclick','clickedBox(this)')
	}


	selectXBtn.onclick = () =>{
		selectBox.classList.add('hide');
		play_board.classList.add('show');

	}
	selectOBtn.onclick = () =>{
		selectBox.classList.add('hide');
		play_board.classList.add('show');
		players.setAttribute("class", "players active player")
	}
}

let playerXIcon = "fa fa-times";
let playerOIcon = "fa fa-circle-o";
let playerSign = 'X';
let runbot = true;

function clickedBox(element){
	// console.log(element)
	if(players.classList.contains('player')){
		// playerSign = "O"
		element.innerHTML = `<i class="${playerOIcon}"></i>`
		players.classList.add('active');  
		playerSign ="O"
		element.setAttribute("id",playerSign);

	}else{
		element.innerHTML = `<i class="${playerXIcon}"></i>`
		players.classList.add('active');
		element.setAttribute("id",playerSign);

	}

	selectWinner();
	play_board.style.pointerEvents = "none";
	element.style.pointerEvents = "none";

	element.style.pointerEvents = "none";
	let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
	setTimeout(()=>{
		bot(runbot);
	},randomDelayTime)
}

function bot(runbot){

  if(runbot){
  		playerSign = "0"
	let array = [];
	for(let i = 0; i< allBox.length;i++){
		if(allBox[i].childElementCount==0)
			{
				array.push(i);
				// console.log(i + " "+ "has no children")
			}

	}
	let randomBox = array[Math.floor(Math.random() * array.length)];
      // console.log(randomBox)
     if(array.length > 0){

			if(players.classList.contains('player')){
			allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`
			players.classList.remove('active');
			playerSign = "X"
			// allBox[randomBox].setAttribute("id",playerSign)
			}else{
			allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`
			players.classList.remove('active')
			allBox[randomBox].setAttribute("id",playerSign)


	  }

	  selectWinner();
	  
     }

     allBox[randomBox].style.pointerEvents = 'none';
	play_board.style.pointerEvents = "auto";
	playerSign = "X";

  }

}

function getClass(idname){
	return document.querySelector(".box" + idname).id;
}

function checkClasses(val1,val2,val3,sign){
	if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
		return true;
	}
}


function selectWinner()
{
	if(checkClasses(1,2,3,playerSign)  || checkClasses(4,5,6,playerSign) ||  checkClasses(6,7,8,playerSign) || checkClasses(1,4,7,playerSign) || checkClasses(2,5,8,playerSign) || checkClasses(3,6,9,playerSign) || checkClasses(1,5,9,playerSign) || checkClasses(3,5,7,playerSign))
	{
	  // console.log(playerSign + " " + "is the winner");
	  runbot = false;
	  bot(runbot);
	  setTimeout(()=>{
	  	play_board.classList.remove('show')
	  	result_box.classList.add('show')
	  },700)

	  wonText.innerHTML = `player <p>${playerSign}</p>won the game`
	}
	else
	{
		if(getClass(1) != "" && getClass(2) != "" && getClass(3) !="" && getClass(4) !="" && getClass(5) !=""&& getClass(6) !="" && getClass(7) !=""  && getClass(8) !=""  && getClass(9) !=""){
			runbot = false;
			bot(runbot);
			  setTimeout(()=>{
			  	play_board.classList.remove('show')
			  	result_box.classList.add('show')
			  },700)

			  wonText.innerHTML = `<p>Match Has been drawn</p>`;
		}
	}
}

replaybtn.onclick = () =>{
	window.location.reload();
}