// The closer disobedience is to 10, the more of a chance the pet disobeys
const disobedienceCheck = () => {
  return Math.floor(Math.random() * 10) + 1;
};

class Pet {
  constructor(name, dexNum) {
    this.name = name;
    this.dexNum = dexNum;
    this.level = 1;
    this.exp = 0;
    this.hunger = 1;  // inc by 1, can reach a maximum of 3
    this.boredom = 1; // inc by 1, can reach a maximum of 3
    this.trained = false; // resets to false with every rest
    this.daysKnown = 0;
    this.disobedience = 0; // inc by 2 when resting with max hunger or boredom AND failing disobedience check
  }

  feed() {
    // failing disobedience check does not mean player can't try again
    if (disobedienceCheck() < this.disobedience) {
      return `${this.name} turned away...`;
    };

    // feeding will decrease hunger
    if (this.hunger > 0) {
      this.hunger -= 1;

      return `You fed ${this.name}!`;
    } else {
      return `${this.name} isn't hungry!`;
    };
  }

  play() {
    // failing disobedience check does not mean player can't try again
    if (disobedienceCheck() < this.disobedience) {
      return `${this.name} is loafing around...`;
    };

    if (this.boredom > 0) {
      // playing will decrease disobedience score...
      if (this.disobedience > 0) {
        this.disobedience -= 1;
      };
      // ...and boredom
      this.boredom -= 1;

      return `You played with ${this.name}!`;
    } else {
      return `${this.name} doesn't feel like playing!`;
    };
  }

  train() {
    const neededExp = Math.floor(this.level / 3) + 3;

    if (this.trained === false) {
      // failing disobedience check does not mean player can't try again
      if (disobedienceCheck() < this.disobedience) {
        return `${this.name} won't obey...`;
      };

      this.trained = true;
      this.exp += 1;

      if (this.exp >= neededExp) {
        this.level += 1;
        this.exp = 0;
        this.disobedience = 0;

        return `${this.name} grew to level ${this.level}!`
      } else {
        return `You trained with ${this.name}!`;
      };
    } else {
      return `${this.name} is too tired to train!`;
    };
  }

  refresh() {
    this.trained = false;
    this.daysKnown += 1;
  }

  rest() {
    if (this.hunger === 3 || this.boredom === 3) {
      // if the pet does not run away...
      if (disobedienceCheck() < this.disobedience) {
        petImg.classList.add('missing-pet');
        document.querySelector('#button-container').classList.add('hide');
        document.querySelector('#restart-container').classList.remove('hide');

        return `${this.name} ran away in the night...`;
      // ...it will become more disobedient
      } else {
        this.disobedience += 2;
        this.refresh();

        return `${this.name} wanders off for a while...`;
      }
    } else {
      if (this.hunger < 3) {
        this.hunger += 1;
      };
      if (this.boredom < 3) {
        this.boredom += 1;
      };
      this.refresh();
  
      return `${this.name} turns in for the night!`;
    };
  }
};