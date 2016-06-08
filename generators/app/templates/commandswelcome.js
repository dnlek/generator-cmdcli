export default class Command {
  get args() {
    return [
      'name'
    ];
  }

  exec(args) {
    process.stdout.write(`Welcome ${args.name} in <%= projectName %>\n`);
  }
}
