#!/bin/bash
cd /home/kavia/workspace/code-generation/sassylovevibes-61863-948bc5e0/sassy_love_vibes_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

