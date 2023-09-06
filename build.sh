#!/usr/bin/env bash

bailout() {
    echo :::::::::::::::::::: >&2
    echo Error occured >&2
    echo :::::::::::::::::::: >&2
    exit 1
}

mode=$1
if [ -z "$1" ]; then mode=dev; fi

cd node/ || bailout
npm run $mode || bailout

cd ../ || bailout
mv dist/*.whl dist/old/
poetry build -f wheel
