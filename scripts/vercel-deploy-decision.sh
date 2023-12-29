#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$VERCEL_ENV" != "production" && "$VERCEL_ENV" != "preview" ]]; then
  echo "Abort deploy, not a production or preview branch"
  exit 0;
fi

git diff --quiet HEAD^ HEAD ./
isModified=$?

if [[ "isModified" == "0" ]]; then
  echo "Abort deploy, branch not modified"
  exit 0;
fi

echo "Deploy to $VERCEL_ENV"
exit 1;
