#!/bin/bash

#eos_exchange init script

pm2 start interface.js --watch
pm2 start monitor.js --watch
pm2 start update.js --watch
pm2 monit

#fin
