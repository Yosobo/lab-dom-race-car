class Game {
    // Code to be added
    constructor() {
        this.startScreen = document.getElementById('game-intro')
        this.gameScreen = document.getElementById('game-screen')
        this.gameEndScreen = document.getElementById('game-end')
        this.player = null
        this.obstacles = []
        this.score = 0
        this.lives = 3
        this.gameIsOver = false
        this.gameIntervalId = null
        this.gameLoopFrequency = 1000 / 60
        this.height = 600
        this.width = 800
    }

    start() {
        this.gameScreen.style.height = `${this.height}px`
        this.gameScreen.style.width = `${this.width}px`
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'flex'
        this.player = new Player(this.gameScreen, 225, 530, 50, 100, 'images/car.png')
        this.gameIntervalId = setInterval(this.gameLoop.bind(this), this.gameLoopFrequency)
    }

    gameLoop() {
        this.update()
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
            this.endGame()
        }
    }

    update() {
        this.player.move()
        this.obstacles.forEach((obstacle, index) => {
            obstacle.move()
            if (obstacle.top > this.gameScreen.offsetHeight) {
                obstacle.element.remove()
                this.obstacles.splice(index, 1)
            }
        })
        if (Math.random() > 0.95) {
            const newObstacle = new Obstacle(this.gameScreen)
            this.obstacles.push(newObstacle)
        }
    }

    endGame() {
        this.gameIsOver = true
        this.gameScreen.style.display = 'none'
        this.gameEndScreen.style.display = 'block'
    }
}

class Player {
    constructor(gameScreen, left, top, width, height, imageUrl) {
        this.gameScreen = gameScreen
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.image = imageUrl
        this.direction = { x: 0, y: 0 }
        this.speed = 5
        this.element = document.createElement('img')
        this.element.src = this.image
        this.element.style.position = 'absolute'
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.gameScreen.appendChild(this.element)
    }

    move() {
        this.left += this.direction.x * this.speed
        this.top += this.direction.y * this.speed
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }
}

class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.width = 50
        this.height = 50
        this.left = Math.floor(Math.random() * (this.gameScreen.offsetWidth - this.width))
        this.top = -this.height
        this.element = document.createElement('div')
        this.element.style.position = 'absolute'
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.backgroundColor = 'red'
        this.gameScreen.appendChild(this.element)
    }

    move() {
        this.top += 2
        this.element.style.top = `${this.top}px`
    }
}