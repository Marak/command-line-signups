#!/bin/bash
export PATH="/usr/local/bin:/usr/bin:/bin"
jitsu login
if [ $? -eq 0 ]; then
  read -p "jitsu> " -e command
  while [[ "$command" != "q" && "$command" != "exit" && "$command" != "quit" ]]
  do
    if [ "${command:0:5}" = "jitsu" ]
      then
        $command
      else
        if [[ "$command" = "help" || "$command" = "h" ]]
          then
            jitsu help
          else
            /bin/echo "Invalid command '$command': please use only jitsu commands"
        fi
    fi
    read -p "jitsu> " -e command
  done
  jitsu logout
  exit 0
fi