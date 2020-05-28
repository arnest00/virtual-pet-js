const formContainer = document.querySelector('#form-container'),
      petForm = document.querySelector('form'),
      petContainer = document.querySelector('#pet-container'),
      petName = document.querySelector('#pet-info'),
      petImg = document.querySelector('#pet-image'),
      feedBtn = document.querySelector('#feed-button'),
      playBtn = document.querySelector('#play-button'),
      trainBtn = document.querySelector('#train-button'),
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
  };

  feed() {
    if (this.hunger > 0) {
      this.hunger -= 1;
      return `You fed ${this.name}!`;
    } else {
      return `${this.name} isn't hungry!`;
    };
  };

  play() {
    if (this.boredom > 0) {
      this.boredom -= 1;
      this.affection += 1;
      return `You played with ${this.name}!`;
    } else {
      return `${this.name} doesn't feel like playing!`;
    };
  };

  train() {
    if (this.trained === false) {
      this.trained = true;
      this.exp += 1;
      return `You trained with ${this.name}!`;
    } else {
      return `${this.name} is too tired to train!`;
    }
  };
};

petForm.addEventListener('submit', e => {
  e.preventDefault();

  const nameChoice = document.querySelector('#name').value,
        petChoice = document.querySelector('#pet').value;

  const newPet = new Pet(nameChoice, petChoice);

  petName.innerText = `${newPet.name}, Level ${newPet.level}`;
  petImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newPet.dexNum}.png`);

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
  });
});
