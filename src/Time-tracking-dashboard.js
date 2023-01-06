(function () {
  async function displayData(lapse, since) {
    document.querySelectorAll('.gen').forEach(item => {
      item.remove();
    });
    const method = {
      get: (url) => { return fetch(url).then(response => response.json()) },
    };
    await method.get('data.json')
      .then(data => data.map((object) => {
        document.querySelector('.page').insertAdjacentHTML('beforeend',
          `<div class="wrapper" id=${object['title']}>
            <div class="gen card">
              <p class="sub">${object['title']}</p>
              <p class="main">${object['timeframes'][lapse]['current']} hrs</p>
              <p class="para">${since} - ${object['timeframes'][lapse]['previous']}</p>
            </div>
          </div>`);
      })
    )
      .catch(error => {
        document.querySelector('.page').insertAdjacentHTML('beforeend',
          `<p class='error'>${error.message}</p>`);
    })
  }

  document.getElementById('daily').addEventListener('click', () => displayData('daily', 'Yesterday'));
  document.getElementById('weekly').addEventListener('click', () => displayData('weekly', 'Last week'));
  document.getElementById('monthly').addEventListener('click', () => displayData('monthly', 'Last month'));
})();