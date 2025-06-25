#!/bin/bash
cd /home/kavia/workspace/code-generation/ideanest-70410-838e1f61/frontend_spa_workspace/frontend_spa
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
 if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

