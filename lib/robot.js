class Robot {
  constructor(coordinates = [0, 0], bearing = 'north') {
    this.coordinates = coordinates
    this.bearing = bearing
  }

  setCoordinates(x, y) {
    this.coordinates = [x, y]
  }

  setBearing(input_bearing) {
    let oldBearing = this.bearing
    try {
      this.bearing = ['north', 'east', 'south', 'west'].find((bearing) => (input_bearing === bearing))
      this.bearing.slice()
    } catch(error) {
      throw "Invalid Robot Bearing"
    }
  }

  place(directions) {
    this.setCoordinates(directions.x, directions.y)
    this.setBearing(directions.direction)
  }

  turnRight() {
    let turningRight = ['north', 'east', 'south', 'west']
    const index = turningRight.indexOf(this.bearing)
    this.bearing = turningRight[((index+1) % 4)]
  }

  turnLeft() {
    let turningLeft = ['west', 'south', 'east', 'north']
    const index = turningLeft.indexOf(this.bearing)
    this.bearing = turningLeft[((index+1) % 4)]
  }

  advance() {
    let incrementor = {north: [0,1], east: [1,0], south: [0,-1], west: [-1,0]}
    this.setCoordinates(this.coordinates[0] + incrementor[this.bearing][0], this.coordinates[1] + incrementor[this.bearing][1])
  }

  translateInstructions(input) {
    const characters = input.split("")
    for (const character of characters) {
      let instruction = {L: this.turnLeft, R: this.turnRight, A: this.advance}
      instruction[character].call(this)
    }
  }
}
