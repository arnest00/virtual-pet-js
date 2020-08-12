const assert = require('assert');

it('Has a text input', async () => {
  const dom = await render('index.html');
  
  const input = dom.window.document.querySelector('input');

  assert(input);
});

it('Successfully shows #pet-container', async () => {
  const dom = await render('index.html');

  dom.window.document.querySelector('input').value = 'Test';
  dom.window.document.querySelector('select').value = '25';
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  assert(!(dom.window.document.querySelector('#pet-container').classList.contains('hide')));
});

it('Shows correct img in #pet-image', async () => {
  const dom = await render('index.html');

  dom.window.document.querySelector('input').value = 'Test';
  dom.window.document.querySelector('select').value = '25';
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  assert.strictEqual(dom.window.document.querySelector('#pet-image').getAttribute('src'), 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png');
});