# create-insomnia-plugin
Monorepo for [create-insomnia-plugin](https://www.npmjs.com/package/create-insomnia-plugin) - an opionated bootstrapper for [Insomnia REST Client](https://insomnia.rest) plugins and themes

## Usage 
Getting started is simple, just run `npx create-insomnia-plugin <package-name>` and complete the prompts

### Options
`-t`, `--theme` - Use theme template
`-s`, `--simple` - Use simple template
`-c`, `--complex` - Use complex template
`-p`, `--plugins-path [path]` - Specify path to Insomnia app plugins folder

### Scripts
Each template has built in scripts to simplify the development process, as well as to ensure high quality code

`npm run lint` - Runs eslint
`npm run lint:fix` Runs eslint, but fixes problems where possible
`npm run format` - Runs prettier, makes changes 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

*Before creating pull requests*:
- Run `npm run precommit` in `packages/create-insomnia-plugin`
- Make sure to update any tests as needed

## License
[MIT](https://choosealicense.com/licenses/mit/)