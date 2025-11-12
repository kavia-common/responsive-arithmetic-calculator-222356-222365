#!/bin/bash
cd /home/kavia/workspace/code-generation/responsive-arithmetic-calculator-222356-222365/calculator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

