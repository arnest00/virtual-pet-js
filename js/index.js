const formContainer = document.querySelector('#form-container'),
      petForm = document.querySelector('form'),
      petContainer = document.querySelector('#pet-container'),
      petName = document.querySelector('#pet-info'),
      petImg = document.querySelector('#pet-image'),
      feedBtn = document.querySelector('#feed-button'),
      playBtn = document.querySelector('#play-button'),
      scoldBtn = document.querySelector('#scold-button'),
      petFeedback = document.querySelector('#pet-feedback');

petForm.addEventListener('submit', e => {
  e.preventDefault();

  const nameChoice = document.querySelector('#name').value,
        petChoice = document.querySelector('#pet').value;

  petName.innerText = `Hello, ${nameChoice}!`;
  petImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${petChoice}.png`);

  formContainer.classList.add('hide');
  petContainer.classList.remove('hide');

  feedBtn.addEventListener('click', e => {
    petFeedback.innerText = `You fed ${nameChoice}!`;
  });

  playBtn.addEventListener('click', e => {
    petFeedback.innerText = `You played with ${nameChoice}!`;
  });

  scoldBtn.addEventListener('click', e => {
    petFeedback.innerText = `You scolded ${nameChoice}!`;
  });
});