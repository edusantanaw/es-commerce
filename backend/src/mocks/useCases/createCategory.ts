export class CreateCategoryUseCaseSpy {
  categoryExists = false;
  async create(name: string) {
    this.categoryExists;
    if (this.categoryExists) throw "Category already exists!";
    return true;
  }
}
