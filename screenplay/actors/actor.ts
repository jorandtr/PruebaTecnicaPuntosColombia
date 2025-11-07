export class Actor {
  private abilities: Map<string, any> = new Map();

  constructor(public name: string) {}

  whoCan(...abilities: any[]) {
    abilities.forEach(ability => {
      this.abilities.set(ability.constructor.name, ability);
    });
    return this;
  }

  abilityTo<T>(AbilityType: new (...args: any[]) => T): T {
    const ability = this.abilities.get(AbilityType.name);
    if (!ability) {
      throw new Error(`${this.name} no tiene la habilidad ${AbilityType.name}`);
    }
    return ability;
  }

  async attemptsTo(...tasks: any[]) {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }

  async ask(question: any) {
    return await question.answeredBy(this);
  }
}