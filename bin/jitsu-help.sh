#!/usr/bin/env node
/*
 * help.js: Command related to jitsu help and usage
 *          modified to fit in ssh session.
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
var colors = require('colors'),
    winston = require('winston'),
    jitsu = require('jitsu');

var usage = [
  '          ___  __'.cyan,
  '    /  /  /   /_  /  /'.cyan,
  ' __/  /  /   __/ /__/'.cyan,
  '',

  'Flawless deployment of Node.js apps to the cloud',
  'open-source and fully customizable.',
  'https://github.com/nodejitsu/jitsu',
  '',

  'Usage:'.cyan.bold.underline,
  '',
  '  jitsu <resource> <action> <param1> <param2> ...',
  '',

  'Common Commands:'.cyan.bold.underline,
  '',

  'To sign up for Nodejitsu'.cyan,
  '  jitsu signup',
  '',

  'To log into Nodejitsu'.cyan,
  '  jitsu login',
  '',

  'Creates a new application on Nodejitsu'.cyan,
  '  jitsu create',
  '',

  'Lists all applications for the current user'.cyan,
  '  jitsu list',
  '',

  'Additional Commands'.cyan.bold.underline,
  '  jitsu apps',
  '  jitsu logs',
  '  jitsu env',
  '  jitsu users',
  '  jitsu databases',
  '  jitsu snapshots',
  '  jitsu logout',
  '',
  
  'For SSH session only'.cyan.bold.underline,
  '  q',
  '  exit',
  '  quit',
  '  h',
  '  help',
  '',
  'To finish SSH session please use ' + 'exit'.cyan + ' or ' + 'quit'.cyan,
  'then your password will be destroyed.',
  ''
];

usage.forEach(function (line) {
  winston.cli().help(line);
});