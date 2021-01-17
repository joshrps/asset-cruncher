# Asset Cruncher
Stupid-simple minification when you don't want to set up an entire project.

## tl;dr:
Dump js and (s)css into `dist/<directory name>`. Files output in `source/<directory name>`
```
npm i
gulp crunch --dir <directory name>
```

### Liquid support:
Using Shopify's liquid in scss can cause issues, so write it as such:
```css
background: url('{{ "header.jpg" | asset_url }}') top center no-repeat;
```
becomes
```css
background: url('#{'{{ "header.jpg" | asset_url }}'}') top center no-repeat;
```

and then use the `--liquid` flag in the command:

```
gulp crunch --dir <directory name> --liquid
```

and the output files will be named `*.liquid`.
