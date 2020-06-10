const formContainer = document.querySelector('#form-container'),
      petForm = document.querySelector('form'),
      petContainer = document.querySelector('#pet-container'),
      petInfo = document.querySelector('#pet-info'),
      petImg = document.querySelector('#pet-image'),
      feedBtn = document.querySelector('#feed-button'),
      playBtn = document.querySelector('#play-button'),
      trainBtn = document.querySelector('#train-button'),
      restBtn = document.querySelector('#rest-button'),
      dayBtn = document.querySelector('#day-button');

const displayLength = 1000;

petForm.addEventListener('submit', e => {
  e.preventDefault();

  const nameChoice = document.querySelector('#name').value,
        petChoice = document.querySelector('#pet').value;

  const newPet = new Pet(nameChoice, petChoice);
  const { name, dexNum } = newPet;

  petForm.reset();

  petInfo.innerText = `${name}, Level ${newPet.level}, known for ${newPet.daysKnown} ${newPet.daysKnown === 1 ? 'day' : 'days'}`;
  petImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNum}.png`);

  formContainer.classList.add('hide');
  petContainer.classList.remove('hide');

  feedBtn.addEventListener('click', e => {
    M.toast({ html: newPet.feed(), displayLength: displayLength });
  });

  playBtn.addEventListener('click', e => {
    M.toast({ html: newPet.play(), displayLength: displayLength });
  });

  trainBtn.addEventListener('click', e => {
    M.toast({ html: newPet.train(), displayLength: displayLength });
    petInfo.innerText = `${name}, Level ${newPet.level}, known for ${newPet.daysKnown} ${newPet.daysKnown === 1 ? 'day' : 'days'}`;
  });

  restBtn.addEventListener('click', e => {
    M.toast({ html: newPet.rest(), displayLength: displayLength });
    petInfo.innerText = `${name}, Level ${newPet.level}, known for ${newPet.daysKnown} ${newPet.daysKnown === 1 ? 'day' : 'days'}`;
  });
});
