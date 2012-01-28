#!/bin/bash
export PATH="/usr/local/bin:/usr/bin:/bin"
## The NEW_HOME definition is for allow multiples users using same jitsu
NEW_HOME=$HOME/jitsu-session-$$
ARGS="--jitsuconf $NEW_HOME/jitsuconf"
mkdir $NEW_HOME
mkdir $NEW_HOME/tmp
echo "{
  \"root\": \"$NEW_HOME\",
  \"debug\": true,
  \"protocol\": \"http\",
  \"remoteHost\": \"api.nodejitsu.com\",
  \"loglength\": 110,
  \"userconfig\": \"$NEW_HOME/jitsuconf\",
  \"loglevel\": \"info\",
  \"tmproot\": \"$NEW_HOME/tmp\",
  \"tar\": \"tar\",
  \"colors\": true,
  \"analyze\": true,
  \"gzipbin\": \"gzip\"
}" > $NEW_HOME/jitsuconf
jitsu $ARGS login
if [ $? -eq 0 ]; then
  jitsu-help
  read -p "jitsu> " -e command
  while [[ "$command" != "q" && "$command" != "exit" && "$command" != "quit" ]]
  do
    if [ "${command:0:5}" = "jitsu" ]
      then
        # Checks for invalid commands over SSH session
        if [[ "${command:6:6}" = "deploy" || "${command:6:7}" = "install" || "${command:6:4}" = "conf" || "${command:6:6}" = "config" || "${command:6:11}" = "apps deploy" ]]
          then
            echo "Sorry, you can't do that over a SSH session."
          else
            jitsu $ARGS ${command:6}
        fi
      else
        if [[ "$command" = "help" || "$command" = "h" ]]
          then
            jitsu-help
          else
            echo "Invalid command '$command': please use only jitsu commands"
        fi
    fi
    read -p "jitsu> " -e command
  done
  jitsu $ARGS logout
  rm -rf $NEW_HOME
  exit 0
fi