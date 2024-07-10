# Difference Calculator

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Nadezhda-97/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Nadezhda-97/frontend-project-46/actions)
[![Node CI](https://github.com/Nadezhda-97/frontend-project-46/actions/workflows/my-tests.yml/badge.svg)](https://github.com/Nadezhda-97/frontend-project-46/actions/workflows/my-tests.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/32cb0a6e0700956cbdef/maintainability)](https://codeclimate.com/github/Nadezhda-97/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/32cb0a6e0700956cbdef/test_coverage)](https://codeclimate.com/github/Nadezhda-97/frontend-project-46/test_coverage)

Difference Calculator is a cli-program that compares two configuration files and shows a difference.

Supported formats: json, yaml, yml.

Generating result as "stylish" (as default), "plain text" and "json".

### Requirements
* Node.js (version 13.2.0 and above)

### Install
```
git clone git@github.com:Nadezhda-97/frontend-project-46.git
```
```
cd frontend-project-46
```
```
make install
```
### How to use
```
$ gendiff [options] <filepath1> <filepath2>

Options:
-V, --version          output current app version
-f, --format <type>    select format for output ("stylish", "plain" or "json")
-h, --help             output help information
```

### Demo

#### Comparing flat json files
[![asciicast step 3](https://asciinema.org/a/lbNNz4IfEAGDjQgZS8juzySaT.svg)](https://asciinema.org/a/lbNNz4IfEAGDjQgZS8juzySaT)

#### Comparing flat yaml files
[![asciicast step 5](https://asciinema.org/a/uXDzmh8oijb9yh9ztpdaiK5dc.svg)](https://asciinema.org/a/uXDzmh8oijb9yh9ztpdaiK5dc)

#### Comparing nested json & yaml files used 'stylish' formatter
[![asciicast step 6](https://asciinema.org/a/BeTrUi63gsNjsagiOMIxfngOx.svg)](https://asciinema.org/a/BeTrUi63gsNjsagiOMIxfngOx)

#### Comparing nested json & yaml files used 'plain' formatter
[![asciicast step 7](https://asciinema.org/a/wky0dVLJcEj8uuNjYaDLKZtnA.svg)](https://asciinema.org/a/wky0dVLJcEj8uuNjYaDLKZtnA)

#### Comparing nested json & yaml files used 'json' formatter
[![asciicast step 8](https://asciinema.org/a/7nOAsth4VAYagKz9K4c6fJbBR.svg)](https://asciinema.org/a/7nOAsth4VAYagKz9K4c6fJbBR)
