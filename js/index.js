const formContainer = document.querySelector('#form-container'),
      petForm = document.querySelector('form'),
      petContainer = document.querySelector('#pet-container'),
      petName = document.querySelector('#pet-info'),
      petImg = document.querySelector('#pet-image'),
      feedBtn = document.querySelector('#feed-button'),
      playBtn = document.querySelector('#play-button'),
      trainBtn = document.querySelector('#train-button'),
      dayBtn = document.querySelector('#day-button'),
      petFeedback = document.querySelector('#pet-feedback');

class Pet {
  constructor(name, dexNum) {
    this.name = name;
    this.dexNum = dexNum;
    this.level = 1;
    this.exp = 0;
    this.affection = 0;
    this.hunger = 1;
    this.boredom = 1;
    this.trained = false;
    this.dateMet = new Date();
    this.testDate = [ this.dateMet.getMonth() + 1, this.dateMet.getDate(), this.dateMet.getFullYear() ];
  };

  feed() {
    if (this.hunger > 0) {
      this.hunger -= 1;
      console.log('hunger', this.hunger);
      return `You fed ${this.name}!`;
    } else {
      return `${this.name} isn't hungry!`;
    };
  };

  play() {
    if (this.boredom > 0) {
      this.boredom -= 1;
      console.log('boredom', this.boredom);
      this.affection += 1;
      console.log('affection', this.affection);
      return `You played with ${this.name}!`;
    } else {
      return `${this.name} doesn't feel like playing!`;
    };
  };

  train() {
    const neededExp = Math.floor(this.level / 3) + 3;

    if (this.trained === false) {

      this.trained = true;
      this.exp += 1;
      console.log('exp', this.exp);

      if (this.exp >= neededExp) {
        this.level += 1;
        this.exp = 0;
        console.log('lvl', this.level);
        return `${this.name} grew to level ${this.level}!`
      } else {
        return `You trained with ${this.name}!`;
      }
    } else {
      return `${this.name} is too tired to train!`;
    }
  };

  // methods for testing app

  newMonth() {
    this.testDate[0] += 1;
    this.testDate[1] = 1;
  }

  newDay() {
    const shortMonths = [ 4, 6, 9, 11 ];

    if (this.testDate[0] === 2) {  // Feb
      if (this.testDate[2] % 4 === 0 && this.testDate[1] === 29) { // leap year
        this.newMonth();
      } else if (this.testDate[1] === 28) {
        this.newMonth();
      } else {
        this.testDate[1] += 1;
      };
    } else if (shortMonths.indexOf(this.testDate[0]) !== -1) { // Apr, Jun, Sep, Nov
      if (this.testDate[1] === 30) {
        this.newMonth();
      } else {
        this.testDate[1] += 1;
      };
    } else {  // Jan, Mar, May, Jul, Aug, Oct, Dec
      if (this.testDate[0] === 12 && this.testDate[1] === 31) { // Dec 31
        this.testDate[0] = 1;
        this.testDate[1] = 1;
        this.testDate[2] += 1;
      } else if (this.testDate[1] === 31) {
        this.newMonth();
      } else {
        this.testDate[1] += 1;
      };
    };
    
    this.hunger += 1;
    this.boredom += 1;
    this.trained = false;
  };
};

petForm.addEventListener('submit', e => {
  e.preventDefault();

  const nameChoice = document.querySelector('#name').value,
        petChoice = document.querySelector('#pet').value;

  const newPet = new Pet(nameChoice, petChoice);
  const { name, dexNum, dateMet, testDate } = newPet;

  petName.innerText = `${name}, Level ${newPet.level}, met on ${dateMet.getMonth() + 1}/${dateMet.getDate()}/${dateMet.getFullYear()}`;
  petImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNum}.png`);

  formContainer.classList.add('hide');
  petContainer.classList.remove('hide');

  feedBtn.addEventListener('click', e => {
    petFeedback.innerText = newPet.feed();
  });

  playBtn.addEventListener('click', e => {
    petFeedback.innerText = newPet.play();
  });

  trainBtn.addEventListener('click', e => {
    petFeedback.innerText = newPet.train();
    petName.innerText = `${name}, Level ${newPet.level}, met on ${dateMet.getMonth() + 1}/${dateMet.getDate()}/${dateMet.getFullYear()}`;
  });

  dayBtn.addEventListener('click', e => {
    newPet.newDay();
    petFeedback.innerText = `Today is now ${testDate[0]}/${testDate[1]}/${testDate[2]}!`;
  });
});
