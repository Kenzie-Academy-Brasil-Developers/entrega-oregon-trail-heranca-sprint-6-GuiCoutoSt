class Traveler {
  constructor(name) {
    this.name = name;
    this._food = 1;
    this._isHealthy = true;
  }

  set food(food) {
    this._food = food;
  }

  get food() {
    return this._food;
  }

  set isHealthy(isHealthy) {
    this._isHealthy = isHealthy;
  }

  get isHealthy() {
   return this._isHealthy;
  }

  hunt = () => {
    this.food += 2;
  }

  eat = () => {
    if (this.food > 0) {
      this.food -= 1;
    } else if (this.food === 0) {
      this.isHealthy = false;
    }
  }
}

class Hunter extends Traveler {
  constructor(name) {
    super(name);

    this._food = 2;
  }

  hunt = () => {
    this.food += 5;
  }

  eat = () => {
    if (this.food === 0) {
      this.isHealthy = false;
      this.food -= 0;

    } else if (this.food === 1) {
      this.isHealthy = false;
      this.food -= 1;

    } else if (this.food >= 2) {
      this.food -= 2;
    }
  }

  giveFood = (traveler, numOfFoodUnits) => {
    if (numOfFoodUnits <= this.food) {
      traveler.food += numOfFoodUnits;
      this.food -= numOfFoodUnits;
    }
  }
}

class Doctor extends Traveler {
  constructor(name) {
    super(name);
  }

  heal = (traveler) => {
    if (traveler.isHealthy === false) {
      traveler.isHealthy = true;
    
    } else {
      traveler.isHealthy = true;
    }
  }
}

class Wagon {
  constructor(capacity) {
    this._capacity = capacity;
    this._passengers = [];
  }

  set capacity(seats) {
    this._capacity = seats;
  }

  get capacity() {
    return this._capacity;
  }

  set passengers(people) {
    this._passengers = people;
  }

  get passengers() {
    return this._passengers;
  }

  getAvailableSeatCount = () => {
    return this.capacity - this.passengers.length; 
  }

  join = (traveler) => {
    if (this.capacity - this.passengers.length > 0) {
      this.passengers.push(traveler);
    }
  }

  shouldQuarantine = () => {
    let c = 0;

    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i].isHealthy === false) {
        return true;

      } else if (i === this.passengers.length - 1) {
        return false;
      }
    }
  }

  totalFood = () => {
    return this.passengers.reduce( (c, person) => c + person.food, 0);
  }
}


// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
 
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);

console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
