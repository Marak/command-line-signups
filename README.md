## Usage
Need install jitsu CLI tool as global package. And Nodejs installed in normals prefix.

## How to add user using this
We will add the user *cronopio* to the system and within the group *nodeusers*

```
useradd -s /usr/local/bin/jitsu-shell -m -g nodeusers cronopio
```


## Usage (Old, failed)
Just install this package globally using npm.
You can clone de repo, and install.

```
git clone git@github.com:Marak/command-line-signups.git
npm install -g ./command-line-signups
```

Now you can create a user in your system.
When you login with this user the nodejitsu signup script run. 
