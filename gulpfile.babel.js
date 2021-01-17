// import { createRequire } from 'module'
// const require = createRequire(import.meta.url);

import { src, dest, parallel, task } from 'gulp';

import sass from 'gulp-sass';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';

import uglify from 'gulp-uglify';

const crunchCSS = (dir, liquid = false) =>
	src(`source/${dir}/**/*.{scss,css${liquid ? ',css.liquid,scss.liquid' : ''}}`)
	.pipe(sass())
	.pipe(concat(`crunch-styles.min.css${liquid ? '.liquid' : ''}`))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(dest(`dist/${dir}`));

const crunchJS = (dir, liquid = false) =>
	src(`source/${dir}/**/*.js`)
	.pipe(uglify())
	.pipe(concat(`crunch-scripts.min.js${liquid ? '.liquid' : ''}`))
	.pipe(dest(`dist/${dir}`));

const crunch = () =>
{
	let dir;
	let liquid = false;
	process.argv.forEach((arg, i) =>
	{
		const lc = arg.toLowerCase();
		if (lc === '--dir' && process.argv[i+1])
		{
			dir = process.argv[i+1];
		}
		else if (lc === '--liquid')
		{
			liquid = true;
		}
	});

	if (!dir)
	{
		throw "Please pass in a directory via --dir";
	}

	const str = `== CRØNCHING ${dir} ==`
	const len = str.length;
	const eq = '='.repeat(len);

	console.log(`\n${eq}\n${str}\n${eq}\n`);

	return parallel([
		crunchCSS.bind(null, dir, liquid),
		crunchJS.bind(null, dir, liquid)
	]);
}

task('crunch', crunch());
