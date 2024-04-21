window.onload = function () {
  const startButton = document.getElementById('start-button')
  let game

  startButton.addEventListener('click', function () {
    game = new Game()
    game.start()
  })

  document.addEventListener('keydown', function (event) {
    if (game && game.player) {
      switch (event.key) {
        case 'ArrowLeft':
          game.player.direction.x = -1
          break
        case 'ArrowRight':
          game.player.direction.x = 1
          break
        case 'ArrowUp':
          game.player.direction.y = -1
          break
        case 'ArrowDown':
          game.player.direction.y = 1
          break
      }
    }
  })

  document.addEventListener('keyup', function (event) {
    if (game && game.player) {
      game.player.direction = { x: 0, y: 0 }
    }
  })
}